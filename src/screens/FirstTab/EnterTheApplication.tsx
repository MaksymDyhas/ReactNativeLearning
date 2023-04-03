import React, { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { EnterTheApplicationProps } from "../../stack/RootStack";
import { showMessage } from "react-native-flash-message";
import { FingerPrint } from "../../../assets/svgImages";
import EncryptedStorage from "react-native-encrypted-storage";
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

type Props = {
  numberForValue: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setDots: React.Dispatch<React.SetStateAction<string>>,
}

const Buttons = ({ numberForValue, value, setValue, setDots }: Props) => {
  const handlerChangeValue = useCallback(() => {
    if (value.length < 4) {
      setValue(prevState => prevState + numberForValue);
      setDots(prevState => prevState.replace("○", "●"));
    }
  }, [value]);

  return (
    <TouchableOpacity style={styles.button} onPress={handlerChangeValue}>
      <Text style={styles.textButton}>{numberForValue}</Text>
    </TouchableOpacity>
  );
};

const EnterTheApplication = ({ navigation }: EnterTheApplicationProps) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [value, setValue] = useState<string>("");
  const [dots, setDots] = useState<string>("○○○○");
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const listItems = numbers.map(number => <Buttons key={number} value={value} numberForValue={number}
                                                   setValue={setValue} setDots={setDots} />);

  const checkIsSensorAvailable = useCallback(async (isClickOnButton: boolean) => {
    const { biometryType } = await rnBiometrics.isSensorAvailable();

    if (isClickOnButton) {
      biometryType ? signInFinger() : Alert.alert("Недоступно на вашому пристрої");
      return;
    }
    if (biometryType) {
      signInFinger();
    }

  }, []);

  const checkIsRegistered = useCallback(async () => {
    try {
      const password = await EncryptedStorage.getItem("passwordLoginApp").catch(e => console.log(e));
      !password ? setIsRegistered(false) : checkIsSensorAvailable(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signUp = useCallback(async () => {
    try {
      await EncryptedStorage.setItem(
        "passwordLoginApp",
        JSON.stringify({ value })
      ).catch(e => console.log(e));
      showMessage({ type: "success", icon: "success", message: "Пароль створено", description:'Використовуйте при наступному вході в додаток. Натисніть, щоб закрити повідомлення', autoHide: false});
      navigation.replace("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setValue("");
      setDots("○○○○");
    }
  }, [value]);


  const signInFinger = useCallback(async () => {
    const epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString();
    const payload = epochTimeSeconds + "some message";

    rnBiometrics.createSignature({
      promptMessage: "Sign in",
      payload: payload,
      cancelButtonText: "Увійти за паролем"
    })
      .then((resultObject) => {
        const { success } = resultObject;
        if (success) {
          navigation.replace("Home");
        }
      });
  }, []);

  const signInPassword = useCallback(async () => {
    try {
      const password = await EncryptedStorage.getItem("passwordLoginApp")
        .then(res => res && JSON.parse(res))
        .then(res => res.value)
        .catch(e => console.log(e));

      password === value
        ? navigation.replace("Home")
        : showMessage({ type: "danger", icon: "danger", message: "Невірний пароль" });

    } catch (error) {
      console.log(error);
    } finally {
      setValue("");
      setDots("○○○○");
    }
  }, [value]);

  if (value.length === 4) {
    isRegistered ? signInPassword() : signUp();
  }

  useEffect(() => {
    checkIsRegistered();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#d6e0ea", "#7171d0"]}
                      style={styles.linearGradient}>
        <View style={styles.textView}>
          <Text style={styles.text}>{isRegistered ? "Код для входу" : "Створіть код для входу"}</Text>
          <Text style={{ ...styles.text, fontSize: 32 }}>{dots}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <View style={styles.blockForButtons}>
            {listItems}
          </View>
          <View style={styles.blockForOtherButtons}>
            <TouchableOpacity onPress={() => {
              if (isRegistered) {
                checkIsSensorAvailable(true);
              } else {
                Alert.alert("Спочатку потрібно створити код для входу");
              }
            }} style={styles.buttonFinger}>
              <FingerPrint width="50" height="50" />
            </TouchableOpacity>
            <Buttons numberForValue={"0"} setDots={setDots} setValue={setValue} value={value} />
            <TouchableOpacity style={styles.buttonBack}
                              onPress={() => {
                                setValue(prevState => prevState.slice(0, -1));
                                setDots(prevState => prevState.replace(/●(?=○|$)/, "○"));
                              }}>
              <Text style={{ color: "black", fontSize: 38 }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text disabled={!isRegistered} onPress={() => {
          Alert.alert("Забули код для входу?", "Створіть новий код, для входу в застосунок", [
            {
              text: "Скасувати"
            },
            {
              text: "Створити новий код", onPress: () => {
                navigation.replace("EnterTheApplication");
                EncryptedStorage.clear();
              }
            }
          ]);
        }} style={styles.textForgotten}>Не пам'ятаю код для входу</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30
  },
  blockForButtons: {
    flex: 1,
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  blockForOtherButtons: {
    marginTop: -20,
    flex: 1 / 2,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    margin: 15,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000"
  },
  buttonBack: {
    margin: 15,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonFinger: {
    margin: 15,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  textButton: {
    fontSize: 24,
    color: "#000"
  },
  text: {
    color: "#000",
    fontSize: 26,
    marginVertical: 5
  },
  textForgotten: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  }

});


export default EnterTheApplication;
