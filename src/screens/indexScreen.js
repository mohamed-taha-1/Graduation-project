import React from 'react';

import {View , Text, Button ,StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const Index =({navigation})=>{
    return(
    <ScrollView style={{backgroundColor:'#CBCFD1'}} >
        <View style={{flexDirection:'column'}}>
            <Text style={styles.Text}>
                Choose  a way  to get  the image 
            </Text>


            <TouchableOpacity  onPress={() => navigation.push('Gallary')}>
                <Text style={ {color:'#015B88' , fontSize:30 ,marginHorizontal:40}}>
                    Gallary 
                </Text>
           </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.push('Camera ')}>
                <Text style={ {color:'#015B88'  , fontSize:22 ,marginHorizontal:40}}>
                    Camera
                </Text>
           </TouchableOpacity>
             {/* <Button   title=' camera  ' onPress={() => navigation.push('Camera')} style={styles.Button}/> */}
            
          
        </View>
    </ScrollView>
    );
};

const styles=StyleSheet.create({
    Text:{
        color:'black',
        margin:30,
        textAlign:'center',
        alignContent:'center'
        
    },
    Button:{
        marginBottom:50
        
        
    }
})


export default Index;