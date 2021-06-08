
import React, { useState ,useEffect} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert ,TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons ,Entypo,AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';

const Camera = props => {
  const [pickedImage, setPickedImage] = useState();
  const [description, setDescription] = useState(null);
  const [audio , setAudio] = useState(null);
  const [errorMessage , setErrorMessage]= useState(null);


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
      allowsEditing: true,
      // aspect: [16, 9],
      quality: 0.5
    });

    

    const req=image.uri.replace('data:image/jpeg;base64,','');
    setPickedImage(req);
  
  };
//  upload function 

const api= async()=>{

  if(pickedImage !=null){
    
    let localUri = pickedImage;
    let filename = localUri.split('/').pop();
    // console.log(localUri);
    // console.log(localUri)
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('image', localUri );
   
    //
   return await fetch('https://final-year-gp-project.herokuapp.com/Predict', {
        
  method: 'POST',
  body: formData,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
// },
}).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data); // this will be a string
  setDescription(data.description);
  const decode =base64.decode(data.audio);
  setAudio(decode)
}).catch(e=>{
  setErrorMessage('Service not avaliabel now  please try again later !');
});



}

};

   
  // audio function

const playSound=async ()=>{

  const testUrl='https://freesound.org/data/previews/413/413854_4337854-hq.mp3';

  const playbackObject = new Audio.Sound(); 
   await playbackObject.loadAsync({uri:testUrl},{ shouldPlay: true });

   console.log('run audio ');

   
 
};
 
// main 
  return (

     <ScrollView   style={{backgroundColor:'#CBCFD1'}}>
    
     <TouchableOpacity    onPress={takeImageHandler}>
              <Entypo name="camera" size={48} color='#015B88' style={{marginHorizontal:30  , marginTop:30}} />
      </TouchableOpacity>

     
     
        {!pickedImage ? (
          <Text style={{marginHorizontal:30  , marginTop:30}}>No image Taken yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
         
        )
        }

      

      {pickedImage &&  <Text style={{marginHorizontal:40 ,flexDirection:'row',marginVertical:50}}>
          
          <TouchableOpacity  onPress={api}>
                <MaterialIcons name="insert-photo" size={45} color="#015B88" />
          </TouchableOpacity> click icon for description </Text>
          
          }
 
        {description && <Text style={{ fontStyle:'italic',fontWeight:'bold'}}>{description}</Text>}  
    
    <View style={{ flexDirection:'column',alignItems:'center',marginVertical:10,marginHorizontal:10 }}>
     
      
       
        {pickedImage  &&  <TouchableOpacity  onPress={playSound}>
          <AntDesign name="play" size={48} color="#015B88" />
          </TouchableOpacity>
        }
        {errorMessage && <Text style={{fontStyle:'italic',fontWeight:'bold'}}>{errorMessage}</Text>}
    
     
    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300 ,
    marginTop:-10 ,
    marginHorizontal:30 ,
    height: 400 ,
    borderWidth:5 ,
    borderRadius:28,
    borderColor:'#FFF',
    marginVertical:5
   }
});

export default Camera;