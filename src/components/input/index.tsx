import type { KeyboardTypeOptions } from "react-native";
import { View, Text, TextInput } from "react-native";
import {
	type Control,
	Controller,
	type RegisterOptions,
} from "react-hook-form";

interface InputProps {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <any> é usado aqui para permitir flexibilidade no tipo de controle, já que este componente pode ser reutilizado em diferentes formulários com estruturas variadas
	control: Control<any>;
	placeholder?: string;
	rules?: RegisterOptions;
	error?: string;
	keyboardType: KeyboardTypeOptions;
}

export default function Input({
	name,
	control,
	placeholder,
	rules,
	error,
	keyboardType,
}: InputProps) {
	return (
		<View className="mb-4">
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						className="bg-white rounded h-11 px-3"
						placeholder={placeholder}
						onBlur={onBlur}
						value={value}
						onChangeText={onChange}
						keyboardType={keyboardType}
					/>
				)}
			/>

			{error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
		</View>
	);
}
