import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { getFinalDate } from '../../constants/constant'
import Image from '../Image'
import styles from './styles'

const ListCell = ({ item, index, data, onPress }) => {
  const navigation = useNavigation()

  const renderItem = ({ item, index }) => {
    let dt = getFinalDate(item.insert_datetime)

    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item)
        }}
        style={styles.itemContainer}
      >
        <Image source={{ uri: item.profile_image }} style={styles.itemIcon} />
        <View style={styles.itemDetail}>
          <Text numberOfLines={1} style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text>{item.last_chat}</Text>
        </View>
        <Text style={styles.messageCount}>
          {item.unread_count + ' New Message'}
        </Text>
        <Text style={{ position: 'absolute', right: 0, bottom: 8 }}>{dt}</Text>
        {item.unread_count > 0 && <View style={styles.redDot} />}
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      // style={styles.flatlistContainer}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text>No Recent Chats Available</Text>
        </View>
      )}
    />
  )
}

export default ListCell
