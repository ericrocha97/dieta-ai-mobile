import { View, Text, Pressable, ScrollView } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Header from "../../components/header";
import Select from "../../components/select";
import { useDataStore } from "../../store/data";
import { router } from "expo-router";
import { useEffect } from "react";

const schema = z.object({
	gender: z.string().min(1, { message: "O sexo é obrigatório" }),
	objective: z.string().min(1, { message: "O Objetivo é obrigatório" }),
	level: z.string().min(1, { message: "Selecione seu level" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const setPageTwo = useDataStore((state) => state.setPageTwo);
	const user = useDataStore((state) => state.user);

	useEffect(() => {
		reset({
			gender: user.gender || "",
			objective: user.objective || "",
			level: user.level || "",
		});
	}, [user, reset]);

	const genderOptions = [
		{ label: "Masculino", value: "masculino" },
		{ label: "Feminino", value: "feminino" },
	];

	const levelOptions = [
		{
			label: "Sedentário (pouco ou nenhuma atividade física)",
			value: "Sedentário",
		},
		{
			label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
			value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
		},
		{
			label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
			value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
		},
		{
			label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
			value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
		},
	];

	const objectiveOptions = [
		{ label: "Emagrecer", value: "emagrecer" },
		{ label: "Hipertrofia", value: "Hipertrofia" },
		{ label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
		{ label: "Definição", value: "Definição" },
	];

	function handleCreate(data: FormData) {
		setPageTwo({
			level: data.level,
			gender: data.gender,
			objective: data.objective,
		});

		router.push("/nutrition");
		reset();
	}

	return (
		<View className="flex-1 bg-background">
			<Header step="Passo 2" title="Finalizando dieta" />

			<ScrollView className="px-4">
				<Text className="text-white text-2xl font-title mb-2">Sexo:</Text>
				<Select
					control={control}
					name="gender"
					placeholder="Selecione o seu sexo..."
					error={errors.gender?.message}
					options={genderOptions}
				/>

				<Text className="text-white text-2xl font-title mb-2">
					Selecione nível de atividade física:
				</Text>
				<Select
					control={control}
					name="level"
					placeholder="Selecione o nível de atividade física"
					error={errors.level?.message}
					options={levelOptions}
				/>

				<Text className="text-white text-2xl font-title mb-2">
					Selecione seu objetivo:
				</Text>
				<Select
					control={control}
					name="objective"
					placeholder="Selecione o nível de atividade física"
					error={errors.objective?.message}
					options={objectiveOptions}
				/>

				<Pressable
					className="bg-blue w-[100%] h-10 rounded justify-center items-center mt-4"
					onPress={handleSubmit(handleCreate)}
				>
					<Text className="text-white text-xl font-alt">Avançar</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
}
