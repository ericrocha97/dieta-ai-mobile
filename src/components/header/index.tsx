import React, { useEffect, useRef } from "react";
import {
	View,
	Text,
	SafeAreaView,
	Pressable,
	Platform,
	StatusBar,
	Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderProps {
	step: string;
	title: string;
}

export default function Header({ step, title }: HeaderProps) {
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			}),
		).start();
	}, [spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});
	return (
		<SafeAreaView
			className="bg-white rounded-b-2xl mb-4"
			style={{
				paddingTop:
					Platform.OS === "android"
						? StatusBar.currentHeight
							? StatusBar.currentHeight + 34
							: 34
						: 34,
			}}
		>
			<View className="px-4 pb-8 rounded-b-2xl">
				<View className="flex-row gap-2 items-center">
					<Pressable onPress={() => router.back()}>
						<Feather name="arrow-left" size={24} color="#000" />
					</Pressable>

					<Text className="text-xl font-body">
						{step}{" "}
						<Animated.View style={{ transform: [{ rotate: spin }] }}>
							<Feather name="loader" size={12} color="#000" />
						</Animated.View>
					</Text>
				</View>

				<Text className="text-4xl font-title color-background mt-2">
					{title}
				</Text>
			</View>
		</SafeAreaView>
	);
}
