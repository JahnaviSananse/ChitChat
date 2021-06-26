import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { theme } from '../../constants/colors'
import styles from './style'

const Loader = (props) => {
  const { isLoading } = props
  if (!isLoading) return null
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
      onRequestClose={() => {
        // onClose()
      }}
    >
      <View pointerEvents={'auto'} style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.white} />
      </View>
    </Modal>
  )
}
export default Loader
