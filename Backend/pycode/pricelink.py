import re
import sys
import requests
from bs4 import BeautifulSoup
from difflib import SequenceMatcher

def toGBcode(string):
    code = string.encode('gb2312')
    s = ''
    for byte in code:
        s += '\\x' + format(byte, '02x')
    return s.replace('\\x', "%")

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

# 用于添加纪念币时获取价格链接的程序
# 参数为 纪念币名称
cname = sys.argv[1]
nameCode = toGBcode(cname)
res = requests.get(f'http://www.5151sc.com/searchs.php?kw={nameCode}&page=0')
res.encoding = 'gb2312'
res = res.text
soup = BeautifulSoup(res, "html.parser")

hrefs = soup.select('body > div.search_all > div.search_cont > dl > dd.p_title > a')
href = ''
max = 0
for it in hrefs:
    if similarity(cname, it.text) > max: 
        href = it.get('href')
        
print('http://www.5151sc.com/' + href)