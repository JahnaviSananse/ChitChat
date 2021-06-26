import dayjs from 'dayjs'
import { Dimensions, Platform } from 'react-native'
import { diff_hours, diff_minutes } from '../utility/util'

const dim = Dimensions.get('window')
const isX =
  Platform.OS === 'ios' && (dim.height > 800 || dim.width > 800) ? true : false

export const MSG = ''
export const IS_IPHONEX = isX ? true : false
export const IPHONE = Platform.OS === 'ios' ? true : false
export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const TAB_HEIGHT = isX ? 100 : 60

export const USER_DATA = 'user_data'
export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
export const IS_FIRST_TIME = 'is_first_time'
export const CUSTOM_LINK = 'custom_link'

export const TIME_FORMATE = 'hh:mm A'
export const TIME_FORMATE_D = 'hh:mm A'
export const TIME_FORMATE_M = 'MM/DD'
export const TIME_FORMATE_MSG_TITLE = 'MMM DD, YYYY'

export const CheckPassword = (inputtxt) => {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  if (inputtxt.match(passw)) {
    return true
  } else {
    return false
  }
}

export const getSize = (size) => {
  let newSize = size
  return newSize
}

export const getFinalDate = (date) => {
  let today = new Date()
  let fDate = dayjs(today).format('DD/MM/YYYY')
  let fNDate = dayjs.unix(date).format('DD/MM/YYYY')
  let displayDate = fNDate
  var toUTC = new Date(date)

  if (fNDate === fDate && diff_hours(today, toUTC) === 0) {
    let min = diff_minutes(today, toUTC) > 0 ? diff_minutes(today, toUTC) : 1
    if (min > 1) {
      displayDate = min + ' minutes ago'
    } else {
      displayDate = min + ' minute ago'
    }
  } else if (fNDate === fDate && diff_hours(today, toUTC) > 0) {
    displayDate = diff_hours(today, toUTC) + ' hours ago'
  } else {
    displayDate = dayjs.unix(date).format('MMM DD, YYYY')
  }
  return displayDate
}
