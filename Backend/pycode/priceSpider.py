import requests
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime
import re
import sys

# 用于爬取纪念币价格信息的爬虫
# 参数为 纪念币id，纪念币价格链接
# 不传参时爬取所有纪念币的价格信息

file_handle = open('./log.txt', mode='a+')

conn = pymysql.connect(host='localhost', port=3306,
                        user='root', password='root',
                        database='commemorativecoin',
                        charset='utf8')
cursor = conn.cursor()
selSQL = 'SELECT id, pricelink from coins WHERE pricelink IS NOT NULL'
insertSQL = 'insert into prices (id, date, price, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
now = str(datetime.now()).split('.')[0]
reg = r'\d+'

file_handle.write(f'Run: {now}\n')

if sys.argv[1:]:
    [cid, pricelink] = sys.argv[1:]
    html = requests.get(pricelink).text
    soup = BeautifulSoup(html, "html.parser")
    priceText = soup.select_one('span.pp_price').text
    price = int(re.findall(reg, priceText)[0])
    cursor.execute(insertSQL, (cid, now, price, now, now))

else:
    cursor.execute(selSQL)
    res = cursor.fetchall()
    for row in res:
        cid = row[0]
        link = row[1]
        html = requests.get(link).text
        soup = BeautifulSoup(html, "html.parser")
        try: 
            if soup.select_one('span.pp_price')== None:
                print(link, soup)
            priceText = soup.select_one('span.pp_price').text
            price = int(re.findall(reg, priceText)[0])
            cursor.execute(insertSQL, (cid, now, price, now, now))
        except Exception as e:
            print('catch err', e)
            file_handle.write(f'catch err: {e}\n')


result = cursor.fetchall()
print('res: ',result)
file_handle.write(f'res: {result}\n')


conn.commit()
conn.close()

file_handle.close()