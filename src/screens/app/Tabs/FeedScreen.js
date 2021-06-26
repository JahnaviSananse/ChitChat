import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Feed from '../Feed'

const Stack = createStackNavigator()

export const FeedScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Feed" headerMode={'none'}>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  )
}
