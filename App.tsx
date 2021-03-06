import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {LogBox} from "react-native";

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';


export default function App(){
  LogBox.ignoreLogs([
    "exported from 'deprecated-react-native-prop-types'.",
  ])
  SplashScreen.preventAutoHideAsync();
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });

      return () => subscription.remove();

   //async function notifications () {
   // await Notifications.cancelAllScheduledNotificationsAsync();

  //  const data = await Notifications.getAllScheduledNotificationsAsync();
  //  console.log("##### NOTIFICACOES AGENDADAS #####")
  //  console.log(data)
   //}

  //notifications();
  },[])

  if(!fontsLoaded) {
    return null;
  }
  
  SplashScreen.hideAsync();

  return (
    <Routes />
  )
}
