import { View, Text, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import Input from "../../components/input";
import { router } from "expo-router";
import { useDataStore } from "../../store/data";
import { useEffect } from "react";

const schema = z.object({
	name: z.string().min(2, { message: "O nome é obrigatório" }),
	weight: z.string().min(2, { message: "O peso é obrigatório" }),
	age: z.string().min(1, { message: "A idade é obrigatória" }),
	height: z.string().min(2, { message: "A altura é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const setPageOne = useDataStore((state) => state.setPageOne);
	const user = useDataStore((state) => state.user);

	useEffect(() => {
		reset({
			name: user.name || "",
			weight: user.weight || "",
			age: user.age || "",
			height: user.height || "",
		});
	}, [user, reset]);

	function handleCreate(data: FormData) {
		setPageOne({
			name: data.name,
			weight: data.weight,
			age: data.age,
			height: data.height,
		});

		router.push("/create");
		reset();
	}

	return (
		<View className="flex-1 bg-background">
			<Header step="Passo 1" title="Vamos começar" />
			<ScrollView className="px-4 py-6">
				<Text className="text-white text-2xl font-title mb-2">Nome:</Text>
				<Input
					name="name"
					control={control}
					placeholder="Digite seu nome..."
					error={errors.name?.message}
					keyboardType="default"
				/>

				<Text className="text-white text-2xl font-title mb-2">
					Seu peso atual:
				</Text>
				<Input
					name="weight"
					control={control}
					placeholder="Ex: 75"
					error={errors.weight?.message}
					keyboardType="numeric"
				/>

				<Text className="text-white text-2xl font-title mb-2">
					Sua altura atual:
				</Text>
				<Input
					name="height"
					control={control}
					placeholder="Ex: 1.90"
					error={errors.height?.message}
					keyboardType="numeric"
				/>

				<Text className="text-white text-2xl font-title mb-2">
					Sua idade atual:
				</Text>
				<Input
					name="age"
					control={control}
					placeholder="Ex: 24"
					error={errors.age?.message}
					keyboardType="numeric"
				/>

				<Pressable
					className="bg-blue w-[100%] h-10 rounded justify-center items-center mt-4"
					onPress={handleSubmit(handleCreate)}
				>
					<Text className="text-white text-xl font-alt">Avançar</Text>
				</Pressable>
			</ScrollView>
			<StatusBar style="auto" />
		</View>
	);
}
