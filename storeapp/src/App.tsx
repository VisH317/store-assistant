import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// react query and navigation setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStackNavigator } from '@react-navigation/stack';

// component imports
import Home from './pages/Home';
import Search from './pages/Search'
import Chat from './pages/Chat'

type RootStackParamList = {
  Home: undefined,
  Search: undefined,
  Chat: { storeID: string }
}

const Stack = createStackNavigator<RootStackParamList>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0 }
  }
})



export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={backgroundStyle}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>
      </SafeAreaView>
    </QueryClientProvider>
  );
}