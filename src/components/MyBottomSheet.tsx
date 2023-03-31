import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, Switch, Text, View } from "react-native";
import {
  getDeviceId,
  getFontScale,
  getFreeDiskStorage,
  getIpAddress,
  getPowerState,
  getSystemName,
  getSystemVersion,
  isBatteryCharging, isHeadphonesConnected, isLocationEnabled,
  isPinOrFingerprintSet
} from "react-native-device-info";

type Ref = BottomSheet


const MyBottomSheet = forwardRef<Ref>((props, ref) => {
    const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const snapPoints = useMemo(() => ["20%", "75%", "100%"], []);

    const [fontScale, setFontScale] = useState<number>(0);
    const [freeDiskStorage, setFreeDiskStorage] = useState<string>("");
    const [deviceIp, setDeviceIp] = useState<string>("");
    const [powerState, setPowerState] = useState<string>("");
    const [isBatteryChargingState, setIsBatteryChargingState] = useState<boolean>(false);
    const [isPinOrFingerprint, setIsPinOrFingerprint] = useState<boolean>(false);
    const [isLocationEnableState, setIsLocationEnableState] = useState<boolean>(false);
    const [isHeadphonesConnectedState, setIsHeadphonesConnectedState] = useState<boolean>(false);
    const deviceId = getDeviceId();
    const systemName = getSystemName();
    const systemVersion = getSystemVersion();

    const getDeviceInfo = useCallback(() => {
      getFontScale().then((fontScale) => {
        setFontScale(fontScale);
      });

      getFreeDiskStorage().then((freeDiskStorage) => {
        setFreeDiskStorage((freeDiskStorage / 1e9).toFixed(1));
      });

      getIpAddress().then((ip) => {
        setDeviceIp(ip);
      });

      getPowerState().then((state) => {
        if (state.batteryLevel) {
          setPowerState((state.batteryLevel * 100).toFixed());
        }
      });

      isBatteryCharging().then((isCharging) => {
        setIsBatteryChargingState(isCharging);
      });

      isPinOrFingerprintSet().then((isPinOrFingerprintSet) => {
        setIsPinOrFingerprint(isPinOrFingerprintSet);
      });

      isLocationEnabled().then((enabled) => {
        setIsLocationEnableState(enabled)
      });

      isHeadphonesConnected ( ) . then ( ( enabled )  =>  {
        setIsHeadphonesConnectedState(enabled)
      } ) ;

    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      setBottomSheetIndex(index);
    }, []);

    useEffect(() => {
      getDeviceInfo();
    }, []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={bottomSheetIndex === 2 ? { borderRadius: 0 } : { borderRadius: 30 }}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Text style={{ fontSize: 16 }}>Dark Mode (Future)</Text>
            <Switch value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </View>
          <Text style={{ fontSize: 16 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
            provident?</Text>
          <View style={styles.bottomLine} />
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={styles.text}>Ідентифікатор пристрою: {deviceId}</Text>
            <Text style={styles.text}>Масштаб шрифту: {fontScale}</Text>
            <Text style={styles.text}>Вільного місця на пристрої: {freeDiskStorage + " GB"}</Text>
            <Text style={styles.text}>IP адреса: {deviceIp}</Text>
            <Text style={styles.text}>Відсоток заряду: {powerState + "%"}</Text>
            <Text style={styles.text}>Назва ОС пристрою: {systemName}</Text>
            <Text style={styles.text}>Версія ОС пристрою: {systemVersion}</Text>
            <Text style={styles.text}>Акумулятор зараз заряджається: {isBatteryChargingState ? "Так" : "Ні"}</Text>
            <Text style={styles.text}>Встановлений пароль: {isPinOrFingerprint ? "Так" : "Ні"}</Text>
            <Text style={styles.text}>Увімкнена геолокація: {isLocationEnableState ? "Так" : "Ні"}</Text>
            <Text style={styles.text}>Підключені навушники: {isHeadphonesConnectedState ? "Так" : "Ні"}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={{ flex: 1, justifyContent: "center", alignItems:'center'}}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>100%</Text>
          </View>
        </View>
      </BottomSheet>
    );
  })
;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  bottomLine: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
    marginVertical: 10
  },
  text: {
    fontSize: 20,
    marginVertical: 2,
    color: '#2f2e2e'
  }
});

export default MyBottomSheet;
