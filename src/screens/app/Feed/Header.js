import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from '../../../components'
import { theme } from '../../../constants/colors'
import * as IMAGE from './../../../assets/images'
import styles from './styles'

const Header = (props) => {
  const { onPressView, onPress, isListView, title, isDisplayRightIcon } = props
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity disabled style={styles.headerIcon}></TouchableOpacity>
      <Text style={styles.headerTitleText}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={IMAGE.IC_PLUS}
            style={styles.headerIconMed}
            resizeMode={'contain'}
            tintColor={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header
