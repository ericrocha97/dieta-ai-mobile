import { Pressable, Text, View } from "react-native";
import Logo from "../assets/logo.svg";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
	return (
		<View className="flex-1 justify-center items-center px-4 bg-background ">
			<Logo width={250} height={250} />
			<Text className="text-4xl font-title color-green mt-4">
				Dieta<Text className="text-white">.IA</Text>
			</Text>
			<Text className="text-xl font-body text-white w-60 text-center my-2">
				Sua dieta personalizada com inteligência artificial{" "}
				<Ionicons name="restaurant-outline" size={16} />
			</Text>
			<Link href="/step" asChild>
				<Pressable className="bg-blue w-[100%] h-10 rounded justify-center items-center mt-4">
					<Text className="text-white text-xl font-alt">Gerar dieta</Text>
				</Pressable>
			</Link>
			<StatusBar style="light" />
		</View>
	);
}
