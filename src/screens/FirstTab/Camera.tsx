import React, { useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { RNCamera, TakePictureResponse } from "react-native-camera";
import { CameraScreenProps } from "../../stack/RootStack";
import { useAppDispatch } from "../../redux/store";
import { add } from "../../redux/slices/photosSlice";
import RNFS from "react-native-fs";

const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const cameraRef = useRef<RNCamera>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri }: TakePictureResponse = await cameraRef.current.takePictureAsync();
        dispatch(add(uri));
        navigation.goBack();
      } catch (e) {
        navigation.goBack();
        Alert.alert("Помилка", "Сталася помилка, спробуйте ще раз");
      }
    }
  };

  const takeVideo = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const { uri } = await cameraRef.current.recordAsync();
        console.log(uri);
        const name = uri.slice(-41)
        const newFilePath = RNFS.ExternalDirectoryPath + name;
        await RNFS.moveFile(uri, newFilePath);
      } catch (e) {
        navigation.goBack();
        Alert.alert("Помилка", "Сталася помилка, спробуйте ще раз");
      }
    }
  };

  const stop = async () => {
    cameraRef.current?.stopRecording();
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        defaultVideoQuality={RNCamera.Constants.VideoQuality["480p"]}
      />


      <View style={styles.captureContainer}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {!isRecording ?
            <>
              <TouchableOpacity
                style={styles.captureVideo}
                onPress={takeVideo}
              />
              <TouchableOpacity style={styles.capturePhoto} onPress={takePicture} />
            </>
            :
            <TouchableOpacity
              style={{ ...styles.captureVideo, padding: 19, backgroundColor: "aqua" }}
              onPress={stop}
            ><View style={{ backgroundColor: "black", width: 12, height: 12 }} /></TouchableOpacity>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  captureContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20
  },
  capturePhoto: {
    position: "absolute",
    right: 10,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderRadius: 35,
    padding: 25,
    borderWidth: 2
  },
  captureVideo: {
    backgroundColor: "#ff0000",
    borderColor: "black",
    borderRadius: 35,
    padding: 25,
    borderWidth: 2
  },
  captureText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default CameraScreen;
