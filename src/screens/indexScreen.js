import React from 'react';

import {View , Text, Button ,StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const Index =({navigation})=>{
    return(
    <ScrollView style={{backgroundColor:'white'}} >
        
         <Text style={styles.Text}>
                Choose  a way  to get  the image 
            </Text>
        <View style={{marginVertical:16, flexDirection:'row',}}>
           


            <TouchableOpacity  onPress={() => navigation.push('Gallary')} style={{justifyContent: 'center',   alignItems: 'center',flexDirection:'row',left : 50, width:100, height: 50 , backgroundColor:'#2d5986', borderRadius:12,}}>
                <Text style={ {color:'#ffd699' , fontSize:20 }}>
                    Gallary 
                </Text>
           </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.push('Camera ')} style={{justifyContent: 'center',   alignItems: 'center',flexDirection:'row', height: 50 , width:100, left:100, backgroundColor:'#2d5986', borderRadius:12,}}>
                <Text style={ {color:'#ffd699' ,fontSize:20 }}>
                    Camera
                </Text>
           </TouchableOpacity>
             {/* <Button   title=' camera  ' onPress={() => navigation.push('Camera')} style={styles.Button}/> */}
            
          
        </View>

        <View style={{marginVertical:180,justifyContent: 'center',}}>
        
           <Text style={styles.Text2}>This is the graduation project {"\n"}  application we developed . it 
            helps Us to generate description for image as a Text and audio ..
            </Text>
        
        </View>
    </ScrollView>
    );
};

const styles=StyleSheet.create({
    Text:{
        color:'black',
        margin:30,
        fontSize:15,
        textAlign:'center',
        alignContent:'center'
        
    },
    Text2:{
        color:'black',
        fontFamily:'sans-serif',
        fontSize:17,
        // fontWeight:'bold',
        margin:30,
        textAlign:'center',
        alignContent:'center'
        
    },
    Button:{
        marginBottom:50
        
        
    }
})


export default Index;