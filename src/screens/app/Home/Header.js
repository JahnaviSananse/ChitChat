import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from '../../../components'
import { theme } from '../../../constants/colors'
import * as IMAGE from './../../../assets/images'
import styles from './styles'

const Header = (props) => {
  const {
    onPressView,
    onPressSearch,
    isListView,
    title,
    isDisplayRightIcon,
  } = props
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity disabled style={styles.headerIcon}></TouchableOpacity>
      <Text style={styles.headerTitleText}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        {isDisplayRightIcon ? (
          <TouchableOpacity onPress={onPressSearch}>
            <Image
              source={IMAGE.IC_SEARCH}
              style={styles.headerIconMed}
              resizeMode={'contain'}
              tintColor={theme.colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIcon} />
        )}
      </View>
    </View>
  )
}

export default Header
