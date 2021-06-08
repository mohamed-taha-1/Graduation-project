// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import BlogStack from './src/Routes/blogRoutes';
// import AppNaviagator from './src/navigation/AppNavigation';
// import { NavigationContainer } from '@react-navigation/native';
// import BlogProvider from './src/context/blogContext';
// export default function App() {
//   return (
//    <BlogStack />

//   );
// }

//   stack navigator 
import React from 'react';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Index  from './src/screens/indexScreen';
import Gallary from './src/screens/Gallary';
import Camera from './src/screens/Camera';
const Stack = createStackNavigator();

function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Index}  options={{
          title: 'My Home',
          headerStyle: {
            backgroundColor: '#015B88',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Gallary" component={Gallary}  options={{
          title: 'Gallary',
          headerStyle: {
            backgroundColor: '#015B88',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Camera " component={Camera}  options={{
          title: 'Camera',
          headerStyle: {
            backgroundColor: '#015B88',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


