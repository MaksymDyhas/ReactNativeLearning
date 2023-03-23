import Home from "../screens/Home";
import Profile from "../screens/Profile";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestFlashMessages from "../screens/TestFlashMessages";
import Login from "../screens/Login";
import TodoList from "../screens/TodoList";
import AddTodo from "../screens/AddTodo";


type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  TestFlashMessages: undefined;
  Login: undefined;
  TodoList: undefined;
  AddTodo: undefined;
};


export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TodoListProps = NativeStackScreenProps<RootStackParamList, 'TodoList'>;
export type AddTodoProps = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {
        backgroundColor: "#2c2c2c"
      },
      headerTintColor: "#f6f5f5",
      headerTitleStyle: {
        fontSize: 26,
        fontFamily: "EduNSWACTFoundation-Regular"
      }
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="TestFlashMessages" component={TestFlashMessages} options={{title: 'Flash Messages'}}/>
      <Stack.Screen name="Login" component={Login} options={{title: 'Sign in'}}/>
      <Stack.Screen name="TodoList" component={TodoList} options={{title: 'TODO'}}/>
      <Stack.Screen name="AddTodo" component={AddTodo} options={{title: 'Add TODO'}}/>
    </Stack.Navigator>
  );
};

export default RootStack;
