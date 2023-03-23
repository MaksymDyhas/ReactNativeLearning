import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AddTodoProps } from "../stack/RootStack";


const AddTodo = ({ navigation }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");


  const saveThings = useCallback(async () => {
    let temp = await AsyncStorage.getItem("things").then(data => data && JSON.parse(data)).catch(e => console.log(e));
    if (temp === null) {
      temp = { "things": [] };
    }
    temp["things"].push({ title, desc });
    try {
      await AsyncStorage.setItem("things", JSON.stringify({ things: temp["things"] }));
    } catch (e) {
      console.log(e);
    }
    navigation.goBack()
    navigation.navigate('Home')
    navigation.navigate('TodoList')
  }, [title, desc]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#3b59ab", "rgb(117,95,95)"]} style={styles.linearGradient}>
        <TextInput placeholder="Enter title" style={styles.input} value={title} onChangeText={setTitle} />
        <TextInput placeholder="Enter description" style={styles.input} value={desc} onChangeText={setDesc} />
        <TouchableOpacity style={styles.button} disabled={!(title && desc)} onPress={() => saveThings()}>
          <Text style={styles.buttonText}>Add things </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    fontSize: 18,
    width: "90%",
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 30,
    paddingLeft: 20
  },
  button: {
    width: "90%",
    height: 55,
    borderRadius: 15,
    marginTop: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 20
  }

});

export default AddTodo;
