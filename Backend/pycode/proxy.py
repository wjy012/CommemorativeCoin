import json
import sys
import time
import datetime
import pymysql
from selenium import webdriver
from browsermobproxy import Server
from selenium.webdriver.chrome.options import Options
from jiabatest import prehandle


[cname, cid, cyear] = sys.argv[1:]
cyear = int(cyear)
cname = prehandle(cname)

server = Server(r'C:\Users\junyi\Desktop\utils\browsermob-proxy-2.1.4\bin\browsermob-proxy.bat')
server.start()
proxy = server.create_proxy()

caps = {
    "browserName": "chrome",
    'goog:loggingPrefs': {'performance': 'ALL'}  # 开启日志性能监听
}
options = Options()
options.add_argument(f"--proxy-server={proxy.proxy}")
options.add_argument('--ignore-certificate-errors')
options.add_experimental_option("excludeSwitches", ['enable-automation', 'enable-logging'])
driver = webdriver.Chrome(desired_capabilities=caps, options=options)  # 启动浏览器

proxy.new_har("jinianbi", options={'captureHeaders': True, 'captureContent': True})

conn = pymysql.connect(host='localhost', port=3306, user='root', password='root', database='commemorativecoin', charset='utf8')
cursor = conn.cursor()

commentSql = 'insert into comments (title, link, date, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
mentionSql = 'insert into mentions (coinid, commentid, createdAt, updatedAt) values (%s, %s, %s, %s)'

now = str(datetime.datetime.now()).split('.')[0]

# for page in range(4):
#     driver.get(f'http://www.cgccl.cn/common/unpic-news-list?columnId=2046&searchText=%E8%B5%8F%E6%9E%90&search={{"pageNo":{page+1}}}&searchInput=true')
#     time.sleep(40)
#     result = proxy.har
#
    # for entry in result['log']['entries']:
    #     _url = entry['request']['url']
    #     if "/api/misc/chngc/misc/portal/content/list" in _url:
    #         _response = entry['response']
    #         _content = _response['content']['text']
    #         jsondata = json.loads(_content)
    #         data = jsondata['data']['result']['data']
    #         for item in data:
    #             link = 'http://www.cgccl.cn/common/news-detail?id=' + str(item['id'])
    #             title = item['title']
    #             date = datetime.datetime.utcfromtimestamp(item['releaseDate'] / 1000)
    #             print(title, link, date)
    #             cursor.execute(
    #                 'insert into comments (title, link, date, createdAt, updatedAt) values (%s, %s, %s, %s, %s)',
    #                 (title, link, date, now, now)
    #             )


page = 1
total = 100
while True:
    driver.get(f'http://www.cgccl.cn/common/search?searchText={cname}&search={{"pageNo":{page}}}')
    time.sleep(5)
    result = proxy.har
    for entry in result['log']['entries']:
        _url = entry['request']['url']
        if "/api/misc/chngc/misc/portal/content/list" in _url:
            _response = entry['response']
            _content = _response['content']['text']
            jsondata = json.loads(_content)
            data = jsondata['data']['result']['data']
            total = jsondata['data']['result']['total']
            for item in data:
                link = 'http://www.cgccl.cn/common/news-detail?id=' + str(item['id'])
                title = item['title']
                date = datetime.datetime.utcfromtimestamp(item['releaseDate'] / 1000)
                if cyear+2 >= date.year >= cyear-2:
                    cursor.execute(
                        commentSql,
                        (title, link, str(date), now, now)
                    )
                    print(cursor.lastrowid)
                    cursor.execute(
                        mentionSql,
                        (int(cid), cursor.lastrowid, now, now)
                    )
    if page*5 >= total:
        break
    page += 1

conn.commit()
conn.close()

server.stop()
driver.quit()
