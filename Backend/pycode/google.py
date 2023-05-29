import sys
import time
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymysql
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from jiabatest import prehandleArray

# 用于爬取are6.com与jibi.net的爬虫，参数为 纪念币名称 纪念币id 发行年份
# 选择发行年份周围5年内的数据
# print(sys.argv)
[cname, cid, cyear] = sys.argv[1:]
cyear = int(cyear)
cid = int(cid)
nameWords = prehandleArray(cname)

caps = {
    "browserName": "chrome",
    'goog:loggingPrefs': {'performance': 'ALL'}  # 开启日志性能监听
}
options = Options()
options.add_argument('--ignore-certificate-errors')
options.add_experimental_option("excludeSwitches", ['enable-automation', 'enable-logging'])
driver = webdriver.Chrome(desired_capabilities=caps, options=options)  # 启动浏览器

proxies = {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890",
}

base_url = f'https://www.google.com/search?q=allintext:{cname}+site:are6.com+OR+site:jibi.net+OR+site:financialnews.com.cn'
now = str(datetime.now()).split('.')[0]

driver.get(base_url)
time.sleep(1)

try: 
    tool = driver.find_element(by=By.ID, value='hdtb-tls')
    tool.click()
    seleRes = driver.find_elements(By.CLASS_NAME, 'hdtb-mn-hd')[-1]
    ActionChains(driver).move_to_element(seleRes).click(seleRes).perform()
    precise = driver.find_elements(By.TAG_NAME, 'g-menu-item')[-1].find_element(By.TAG_NAME, 'a')
    precise.click()
    time.sleep(1)
except Exception as e:
    print()

conn = pymysql.connect(host='localhost', port=3306, user='root', password='root', database='commemorativecoin', charset='utf8')
cursor = conn.cursor()

commentSql = 'insert into comments (title, link, date, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
mentionSql = 'insert into mentions (coinid, commentid, createdAt, updatedAt) values (%s, %s, %s, %s)'
lines = 0

def insertDB(title, href, date):
    global lines
    value = (title, href, date, now, now)
    cursor.execute(commentSql, value)
    cursor.execute(mentionSql, (cid, cursor.lastrowid, now, now))
    lines += 1


results = driver.find_elements(by=By.XPATH, value='//*[@id="search"]/div/div/div')
for res in results:
    href = res.find_element(by=By.TAG_NAME, value='a').get_attribute('href')
    title = res.find_element(by=By.TAG_NAME, value='h3').text
    try: 
        preview = res.find_element(By.CSS_SELECTOR,
                                   'div.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc.lEBKkf > span:nth-child(2)').text
    except Exception as e:
        preview = res.find_element(By.CSS_SELECTOR, 
                                   'div.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc.lEBKkf > span').text
    if any(word in preview for word in nameWords):
        if 'jibi.net' in href:
            try:
                date_str = res.find_element(By.CSS_SELECTOR,
                                        'span.MUxGbd.wuQ4Ob.WZ8Tjf > span').text
                date = datetime.strptime(date_str, "%Y年%m月%d日")
                year = date.year
                if cyear+3 >= year >= cyear-1:
                    date = date.strftime("%Y-%m-%d %H:%M:%S")
                    # print(title, href, date)
                    insertDB(title, href, date)
            except Exception as e:
                htmlreg = r'\d+.html'
                if re.search(htmlreg, href):
                    html_text = requests.get(href).text
                    soup = BeautifulSoup(html_text, "html.parser")
                    elem = soup.select_one('body > div.w1020.mt10 > div.w700.left > div.lcont > div.btitle > p')
                    if elem:
                        datereg = r'\d\d-\d\d-\d\d \d\d:\d\d:\d\d'
                        match = re.search(datereg, elem.text)
                        if match: 
                            date_str = '20' + match.group()
                            year = int(date_str[:4])
                            if cyear+3 >= year >= cyear-1:
                                insertDB(title, href, date_str)
                                # print(title, href, date_str)
                else: 
                    continue

        elif 'financialnews.com.cn' in href:
            if '/jrsj/' in href:
                continue
            else:
                try: 
                    date_str = res.find_element(By.CSS_SELECTOR,
                                        'span.MUxGbd.wuQ4Ob.WZ8Tjf > span').text
                    date = datetime.strptime(date_str, "%Y年%m月%d日")
                    year = date.year
                    if cyear+3 >= year >= cyear-1:
                        date = date.strftime("%Y-%m-%d %H:%M:%S")
                        insertDB(title, href, date)
                        # print(title, href, date)
                except Exception as e:
                    html_text = requests.get(href, verify=False, proxies=proxies).text
                    soup = BeautifulSoup(html_text, "html.parser")
                    elem = soup.select_one('div.content > div.content_info > span:nth-child(3)')
                    if elem:
                        reg = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}'
                        date = re.search(reg, elem.text).group() + ':00'
                        # print(title, href, date)
                        insertDB(title, href, date)

        else:
            if 'article' in href:
                html_text = requests.get(href).text
                soup = BeautifulSoup(html_text, "html.parser")
                elem = soup.select_one('#ct > div > div > div > p')
                if elem:
                    date_str = elem.text.split('|')[0].strip() + ':00'
                    year = int(date_str[:4])
                    if cyear+3 >= year >= cyear-1:
                        insertDB(title, href, date_str)
                        # print(title, href, date_str)


conn.commit()
conn.close()

driver.quit()