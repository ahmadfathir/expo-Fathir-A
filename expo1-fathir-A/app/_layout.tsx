import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  
    const [loaded, error] = useFonts({
    "BebasNeue": require("../assets/fonts/BebasNeue-Regular.ttf"),

});

 useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && error) {
    return null; // tetap tampilkan splash screen sampai font siap
  }

  return <Stack />;

}
