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
	step?: string;
	title: string;
	final?: boolean;
	onShare?: () => void;
}

export default function Header({ step, title, final, onShare }: HeaderProps) {
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
				{!final ? (
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
				) : null}

				<View className="flex-row justify-between items-center mt-2">
					<Text className="text-4xl font-title color-background">{title}</Text>
					{final && onShare ? (
						<Pressable
							className="bg-blue p-2 h-10 rounded justify-center items-center "
							onPress={onShare}
						>
							<Text className="gap-1 text-white text-lg font-alt">
								Compartilhar <Feather name="share-2" size={16} />
							</Text>
						</Pressable>
					) : null}
				</View>
			</View>
		</SafeAreaView>
	);
}
