import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TodoListProps } from "../../stack/RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoList = ({ navigation }: TodoListProps) => {
  const [allThings, setAllThings] = useState<{ title: string, desc: string }[]>([]);
  const buffer: { title: string, desc: string }[] = [];

  useEffect(() => {
    getAllThings();
  }, []);

  const getAllThings = useCallback(async () => {
    const data = await AsyncStorage.getItem("things").then(data => data && JSON.parse(data)).catch(e => console.log(e));
    if (data !== null) {
      data.things.map((item: { title: string, desc: string }) => buffer.push(item));
      setAllThings(buffer);
    }
  }, []);

  const deleteThing = useCallback(async (index: number) =>{
    const newList = allThings.filter((_,ind)=>ind !== index)
    setAllThings(newList)
    try {
      await AsyncStorage.setItem("things", JSON.stringify({ things: newList }));
    } catch (e) {
      console.log(e);
    }
  },[allThings])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#3b59ab", "rgb(117,95,95)"]} style={styles.linearGradient}>
        <FlatList contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} data={allThings} renderItem={({ item, index }) => {
          return (
            <View style={styles.oneThing}>
              <Text style={{ fontSize: 26, fontWeight: "600", margin: 10, color: "#000" }}>{item.title}</Text>
              <Text style={{ fontSize: 20, fontWeight: "500", marginLeft: 10, color: "#000" }}>{item.desc}</Text>
              <Text style={{ position:'absolute', right: 20, top: 20, borderWidth: 1, borderRadius: 10 ,borderColor:'red', padding: 10, color: "red" }} onPress={()=>deleteThing(index)}>Delete</Text>
            </View>
          );
        }}></FlatList>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddTodo")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#fff",
    backgroundColor: "#2a2626",
    position: "absolute",
    right: 20,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "300"
  },
  oneThing: {
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#e3d6d6",
    alignSelf: "center",
    height: 100
  }

});

export default TodoList;
