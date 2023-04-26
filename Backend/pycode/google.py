import sys
import time
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymysql
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

# 用于爬取are6.com与jibi.net的爬虫，参数为 纪念币名称 纪念币id 发行年份
# 选择发行年份周围5年内的数据
# print(sys.argv)
[cname, cid, cyear] = sys.argv[1:]
cyear = int(cyear)
cid = int(cid)

caps = {
    "browserName": "chrome",
    'goog:loggingPrefs': {'performance': 'ALL'}  # 开启日志性能监听
}
options = Options()
options.add_argument('--ignore-certificate-errors')
options.add_experimental_option("excludeSwitches", ['enable-automation', 'enable-logging'])
driver = webdriver.Chrome(desired_capabilities=caps, options=options)  # 启动浏览器

base_url = f'https://www.google.com/search?q=allintext:{cname}+site:are6.com+OR+site:jibi.net'
now = str(datetime.now()).split('.')[0]

driver.get(base_url)
time.sleep(5)

tool = driver.find_element(by=By.ID, value='hdtb-tls')
tool.click()
seleRes = driver.find_elements(By.CLASS_NAME, 'hdtb-mn-hd')[-1]
ActionChains(driver).move_to_element(seleRes).click(seleRes).perform()
precise = driver.find_elements(By.TAG_NAME, 'g-menu-item')[-1].find_element(By.TAG_NAME, 'a')
precise.click()
time.sleep(5)

conn = pymysql.connect(host='localhost', port=3306, user='root', password='root', database='commemorativecoin', charset='utf8')
cursor = conn.cursor()

commentSql = 'insert into comments (title, link, date, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
mentionSql = 'insert into mentions (coinid, commentid, createdAt, updatedAt) values (%s, %s, %s, %s)'
lines = 0

results = driver.find_elements(by=By.XPATH, value='//*[@id="search"]/div/div/div')
for res in results:
    href = res.find_element(by=By.TAG_NAME, value='a').get_attribute('href')
    title = res.find_element(by=By.TAG_NAME, value='h3').text

    if 'jibi.net' in href:
        try:
            date_str = res.find_element(By.CSS_SELECTOR,
                                    'span.MUxGbd.wuQ4Ob.WZ8Tjf > span').text
            date = datetime.strptime(date_str, "%Y年%m月%d日")
            year = date.year
            if cyear+2 >= year >= cyear-2:
                date = date.strftime("%Y-%m-%d %H:%M:%S")
                value = (title, href, date, now, now)
                cursor.execute(
                    commentSql, value
                )
                cursor.execute(mentionSql, (cid, cursor.lastrowid, now, now))
                lines += 1
        except Exception as e:
            continue
    else:
        if 'article' in href:
            html_text = requests.get(href).text
            soup = BeautifulSoup(html_text, "html.parser")
            elem = soup.select_one('#ct > div > div > div > p')
            if elem:
                date_str = elem.text.split('|')[0].strip() + ':00'
                year = int(date_str[:4])
                if cyear + 2 >= year >= cyear - 2:
                    value = (title, href, date_str, now, now)
                    cursor.execute(commentSql, value)
                    cursor.execute(mentionSql, (cid, cursor.lastrowid, now, now))
                    lines += 1


conn.commit()
conn.close()

driver.quit()
print(lines)