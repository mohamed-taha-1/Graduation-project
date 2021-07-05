import React, { useState, useEffect, Component } from 'react';
import { Button, Image, View, Platform ,StyleSheet,Alert,Text,TouchableOpacity,ScrollView,PlayButton,SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons ,Entypo,AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';

// import {LinearGradient} from 'expo-linear-gradient';
// import Spinner from 'react-native-loading-spinner-overlay';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Speech from 'expo-speech';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// import {BoxShadow} from 'expo-react-native-shadow';




const  CameraScreen=()=> {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [audio , setAudio] = useState(null);
    const [errorMessage , setErrorMessage]= useState(null);
    const [loading, setLoading] = useState(false);






  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    });
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
      
      
    });

    const req=result.uri.replace('data:image/jpeg;base64,','');

    if (!result.cancelled) {
      setImage(req);
     
     
      
    }
  };

  //  upload function 

  const api= async ()=>{

    setLoading(true);

    if(image !=null){
      
      

      let localUri = image;
      // let encoded=base64.encode(localUri);
      // console.log(encoded);
      // console.log(localUri);



      let filename = localUri.split('/').pop();
      // console.log(localUri);
      // console.log(localUri)
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // console.log(type);
    
      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('image', { uri: localUri, name: filename, type });

      // console.log(formData);
     
      //https://final-year-project.azurewebsites.net/Predict

      //  https://final-year-gp-project.herokuapp.com/Predict

/***                     api post     */



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
      // console.log(res);
    }).catch(function(err) {
  
     console.log('error : ',err);
    setErrorMessage('try later !');
     setLoading(false);
    
    })

   



  //    return await fetch('https://final-year-project.azurewebsites.net/Predict', {
          
  //   method: 'POST',
  //   body: formData,
  // //   headers: {
  // //     'Accept': 'application/json',
  // //     'Content-Type': 'application/json',
  // // },
  // }).then(function(response) {
  //   return response.json();
  
  
  
  
  // }).then(data=> {
  //   console.log(data); // this will be a string
  //   setDescription(data.description);
  //   setLoading(false);




  // }).catch(e=>{
  //   console.log(e)
  //   setErrorMessage('Service not avaliabel now  please try again later !');
  //   setLoading(false);
  // });
  
  
  
  }

  };


  // audio function

// const playSound=async ()=>{

//   const testUrl='http://server13.mp3quran.net/basit_mjwd/004.mp3';
//   // 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3';

//   const playbackObject = new Audio.Sound(); 
//    await playbackObject.loadAsync({uri:testUrl},{ shouldPlay: true });

   
 
// };

// read text 

const speak = () => {
  const thingToSay = description;
 
  
  Speech.speak(thingToSay,{rate:.75,
  language:'en-US'
  
  });
};

  //  main function

  return (
    
     <ScrollView  style={{backgroundColor:'white'}}>
      {/* #CBCFD1 */}
      
    
     

        <View   >
        {!image ? (
        
          <Text style={{marginHorizontal:30,  fontSize:18  , marginTop:30}}>No image picked yet.</Text>
        ) : (
          <Image style={style.image} source={{ uri: image }} />
         
        )
        }
        </View>
       
  
        {/* {description && <Text style={{ fontStyle:'italic',fontWeight:'bold'}}>{description}</Text>} */}


           {loading  ?  (
             <View  style={{marginHorizontal:80 }}>
             
                <Spinner
                  visible={true}
                 textContent={'Loading'}
                 textStyle={style.spinnerTextStyle}
                 size={'large'}
                //  color={}
                 overlayColor={'#015B88'}
         
              /> 
          
             </View>
       
      
        ) : (
              <Text style={{ fontStyle:'italic',fontWeight:'bold',marginHorizontal:50 ,marginVertical:30 ,color:'black'}}>{description}</Text>

        )
        }  
    
    <View style={{ flexDirection:'column',alignItems:'center',marginHorizontal:50 ,marginVertical:30 }}>
     
    
       
        {/* { description &&  <TouchableOpacity  onPress={speak}>
          <AntDesign name="play" size={48} color="#015B88" />
          </TouchableOpacity>
        }  */}
        {errorMessage && <Text style={{fontStyle:'italic',fontWeight:'bold'}}>{errorMessage}</Text>}
    
    </View>

      <View  style={{flexDirection:'row', marginVertical:66 }}>
      
      

         { description &&  <Text  style={{marginHorizontal:36,flexDirection:'row',  }}>  <TouchableOpacity  onPress={speak}  >
          <AntDesign name="play" size={40} color="#2d5986"   />
          </TouchableOpacity> </Text>
        } 

      
        {/* style={{ }} */}
           {image &&  <Text style={{marginHorizontal:20 ,flexDirection:'row',marginVertical:-22 , shadowColor: "black",  textShadowOffset: { height: 1, width: 3 },shadowOpacity: 0.8,shadowRadius: 0.5 }}>
          
          <TouchableOpacity  onPress={api}>
     
          {/* #015B88 */}
                <MaterialIcons name="published-with-changes" size={65} color="#2d5986" />
         
          </TouchableOpacity>  </Text>
          
          }


           <TouchableOpacity  onPress={pickImage}>
         
          
              
              <MaterialCommunityIcons name="camera-iris"  style={{marginHorizontal:33 , flexDirection:'row' ,    shadowOpacity: 0.5  ,shadowRadius: 15,}} size={44} color='#2d5986'  />
             
        </TouchableOpacity>
   
       


 
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
  },
  box: {
    // color: "#000",
    // border: 2,
    // radius: 3,
    // opacity: 0.2,
    // x: 0,
    // y: 3,
  }
});

export default CameraScreen;