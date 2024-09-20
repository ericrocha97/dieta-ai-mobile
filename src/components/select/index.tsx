import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { type Control, Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface OptionsProps {
	label: string;
	value: string | number;
}

interface SelectProps {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <any> é usado aqui para permitir flexibilidade no tipo de controle, já que este componente pode ser reutilizado em diferentes formulários com estruturas variadas
	control: Control<any>;
	placeholder?: string;
	error?: string;
	options: OptionsProps[];
}

export default function Select({
	name,
	control,
	placeholder,
	error,
	options,
}: SelectProps) {
	const [visible, setVisible] = useState(false);

	return (
		<View className="mb-4">
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TouchableOpacity
							className="flex-row justify-between items-center bg-white rounded h-11 px-3"
							onPress={() => setVisible(true)}
						>
							<Text>
								{value
									? options.find((option) => option.value === value)?.label
									: placeholder}
							</Text>
							<Feather name="chevron-down" size={16} color="#000" />
						</TouchableOpacity>

						<Modal
							visible={visible}
							animationType="fade"
							transparent={true}
							onRequestClose={() => setVisible(false)}
						>
							<TouchableOpacity
								className="flex-1 justify-center bg-black/50"
								activeOpacity={1}
								onPress={() => setVisible(false)}
							>
								<TouchableOpacity
									className="bg-white rounded-lg p-5 mx-2"
									activeOpacity={1}
								>
									<FlatList
										contentContainerStyle={{ gap: 4 }}
										data={options}
										keyExtractor={(item) => item.value.toString()}
										renderItem={({ item }) => (
											<TouchableOpacity
												className="bg-gray-50 rounded px-2 py-4"
												onPress={() => {
													onChange(item.value);
													setVisible(false);
												}}
											>
												<Text>{item.label}</Text>
											</TouchableOpacity>
										)}
									/>
								</TouchableOpacity>
							</TouchableOpacity>
						</Modal>
					</>
				)}
			/>

			{error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
		</View>
	);
}
