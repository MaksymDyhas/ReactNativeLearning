import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PERMISSIONS, request } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

const Geolocations = () => {
  const [currentLongitude, setCurrentLongitude] = useState<number>();
  const [currentLatitude, setCurrentLatitude] = useState<number>();
  const [locationStatus, setLocationStatus] = useState("Press on button above");

  const askForPermissionCamera = () => {
    setLocationStatus("Getting Location...");
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result === "granted") {
        Geolocation.getCurrentPosition((position) => {
          setLocationStatus("You are here");
          setCurrentLatitude(position.coords.latitude);
          setCurrentLongitude(position.coords.longitude);
        }, (error) => {
          console.log(error);
        });
      }
    });
  };

  useEffect(() => {
    const id = Geolocation.watchPosition((position) => {
      // for check how is working
      console.log(position);
    }, (error) => {
      console.log(error);
    }, { interval: 1 });

    return () => {
      Geolocation.clearWatch(id);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button title={"Get Location"} onPress={askForPermissionCamera} />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 22 }}>{locationStatus}</Text>
          {locationStatus !== 'Press on button above' &&
           <>
            <Text style={{ color: "white", fontSize: 22 }}>CurrentLatitude: {currentLatitude}</Text>
            <Text style={{color: "white", fontSize: 22}}>CurrentLongitude: {currentLongitude}</Text>
           </>
          }
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 15
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15
  }
});

export default Geolocations;
