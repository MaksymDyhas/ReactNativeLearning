import React from "react";
import { SafeAreaView, SectionList, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { observer } from "mobx-react-lite";
import { completedTaskData, newTaskData } from "../../storageForPractice";


const SectionListPage = observer(() => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#0e3bc9", "rgba(108,104,104,0.82)", "rgb(29,63,180)"]}
                      style={styles.linearGradient}>
        <SectionList
          contentContainerStyle={[styles.section ,{flexGrow: 1}]}
        sections={[...newTaskData, ...completedTaskData]}
        renderItem={({item})=>(
          <Text style={styles.taskItem}>{item.task}</Text>
        )}
        renderSectionHeader={({section})=>(
          <Text style={styles.taskTitle}>{section.title}</Text>
        )}
        keyExtractor={item=>item.id}
        stickySectionHeadersEnabled
        />
      </LinearGradient>
    </SafeAreaView>
  )
    ;
});

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 20
  },
  taskItem:{
    padding: 10,
    marginVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#123165",
    color: 'white'
  },
  taskTitle:{
    backgroundColor: "#c7bdbd",
    fontSize: 20,
    fontWeight: "bold",
    color: 'black',
    padding: 10,
    elevation: 4,
    marginBottom: 15,
    borderRadius: 10,
    textAlign: "center"
  },
  section:{
    padding: 10
  }

});


export default SectionListPage;
