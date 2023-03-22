import Home from "../screens/Home";
import Profile from "../screens/Profile";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};


export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


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
    </Stack.Navigator>
  );
};

export default RootStack;
