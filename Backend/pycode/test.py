import requests
from bs4 import BeautifulSoup

proxies = {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890",
}

# res = requests.get('http://jibi.net/News/jpsx.html')
# res = requests.get('https://www.financialnews.com.cn/cul/tzsc/index_5.html', verify=False, proxies=proxies)
# res.encoding = 'utf-8'
# soup = BeautifulSoup(res.text, "html.parser")
# print(res.status_code)
# print(soup.select_one('span.pp_price').text)
# table = soup.select_one('body > table:nth-child(8) > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table ')

# print(table.select('tbody > tr > td:nth-child(2)'))
# print(soup.select('#list > li.newslist'))

print(requests.__version__)