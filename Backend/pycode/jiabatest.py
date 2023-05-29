import jieba
import re


yreg = r'\d+元'
kreg = r'\d+克'
nreg = r'\d+年'

def prehandle(text):
    text = re.sub(yreg, '', text)
    text = re.sub(kreg, '', text)
    text = re.sub(nreg, '', text)

    words = list(jieba.cut(text))
    target = ['中国', '纪念币']  #需要删除的单词
    for item in target:
        if item in words:
            words.remove(item)
    return ''.join(words)

def prehandleArray(text):
    text = re.sub(yreg, '', text)
    text = re.sub(kreg, '', text)
    text = re.sub(nreg, '', text)


    words = list(jieba.cut(text))
    target = ['中国', '纪念币', '金质', '银质', '圆形', "周年"]  #需要删除的单词
    for item in target:
        if item in words:
            words.remove(item)
    return words