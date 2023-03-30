import Home from "../screens/Home";
import Profile from "../screens/Profile";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReduxTraining from "../screens/ReduxTraining";
import Login from "../screens/Login";
import TodoList from "../screens/TodoList";
import AddTodo from "../screens/AddTodo";
import EnterTheApplication from "../screens/EnterTheApplication";
import CameraScreen from "../screens/Camera";
import Animations from "../screens/Animations";
import MobxTraining from "../screens/MobxTraining";


type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  ReduxTraining: undefined;
  Login: undefined;
  TodoList: undefined;
  AddTodo: undefined;
  EnterTheApplication: undefined;
  CameraScreen: undefined;
  Animations: undefined;
  MobxTraining: undefined;
};


export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TodoListProps = NativeStackScreenProps<RootStackParamList, 'TodoList'>;
export type AddTodoProps = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;
export type EnterTheApplicationProps = NativeStackScreenProps<RootStackParamList, 'EnterTheApplication'>;
export type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'CameraScreen'>;
export type ReduxTrainingProps = NativeStackScreenProps<RootStackParamList, 'ReduxTraining'>;


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="EnterTheApplication" screenOptions={{
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
      <Stack.Screen name="ReduxTraining" component={ReduxTraining} options={{title: 'Camera'}}/>
      <Stack.Screen name="Login" component={Login} options={{title: 'Sign in'}}/>
      <Stack.Screen name="TodoList" component={TodoList} options={{title: 'TODO'}}/>
      <Stack.Screen name="AddTodo" component={AddTodo} options={{title: 'Add TODO'}}/>
      <Stack.Screen name="EnterTheApplication" component={EnterTheApplication} options={{headerShown: false}}/>
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Animations" component={Animations} options={{title: 'Animations'}}/>
      <Stack.Screen name="MobxTraining" component={MobxTraining} options={{title: 'Mobx'}}/>
    </Stack.Navigator>
  );
};

export default RootStack;
