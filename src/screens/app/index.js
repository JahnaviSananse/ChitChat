import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { navigationRef } from 'src/routes/router'
import ChitChatTabs from './Tabs'

const Stack = createStackNavigator()

export const App = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={ChitChatTabs} />
    </Stack.Navigator>
  </NavigationContainer>
)
