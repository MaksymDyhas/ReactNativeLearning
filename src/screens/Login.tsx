import React, { useCallback, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import LinearGradient from "react-native-linear-gradient";
import { showMessage } from "react-native-flash-message";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameForCheck, setUsernameForCheck] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const signUp = useCallback(async () => {
    try {
      setIsLoading(true);
      const storage: { username: string, password: string }[] = [];
      await EncryptedStorage.getItem("users")
        .then(dataJSON => dataJSON !== null && JSON.parse(dataJSON))
        .then(data => data && storage.push(...data))
        .catch(e => console.log(e));
      for (let obj of storage) {
        if (obj["username"]?.includes(username)) {
          showMessage({
            textStyle: { fontSize: 16 },
            type: "danger",
            icon: "danger",
            message: "Неможливо додати користувача",
            description: "Користувач з таким іменем вже зареєстрований"
          });
          throw "Користувач з таким іменем вже зареєстрований";
        }
      }

      await EncryptedStorage.setItem(
        "users",
        JSON.stringify([...storage, {
          username,
          password
        }])
      );
      showMessage({ type: "success", icon: "success", message: "Додано нового користувача" });
    } catch (error) {
      console.log(error);
    } finally {
      setPassword("");
      setUsername("");
      setIsLoading(false);
    }
  }, [username, password]);

  const retrieveUser = useCallback(async () => {
    try {
      const session = await EncryptedStorage.getItem("users").then(dataJSON => dataJSON !== null && JSON.parse(dataJSON));
      if (!session) {
        showMessage({
          textStyle: { fontSize: 16 },
          type: "success",
          icon: "success",
          message: "Ім'я вільне"
        });
        return;
      }

      for (let obj of session) {
        if (obj["username"]?.includes(usernameForCheck)) {
          showMessage({
            textStyle: { fontSize: 16 },
            type: "danger",
            icon: "danger",
            message: "Користувач з таким іменем",
            description: "вже зареєстрований"
          });
        } else {
          showMessage({
            textStyle: { fontSize: 16 },
            type: "success",
            icon: "success",
            message: "Ім'я вільне"
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUsernameForCheck("");
    }
  }, [usernameForCheck]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.backgroundForm}>
            <View style={styles.inputView}>
              <Text style={styles.label}>Username</Text>
              <TextInput style={styles.input} placeholder="Enter username..."
                         value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                ref={inputRef} style={styles.input} placeholder="Enter password..."
                value={password} onChangeText={setPassword} />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPressIn={() => EncryptedStorage.clear()}>
                <Text style={{ color: "white" }}>Clear storage(for Test) </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPressIn={() => {
                                  signUp();
                                  Keyboard.dismiss()}}
                                disabled={!(username && password && !isLoading)}>
                <Text style={{ color: "white" }}>Sign Up </Text>
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior="padding">
              <View style={{ ...styles.inputView, marginTop: 50 }}>
                <Text style={styles.label}>Check if you are registered</Text>
                <TextInput
                  style={styles.input} placeholder="Enter username..."
                  value={usernameForCheck} onChangeText={setUsernameForCheck}
                />
              </View>
              <View style={{ ...styles.buttons, justifyContent: "center" }}>
                <TouchableOpacity style={styles.button} onPress={() => retrieveUser()}>
                  <Text style={{ color: "white" }}>Check </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center"
  },
  backgroundForm: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "25%",
    alignItems: "center"
  },
  inputView: {
    width: "100%",
    marginVertical: 15
  },
  label: {
    fontSize: 22,
    color: "#efe6e6",
    textAlign: "center",
    fontWeight: "300",
    marginBottom: 5
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderColor: "#070707",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "400"
  },
  buttons: {
    flexDirection: "row"
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#121b4b",
    backgroundColor: "rgb(55,65,136)"
  }
});

export default Login;
