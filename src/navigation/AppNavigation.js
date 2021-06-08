import React from 'react';


import Gallary from '../screens/Gallary';
import Camera from '../screens/Camera';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const AppNaviagator =()=>{
    return (
        <Tab.Navigator>
          <Tab.Screen name="audio list" component={Gallary} options={{
              tabBarIcon:()=>{
                  return <Feather name="headphones" size={24} color="black" />
              }
          }} />
          <Tab.Screen name="play list" component={Camera} />
        </Tab.Navigator>
      );
}




export default AppNaviagator;
