import React, { useState, useEffect, Component } from 'react';
import { Button, Image, View, Platform ,StyleSheet,Alert,Text,TouchableOpacity,ScrollView,PlayButton,SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons ,Entypo,AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';
// import {LinearGradient} from 'expo-linear-gradient';
// import Spinner from 'react-native-loading-spinner-overlay';


import axios from 'axios';

const  CameraScreen=()=> {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [audio , setAudio] = useState(null);
    const [errorMessage , setErrorMessage]= useState(null);



  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      
      
    });

    const req=result.uri.replace('data:image/jpeg;base64,','');

    if (!result.cancelled) {
      setImage(req);
     
     
      
    }
  };

  //  upload function 

  const api= async()=>{

    if(image !=null){
      
      let localUri = image;
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

   
 
};


  //  main function

  return (
     <ScrollView  style={{backgroundColor:'#CBCFD1'}}>
      
      
        <TouchableOpacity  onPress={pickImage}>
              <Entypo name="camera" size={48} color='#015B88' style={{marginHorizontal:30  , marginTop:30}} />
        </TouchableOpacity>
        
        {!image ? (
          <Text style={{marginHorizontal:30  , marginTop:30}}>No image picked yet.</Text>
        ) : (
          <Image style={style.image} source={{ uri: image }} />
         
        )
        }
       
   
        {image &&  <Text style={{marginHorizontal:40 ,flexDirection:'row',marginVertical:50}}>
          
          <TouchableOpacity  onPress={api}>
                <MaterialIcons name="insert-photo" size={45} color="#015B88" />
          </TouchableOpacity> click icon for description </Text>
          
          }
 
        {description && <Text style={{ fontStyle:'italic',fontWeight:'bold'}}>{description}</Text>}  
    
    <View style={{ flexDirection:'column',alignItems:'center',marginVertical:10,marginHorizontal:10 }}>
     
    
       
        {description  &&  <TouchableOpacity  onPress={playSound}>
          <AntDesign name="play" size={48} color="#015B88" />
          </TouchableOpacity>
        }
        {errorMessage && <Text style={{fontStyle:'italic',fontWeight:'bold'}}>{errorMessage}</Text>}
    
    </View>

    </ScrollView>
    
  );
}


const style=StyleSheet.create({
    textStyle:{
        fontSize:14,
        textAlign:'center',
        top:50,
    },
    containFloat:{
      position: 'absolute',
      width: 50,
      height: 50,
       left: 30,
      top: 120,
    },
    float:{
    resizeMode: 'contain',
    width: 50,
    height: 50,
    },
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

export default CameraScreen;