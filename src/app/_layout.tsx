import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import "../styles/global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [loaded, error] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
		BaiJamjuree_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="step/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="create/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="nutrition/index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
}
