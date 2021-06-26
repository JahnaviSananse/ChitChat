import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Chat from '../Chat'
import Home from '../Home'

const Stack = createStackNavigator()

export const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}
