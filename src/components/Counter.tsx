import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { decrement, increment } from "../redux/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

type CounterProps = {
  propsStyle?: Object,
}

const Counter = ({ propsStyle = {} }: CounterProps) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.counter);

  return (
    <View style={propsStyle}>
      <Text style={styles.value}>{value}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(increment(1))}><Text style={styles.text}>+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement(1))}><Text style={styles.text}>-</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'black',
    borderColor: '#fff',
    borderWidth: 1,

    margin: 5,
  },
  text: {
    fontSize: 25,
    color: '#fff'
  },
  value: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  }
})

export default Counter;
