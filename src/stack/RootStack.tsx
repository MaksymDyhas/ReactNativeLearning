import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../screens/FirstTab/Home";
import ReduxTraining from "../screens/FirstTab/ReduxTraining";
import Login from "../screens/FirstTab/Login";
import TodoList from "../screens/FirstTab/TodoList";
import AddTodo from "../screens/FirstTab/AddTodo";
import Profile from "../screens/FirstTab/Profile";
import EnterTheApplication from "../screens/FirstTab/EnterTheApplication";
import CameraScreen from "../screens/FirstTab/Camera";
import Animations from "../screens/FirstTab/Animations";
import MobxTraining from "../screens/FirstTab/MobxTraining";
import Geolocation from "../screens/FirstTab/Geolocation";
import WebView from "../screens/FirstTab/WebView";
import SecondContentPage from "../screens/SecondTab/SecondContentPage";
import SectionList from "../screens/SecondTab/SectionList";


type RootStackParamList = {
  Home: undefined;
  FirstHomePage: undefined;
  Profile: undefined;
  ReduxTraining: undefined;
  Login: undefined;
  TodoList: undefined;
  AddTodo: undefined;
  EnterTheApplication: undefined;
  CameraScreen: undefined;
  Animations: undefined;
  MobxTraining: undefined;
  Geolocation: undefined;
  WebView: undefined;
  SecondContentPage: undefined;
  SectionList: undefined;
};


export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type TodoListProps = NativeStackScreenProps<RootStackParamList, "TodoList">;
export type AddTodoProps = NativeStackScreenProps<RootStackParamList, "AddTodo">;
export type EnterTheApplicationProps = NativeStackScreenProps<RootStackParamList, "EnterTheApplication">;
export type CameraScreenProps = NativeStackScreenProps<RootStackParamList, "CameraScreen">;
export type ReduxTrainingProps = NativeStackScreenProps<RootStackParamList, "ReduxTraining">;
export type GeolocationProps = NativeStackScreenProps<RootStackParamList, "Geolocation">;
export type SecondContentPageProps = NativeStackScreenProps<RootStackParamList, "SecondContentPage">;


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: string = 'home';
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SecondContentPage") {
            iconName = focused ? "document" : "document-outline";
          }

          return <Icon name={iconName} size={25} color="white" />;
        },
        tabBarStyle: {
          backgroundColor: '#2c2c2c',
        },
        headerStyle: {
          backgroundColor: "#2c2c2c"
        },
        headerTintColor: "#f6f5f5",
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: "EduNSWACTFoundation-Regular"
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SecondContentPage" component={SecondContentPage} options={{ title: "Second Content Page" }} />
    </Tab.Navigator>
  )
}

const RootStack = () => {

  return (
        <Stack.Navigator initialRouteName="FirstHomePage" screenOptions={{
          headerStyle: {
            backgroundColor: "#2c2c2c"
          },
          headerTintColor: "#f6f5f5",
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: "EduNSWACTFoundation-Regular"
          }
        }}>
          <Stack.Screen name="FirstHomePage" component={TabNavHome} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ReduxTraining" component={ReduxTraining} options={{ title: "Camera" }} />
          <Stack.Screen name="Login" component={Login} options={{ title: "Sign in" }} />
          <Stack.Screen name="TodoList" component={TodoList} options={{ title: "TODO" }} />
          <Stack.Screen name="AddTodo" component={AddTodo} options={{ title: "Add TODO" }} />
          <Stack.Screen name="EnterTheApplication" component={EnterTheApplication} options={{ headerShown: false }} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Animations" component={Animations} options={{ title: "Animations" }} />
          <Stack.Screen name="MobxTraining" component={MobxTraining} options={{ title: "Mobx" }} />
          <Stack.Screen name="Geolocation" component={Geolocation} options={{ title: "Geolocation" }} />
          <Stack.Screen name="WebView" component={WebView} options={{ title: "WebView" }} />
          <Stack.Screen name="SectionList" component={SectionList} />
        </Stack.Navigator>
  );
};

export default RootStack;
