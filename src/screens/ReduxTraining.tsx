import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Counter from "../components/Counter";
import { PERMISSIONS, request } from "react-native-permissions";
import { ReduxTrainingProps } from "../stack/RootStack";
import { useAppSelector } from "../redux/store";
import RNFS from "react-native-fs";




const ReduxTraining = ({ navigation }: ReduxTrainingProps) => {
  const [videoPaths, setVideoPaths] = useState<string[]>([]);
  const askForPermissionCamera = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      if (result === "granted") {
        request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
          if (result === "granted") {
            navigation.navigate("CameraScreen");
          }
        });
      }
    });
  };
  const handlerOpenVideFolder = () => {
    setVideoPaths([])
    RNFS.readDir(RNFS.ExternalDirectoryPath).then((result) => {
      for (const video of result) {
        setVideoPaths(prevState => [...prevState, video.path]);
      }
    }).catch(e => console.log(e));
    console.log(videoPaths);
  };

  const photos = useAppSelector(state => state.photos);

  useEffect(() => {
    handlerOpenVideFolder()
  }, [photos]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <Text style={{ color: "white", alignSelf: "center", fontSize: 26 }}>Counter: </Text>
        <Counter propsStyle={{ marginVertical: 10, alignItems: "center" }} />
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Button onPress={handlerOpenVideFolder} title={"Show paths to videos in console"} />
          </View>
          <Button onPress={askForPermissionCamera} title={"Open camera"} />
        </View>
        <View>
          {photos && (
            <View style={styles.previewContainer}>
              <FlatList numColumns={2} contentContainerStyle={{ flexGrow: 1 }} data={photos} renderItem={({ item }) =>
                <Image style={styles.previewImage} source={{ uri: item }} />
              } />
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 15
  },
  previewContainer: {
    marginVertical: 10,
    width: "100%"

  },
  previewImage: {
    width: 175,
    height: 150,
    margin: 5
  }
});

export default ReduxTraining;
