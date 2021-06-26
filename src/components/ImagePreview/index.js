import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import * as IMAGE from '../../assets/images'
import Image from '../../components/Image'
import styles from './style.js'

const ImagePreview = (props) => {
  const { isModalVisible, url } = props

  return (
    <Modal animationType="none" transparent={true} visible={isModalVisible}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => props.onClose()}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('Clcked')
            props.onClose()
          }}
          style={styles.closeContainer}
        >
          <Image
            style={styles.closeIcon}
            source={IMAGE.IC_CLOSE}
            tintColor={'white'}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <Image
            source={{
              uri: url,
            }}
            style={styles.imageView}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
export default ImagePreview
