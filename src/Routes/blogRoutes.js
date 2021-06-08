import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Index  from '../screens/indexScreen';
import CameraScreen from '../screens/Gallary';
import Camera from '../screens/Camera';

const Stack = createStackNavigator();
export default function BlogStack(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Index} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  // const BlogStack = createStackNavigator(screens,{
  //   defaultNavigationOptions:{
  //     headerTintColor:'#CBCFD1',  // text color 
  //     headerStyle:{
  //       backgroundColor:'#015B88',
  //       // 'rgb(324,123,5)',
  //       height:90,
  //       shadowOffset:0.4,
        
       
  //     }
  //   },
    
     
  // });
  
  // export default BlogStack;