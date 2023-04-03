import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Config from "react-native-config";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#3b59ab", "rgb(117,95,95)"]}
                      style={styles.linearGradient}>
        <View style={styles.topOfPage}>
          <View style={styles.forPhoto}>
            <Image style={styles.photo} source={require("../../../assets/white-man-person-icon.png")} />
          </View>
          <View style={styles.forInfo}>
            <View style={styles.nameAndSurname}>
              <Text style={styles.name}>{Config.NAME}</Text>
            </View>
            <View style={styles.nameAndSurname}>
              <Text style={styles.name}>Dyhas</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomOfPage}>
          <Text style={styles.labelBio}>BIOGRAPHY</Text>
          <View style={styles.bio}>
            <Text style={styles.aboutInBio}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut commodi, cumque dolorum ea eaque
              eius eveniet illo laboriosam necessitatibus omnis pariatur perspiciatis possimus provident recusandae
              rerum temporibus voluptates voluptatibus. Accusamus dolore minus molestias optio pariatur quod sunt totam!
              Aspernatur deserunt distinctio hic illum incidunt nemo numquam praesentium, quaerat quas!
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  topOfPage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forPhoto: {
    width: 150,
    height: 150,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "rgb(0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    marginTop: 3,
    width: 140,
    height: 140,
    borderRadius: 70
  },
  forInfo: {
    flex: 1,
    height: 150,
    marginLeft: 20,
    justifyContent: "center",
  },
  nameAndSurname: {
    marginVertical: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#1e1c1c",
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
    color: "#f5f2c2",
  },
  bottomOfPage: {
    flex: 2,
  },
  labelBio: {
    marginBottom: 10,
    fontSize: 22,
    fontFamily: "EduNSWACTFoundation-Bold",
    color: "#f5f2c2",
    textAlign: "center",
  },
  bio: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#1e1c1c",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(5,5,5,0.35)",
    padding: 20,
  },
  aboutInBio: {
    fontSize: 22,
    fontFamily: "EduNSWACTFoundation-Medium",
    color: "#f5f2c2",
  },

});

export default Profile;
