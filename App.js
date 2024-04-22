/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Swidth = Dimensions.get('window').width;
const SHight = Dimensions.get('window').height;

const App = () => {
  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [box, setBox] = useState(null);
  const [hairImg, setHairImg] = useState(require('./Src/Assets/Image/h1.png'));
  const camRef = useRef(null);

  const hairs = [
    {
      id: 1,
      img: require('./Src/Assets/Image/h1.png'),
      isSelected: true,
    },
    {
      id: 2,
      img: require('./Src/Assets/Image/h2.png'),
      isSelected: false,
    },
    {
      id: 3,
      img: require('./Src/Assets/Image/h9.png'),
      isSelected: false,
    },
    {
      id: 4,
      img: require('./Src/Assets/Image/h7.png'),
      isSelected: false,
    },
  ];
  const [hairStyle, setHairStyle] = useState(hairs);

  const changeStyle = id => {
    const myStyle = hairStyle.map(item => {
      if (item.id === id) {
        setHairImg(item?.img);
        return {...item, isSelected: true};
      } else {
        return {...item, isSelected: false};
      }
    });
    console.log(myStyle);

    setHairStyle(myStyle);
  };

  const handleFace = ({faces}) => {
    if (faces[0]) {
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        bottomMounthPosition: faces[0].bottomMounthPosition,
      });
    } else {
      setBox(null);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <RNCamera
          ref={camRef}
          style={styles.camera}
          type={type}
          captureAudio={false}
          onFacesDetected={handleFace}
        />
        {box && (
          <>
            <Image
              source={hairImg}
              style={{
                position: 'absolute',
                width: box.boxs.width + 100,
                height: box.boxs.width + 90,
                top: box.boxs.y - 140,
                left: box.boxs.x - 120,
              }}
            />
            {/* <View
              style={{
                position: 'absolute',
                width: box.boxs.width,
                height: box.boxs.height,
                top: box.boxs.y,
                left: box.boxs.x,
                borderWidth: 5,
                borderColor: 'red',
                zIndex: 3000,
              }}></View> */}
          </>
        )}
      </View>

      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          bottom: 30,
        }}>
        {hairStyle?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => changeStyle(item?.id)}
              key={index}
              style={{
                backgroundColor: item?.isSelected ? 'white' : 'grey',
                borderColor: 'white',
                borderWidth: 1,
                padding: 12,
                borderRadius: 50,
              }}>
              <Image source={item?.img} style={{width: 55, height: 55}} />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  camera: {
    flexGrow: 1,
  },
  // ract: ({width, height, x, y}) => {
  //   return {
  //     position: 'absolute',
  //     top: x,
  //     left: y,
  //     width,
  //     height,
  //     borderWidth: 5,
  //     borderColor: 'red',
  //     zIndex: 3000,
  //   };
  // },
});
