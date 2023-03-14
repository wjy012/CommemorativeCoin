export const typeOptions = [
  {
    value: 'common',
    label: '普通纪念币'
  },
  {
    value: 'precious',
    label: '贵金属纪念币'
  },
  {
    value: 'cash',
    label: '纪念钞'
  },
]
export const typeMap = (type)=>{
    switch (type) {
      case 'precious':
        return '贵金属纪念币'
      case 'common':
        return '普通纪念币'
      case 'cash':
        return '纪念钞'
    }
}

export const themeOptions = [
  {
    value: 'NewYear',
    label: '生肖贺岁'
  },{
    value: 'Landscape',
    label: '风光'
  },{
    value: 'Animal',
    label: '动物'
  },{
    value: 'Celebrity',
    label: '人物'
  },{
    value: 'Religion',
    label: '宗教'
  },{
    value: 'Sports',
    label: '体育运动'
  },{
    value: 'Tradition',
    label: '传统文化'
  },{
    value: 'Anniversary',
    label: '纪念日'
  },{
    value: 'Other',
    label: '其他'
  },
]
export const themeMap = (theme)=>{
    switch (theme) {
      case 'NewYear':
        return '生肖贺岁'
      case 'Landscape':
        return '风光'
      case 'Animal':
        return '动物'
      case 'Celebrity':
        return '人物'
      case 'Religion':
        return '宗教'
      case 'Sports':
        return '体育运动'
      case 'Tradition':
        return '传统文化'
      case 'Anniversary':
        return '纪念日'
      case 'Other':
        return '其他'
    }
}