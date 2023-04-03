import React, { useCallback, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";
import { observer } from "mobx-react-lite";
import counter from "../../mobx/store/counter";
import users, { UsersField } from "../../mobx/store/users";
import LinearGradient from "react-native-linear-gradient";

const MobxTraining = observer(() => {
  const CopilotText = walkthroughable(Text);
  const { copilotEvents, start } = useCopilot();

  const handleStepChange = useCallback((step) => {
    console.log("Current step is: ", step.name);
  }, []);


  useEffect(() => {
    copilotEvents.on("stepChange", handleStepChange);
    return () => {
      copilotEvents.off("stepChange", handleStepChange);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={styles.linearGradient} colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}>
        <TouchableOpacity
          onPress={() => {
            start();
          }}
          style={styles.button}>
          <Text style={styles.text}>Допомога по сторінці</Text>
        </TouchableOpacity>
        <View style={styles.counter}>
          <CopilotStep name={"firstUniqueKey"} order={1} text={"Результат лічильника"}>
            <CopilotText style={[styles.text]}>
              Counter: {counter.count}
            </CopilotText>
          </CopilotStep>
          <View style={styles.buttons}>

            <TouchableOpacity
              onPress={() => {
                counter.increment(1);
              }}
              style={styles.button}>
              <Text style={styles.text}>+1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                counter.decrement(2);
              }}
              style={styles.button}>
              <Text style={styles.text}>-2</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.users}>

          <TouchableOpacity
            onPress={() => {
              users.fetchUsers();
            }}
            style={[styles.button, { marginBottom: 20 }]}>
            <CopilotStep name={"secondUniqueKey"} order={2} text={"Кнопка для завантаження користувачів з мережі"}>
              <CopilotText style={styles.text}>
                Fetch Users{"\n"}(This will replace current)
              </CopilotText>
            </CopilotStep>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              users.addUser("Maksym Dyhas", "1234567890");
            }}
            style={[styles.button, { marginBottom: 20 }]}>
            <CopilotStep name={"thirdUniqueKey"} order={3} text={"Кнопка щоб додати одного користувача до списку"}>
              <CopilotText style={styles.text}>
                Add User
              </CopilotText>
            </CopilotStep>
          </TouchableOpacity>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={users.array()}
            renderItem={({ item }: {item: UsersField} ) => (
              <View key={item?.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.x} onPress={() => users.deleteUser(item.id)}>X</Text>
                <Text
                  style={{
                    fontSize: 16,
                    margin: 5,
                    color: "white"
                  }}>{item.id + ". " + item.name} — {item.phone}</Text>
              </View>
            )}
            // keyExtractor={(index)=>index}
          />

        </View>
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
    marginTop: 20,
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
