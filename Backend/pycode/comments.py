import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymysql
import urllib3


urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
proxies = {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890",
}

conn = pymysql.connect(host='localhost', port=3306,
                        user='root', password='root',
                        database='commemorativecoin',
                        charset='utf8')
cursor = conn.cursor()

now = str(datetime.now()).split('.')[0]
commentSql = 'insert into comments (title, link, date, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
lines = 0
def insertDB(title, href, date):
    global lines, now
    value = (title, href, date, now, now)
    cursor.execute(commentSql, value)
    lines += 1

page = 0
flag = 0
while 1: 
    if(page == 0):
        res = requests.get('http://jibi.net/News/jpsx.html')
    else:
        res = requests.get(f'http://jibi.net/News/jpsx_{page+1}.html')
    page += 1
    res.encoding = 'gb2312'
    soup = BeautifulSoup(res.text, "html.parser")
    try:
        table = soup.select_one('body > table:nth-child(8) > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table ')
        trs = table.select('tbody > tr')
    except Exception as e:
        break    

    for item in trs: 
        title = item.select_one('td > a').get('title')
        link = 'http://jibi.net' + item.select_one('td > a').get('href')
        date_str = item.select_one('td:nth-child(2)').text
        date = datetime.strptime(date_str, "%y年%m月%d日")
        try: 
            insertDB(title, link, date)
        except Exception as e:
            flag = 1
            break    
    if flag == 1: 
        break

page = 0
flag = 0
while 1: 
    if(page == 0):
        res = requests.get('https://www.financialnews.com.cn/cul/tzsc/index.html', verify=False, proxies=proxies)
    else :
        res = requests.get(f'https://www.financialnews.com.cn/cul/tzsc/index_{page}.html', verify=False, proxies=proxies)
        if res.status_code == 404:
            break
    page += 1
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, "html.parser")
    lis = soup.select('#list > li.newslist')

    for item in lis:
        title = item.select_one('a').text
        if '币' not in title:
            continue
        link = 'https://www.financialnews.com.cn/cul/tzsc' + item.select_one('a').get('href')[1:]
        date_str = item.select_one('span').text
        date = datetime.strptime(date_str, "%Y年%m月%d日%H：%M")
        try: 
            insertDB(title, link, date)
        except Exception as e:
            flag = 1
            break    

    if flag == 1: 
        break

conn.commit()
conn.close()
print(lines)
