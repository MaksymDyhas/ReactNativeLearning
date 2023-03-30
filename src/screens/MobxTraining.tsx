import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import counter from "../mobx/store/counter";
import users from "../mobx/store/users";
import LinearGradient from "react-native-linear-gradient";
import { observer } from "mobx-react-lite";

const MobxTraining = observer(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={styles.linearGradient} colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.counter}>
            <Text style={styles.text}>Counter: {counter.count}</Text>
            <View style={styles.buttons}>

              <TouchableOpacity onPress={() => {
                counter.increment(1);
              }}
                                style={styles.button}>
                <Text style={styles.text}>+1</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                counter.decrement(2);
              }}
                                style={styles.button}>
                <Text style={styles.text}>-2</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.users}>
            <TouchableOpacity onPress={() => {
              users.fetchUsers();
            }}
                              style={[styles.button, { marginBottom: 20 }]}>
              <Text style={styles.text}>Fetch Users{'\n'}(This will replace current)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              users.addUser("Maksym Dyhas", "1234567890");
            }}
                              style={[styles.button, { marginBottom: 20 }]}>
              <Text style={styles.text}>Add User</Text>
            </TouchableOpacity>
            {users.users.map(user =>
              <View key={user?.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.x} onPress={() => users.deleteUser(user.id)}>X</Text>
                <Text style={{ fontSize: 16, margin: 5, color: "white" }}>{user.id+'. '+ user.name} — {user.phone}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 15
  },
  counter: {
    alignSelf: "center"
  },
  text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center"
  },
  button: {
    paddingVertical: 8,
    borderRadius: 15,
    paddingHorizontal: 40,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderWidth: 1,
    borderColor: "rgba(204,255,255,0.57)",
    marginHorizontal: 5
  },
  buttons: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  users: {
    flex: 1
  },
  x: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black"
  }

});

export default MobxTraining;
