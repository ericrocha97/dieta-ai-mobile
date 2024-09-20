import { View, Text, Pressable, ScrollView, Share } from "react-native";
import { useDataStore } from "../../store/data";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import type { Data } from "../../types/data";
import Header from "../../components/header";

interface ResponseData {
	data: Data;
}

export default function Nutrition() {
	const user = useDataStore((state) => state.user);
	const resetUser = useDataStore((state) => state.reset);

	const { data, isFetching, error } = useQuery({
		queryKey: ["nutrition"],
		queryFn: async () => {
			try {
				if (!user) {
					throw new Error("Filed load nutrition");
				}

				const response = await api.post<ResponseData>("/create-nutrition", {
					name: user.name,
					age: user.age,
					gender: user.gender,
					height: user.height,
					weight: user.weight,
					objective: user.objective,
					level: user.level,
				});

				return response.data.data;
			} catch (e) {
				console.error(e);
			}
		},
	});

	async function handleShare() {
		try {
			if (data && Object.keys(data).length === 0) return;

			const supplements = `${data?.suplementos.map((item) => ` ${item}`)}`;

			const foods = `${data?.refeicoes.map((item) => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map((alimento) => ` ${alimento}`)}`)}`;

			const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`;

			await Share.share({
				message: message,
			});
		} catch (err) {
			console.error(err);
		}
	}

	function handleMoveHome() {
		resetUser();
		router.replace("/");
	}

	if (isFetching) {
		return (
			<View className="flex-1 bg-background justify-center items-center">
				<Text className="text-white text-xl mb-1 justify-center items-center">
					Estamos gerando sua dieta!
				</Text>
				<Text className="text-white text-xl mb-1 justify-center items-center">
					Consultando IA...
				</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-background justify-center items-center">
				<Text className="text-white text-xl mb-1 justify-center items-center">
					Falha ao gerar dieta!
				</Text>
				<Link href="/">
					<Text className="text-white text-xl mb-1 justify-center items-center">
						Tente novamente
					</Text>
				</Link>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<Header title="Minha dieta" final onShare={handleShare} />

			<View className="flex-1 px-4">
				{data && Object.keys(data).length > 0 && (
					<>
						<Text className="text-3xl color-white font-title">
							Nome: {data.nome}
						</Text>
						<Text className="text-2xl color-white font-body mb-6">
							<Text className="text-2xl color-white font-title">Foco:</Text>{" "}
							{data.objetivo}
						</Text>
						<Text className="text-white text-2xl font-title mb-2">
							Refeições:
						</Text>
						<ScrollView>
							<View className="bg-white p-4 rounded-lg mt-2 gap-2">
								{data.refeicoes.map((refeicao) => (
									<View
										key={refeicao.nome}
										className="bg-gray-300 p-2 rounded-lg"
									>
										<View className="flex-row items-center justify-between mb-1">
											<Text className="text-2xl font-title">
												{refeicao.nome}
											</Text>
											<Ionicons
												name="restaurant-outline"
												size={16}
												color="#000"
											/>
										</View>

										<View className="flex-row items-center gap-1">
											<Feather name="clock" size={14} color="#000" />
											<Text className="text-body text-xl">
												Horário: {refeicao.horario}
											</Text>
										</View>

										<Text className="text-body text-xl mb-1 mt-4">
											Alimentos:
										</Text>
										{refeicao.alimentos.map((alimento) => (
											<Text className="text-body text-base" key={alimento}>
												{alimento}
											</Text>
										))}
									</View>
								))}
							</View>

							<View className="bg-white p-4 rounded-lg my-4">
								<View className="bg-gray-300 p-2 rounded-lg">
									<Text className="text-2xl font-title">Dica suplementos:</Text>
									{data.suplementos.map((item) => (
										<Text className="text-body text-base" key={item}>
											{item}
										</Text>
									))}
								</View>
							</View>

							<Pressable
								className="bg-blue w-[100%] h-10 rounded justify-center items-center my-4"
								onPress={handleMoveHome}
							>
								<Text className="text-white text-xl font-alt">
									Gerar nova dieta
								</Text>
							</Pressable>
						</ScrollView>
					</>
				)}
			</View>
		</View>
	);
}
