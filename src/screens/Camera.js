
import React, { useState ,useEffect} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert ,TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons ,Entypo,AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Speech from 'expo-speech';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Camera = props => {
  const [pickedImage, setPickedImage] = useState();
  const [description, setDescription] = useState(null);
  const [audio , setAudio] = useState(null);
  const [errorMessage , setErrorMessage]= useState(null);
   const [loading, setLoading] = useState(false);




  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };



  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      // aspect: [16, 9],
      quality: 0.5
    });

    

    const req=image.uri.replace('data:image/jpeg;base64,','');
    setPickedImage(req);
  
  };




//  upload function 

const api= async()=>{
  setLoading(true);
  if(pickedImage !=null){
    
    let localUri = pickedImage;
    // console.log(localUri);


    let filename = localUri.split('/').pop();
    // console.log(localUri);
    // console.log(localUri)
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('image', { uri: localUri, name: filename, type } );
    // console.log(formData);
   
    //api 



        return await  fetch('https://final-year-project.azurewebsites.net/Predict', {
          
    method: 'POST',
    body: formData,
       headers: {
      'content-type': 'multipart/form-data',
    },
  })
  .then(function(resp){
    
    return resp.json();
    
    
    }).then(function(res){
       
      const desc= res.description;
       const edit=desc.replace('start','');
      const edit2=edit.replace('end','');
        
     setDescription(edit2);
      setLoading(false);
      //  console.log(res);
    }).catch(function(err) {
  
     console.error('error : ',err);
    setErrorMessage('try later !');
     setLoading(false);
    
    })




//    return await fetch('https://final-year-gp-project.herokuapp.com/Predict', {
        
//   method: 'POST',
//   body: formData,
// //   headers: {
// //     'Accept': 'application/json',
// //     'Content-Type': 'application/json',
// // },
// }).then(function(response) {
//   return response.json();
// }).then(function(data) {
//   console.log(data); // this will be a string
//   setDescription(data.description);
//   setLoading(false);
//   const decode =base64.decode(data.audio);
//   setAudio(decode)
// }).catch(e=>{
//   setErrorMessage('Service not avaliabel now  please try again later !');
//   setLoading(false);
// });

}};






   
  // audio function

// const playSound=async ()=>{

//   const testUrl='http://server13.mp3quran.net/basit_mjwd/004.mp3';
//   // 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3';

//   const playbackObject = new Audio.Sound(); 
//    await playbackObject.loadAsync({uri:testUrl},{ shouldPlay: true });

//    console.log('run audio ');

   
 
// };
 

const speak = () => {
  const thingToSay = description;
    Speech.speak(thingToSay,{rate:.75,
  language:'en-US'
  
  });
};



// main 
  return (

     <ScrollView   style={{backgroundColor:'white'}}>
    
     {/* <TouchableOpacity    onPress={takeImageHandler}>
              <Entypo name="camera" size={48} color='#015B88' style={{marginHorizontal:30  , marginTop:30}} />
      </TouchableOpacity> */}

      
     
        {!pickedImage ? (
          <Text style={{marginHorizontal:30 ,fontSize:18 , marginTop:30}}>No image Taken yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
         
        )
        }

      

      {/* {pickedImage &&  
          
          <TouchableOpacity  onPress={api }  style={{float:'left'}}>
                <MaterialIcons name="description" size={45} color="#015B88" />
                
          </TouchableOpacity>  
          
          } */}
 
        {/* {description && <Text style={{ fontStyle:'italic',fontWeight:'bold'}}>{description}</Text>}  */}

       
      
         {loading  ?  (
          <View  style={{marginHorizontal:100, marginVertical:100 , flexDirection:'row' }}>
             
                <Spinner
                  visible={true}
                  size={'large'}
                  overlayColor={'#015B88'}
                  textContent={'Loading'}
                 textStyle={styles.spinnerTextStyle}
         
              /> 
          
             </View>
        ) : (
           <Text style={{ fontStyle:'italic',marginHorizontal:50 ,marginVertical:30 ,flexDirection:'row',fontWeight:'bold'}}>{description}</Text>
         
        )
        }  
       
       
        
         
    <View style={{ flexDirection:'column',alignItems:'center',marginHorizontal:50 ,marginVertical:30}}>
     
      
       
        {/* {description  &&  <TouchableOpacity   onPress={speak}>
          <AntDesign name="play" size={48} color="#015B88" />
          </TouchableOpacity>
        } */}
        {errorMessage && <Text style={{fontStyle:'italic',fontWeight:'bold'}}>{errorMessage}</Text>}
    
    
    </View>


       <View  style={{flexDirection:'row', marginVertical:66 }}>
      
      

         { description &&  <Text  style={{marginHorizontal:36,flexDirection:'row',  }}>  <TouchableOpacity  onPress={speak}  >
          <AntDesign name="play" size={40} color="#2d5986"   />
          </TouchableOpacity> </Text>
        } 

      
        {/* style={{ }} */}
           {pickedImage &&  <Text style={{marginHorizontal:20 ,flexDirection:'row',marginVertical:-22 , shadowColor: "black",  textShadowOffset: { height: 1, width: 3 },shadowOpacity: 0.8,shadowRadius: 0.5 }}>
          
          <TouchableOpacity  onPress={api}>
     
          {/* #015B88 */}
                <MaterialIcons name="published-with-changes" size={65} color="#2d5986" />
         
          </TouchableOpacity>  </Text>
          
          }


          <TouchableOpacity  onPress={takeImageHandler}>
         
          
              
              <MaterialCommunityIcons name="camera-iris"  style={{marginHorizontal:33 , flexDirection:'row' ,    shadowOpacity: 0.5  ,shadowRadius: 15,}} size={44} color='#2d5986'  />
             
        </TouchableOpacity>
   
       


 
        </View>




    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
   width: null ,
    marginTop:-10 ,
    // marginHorizontal:30 ,
    height: 400 ,
    // borderWidth:5 ,
    // borderRadius:28,
    // borderColor:'#FFF',
    // marginVertical:5
    resizeMode:'cover'
   },
   spinnerTextStyle: {
    color: '#FFFFFF',
  }
});

export default Camera;