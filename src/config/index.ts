export const settingsList = [
  { name:'My info', path: '/settings/myinfo'},
  { name:'Notifications', path: '/settings/notifications'},
  // { name:'Activities', path: '/settings/activities'},
  { name:'Privacy and Security', path: '/settings/security'}
]

export const homeTabsList = [
  { label: 'Latest Posts', value: 'latest'},
  { label: 'Popular Posts', value: 'popular'},
  // { label: 'Featured Posts', value: '3'},
  { label: 'Newest Replies', value: 'newest'}
]

export const searchOptions = [
  { label: "Search in Store", value: 'store'},
  { label: "Search in Forums", value: 'forum'}
]

export const mothEnmus = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sept',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

export const enum MsgTypes {
  comment='comment',
  reply='reply'
}

export const enum LoveTypes {
  save='save',
  like='like'
}