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

export const forumsTabs = ['Forums', 'News']
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

export const enum NotificationsTypes {
  commentOnPost='commentOnPost',
  likeOnComment='likeOnComment',
  likeOnPost='likeOnPost',
  postOnSavedGame='postOnSavedGame',
  replyOnComment='replyOnComment',
  saveOnPost='saveOnPost',
  mentionOfUsername='mentionOfUsername',
  afkAnnouncement='afkAnnouncement',
  communityRecommendation='communityRecommendation',
  featuredContent='featuredContent',
  trendingPost='trendingPost'
}


export const notificationsTypesEnum = {
  '0': 'liked your post',
  '1': 'liked your comment',
  '2': 'liked your comment',
  '3': 'saved your post',
  '5': 'commented your post',
  '6': 'replied you' 
}

export const passwordTips = ['Password has at east 8 characters.', 'Password has special characters.', 'Password has a number.', 'Password has a capital letter.', 'Passwords match.']