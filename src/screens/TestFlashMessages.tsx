import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { hideMessage, showMessage } from "react-native-flash-message";

type Props = {
  title: string;
  background?: string;
  textColor: string;
  onPress: ()=>void;
}

const MyButtonForFlash = ({ title, background, textColor, onPress }: Props) => {
  return (
    <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={onPress}>
      <View style={{...styles.button, backgroundColor: `${background}`}}>
        <Text style={{...styles.text, color: `${textColor}`}}> {title} </Text>
      </View>
    </TouchableOpacity>
  );
};

const TestFlashMessages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#284db4", "rgba(134,46,46,0.82)", "rgb(61,54,54)"]}
                      style={styles.linearGradient}>

        <MyButtonForFlash onPress={()=>showMessage({message:'All good',icon: "success", type: 'success'})} title={'Success'} background={'rgba(50,168,34,0.98)'} textColor={'#fff'}/>
        <MyButtonForFlash onPress={()=>showMessage({message:'Warning',icon: "warning", type: 'warning'})} title={'Warning'} background={'rgba(222,229,9,0.98)'} textColor={'#171414'}/>
        <MyButtonForFlash onPress={()=>showMessage({message:'Danger content', icon: "danger" ,type: 'danger'})} title={'Danger'} background={'rgba(239,9,9,0.98)'} textColor={'#fff'}/>
        <MyButtonForFlash onPress={()=>showMessage({message:'Info alert', icon: "info",  type: 'info'})} title={'Info'} background={'rgba(6,192,238,0.98)'} textColor={'#fff'}/>
        <MyButtonForFlash onPress={()=>showMessage({message:'Hello!', autoHide: false ,icon: "default", backgroundColor: '#1337b9', type: 'success', description:'This message will not close by itself.'})} title={'Custom color'} background={'rgba(43,47,43,0.98)'} textColor={'#fff'}/>
        <MyButtonForFlash onPress={()=>hideMessage()} title={'Hide message'} background={'rgba(37,80,182,0.98)'} textColor={'#fff'}/>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15
  },
  button: {
    marginVertical: 10,
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 26

  }
});

export default TestFlashMessages;
