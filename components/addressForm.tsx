import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'; // Importe os componentes necessários
import { Input } from './ui/input';
import { formatarCep } from '@/config/formater';

interface AddressData {
	estado: string;
	cidade: string;
	bairro: string;
	endereco: string;
	numero: string;
	complemento: string;
}

export default function AddressFormFields({ form }: any) {
	const [addressData, setAddressData] = useState<AddressData>({
		estado: '',
		cidade: '',
		bairro: '',
		endereco: '',
		numero: '',
		complemento: ''
	});

	const fetchAddressData = async (cep: string) => {
		try {
			const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
			if (!response.ok) {
				throw new Error('CEP não encontrado');
			}
			const data = await response.json();
			setAddressData({
				estado: data.uf,
				cidade: data.localidade,
				bairro: data.bairro,
				endereco: data.logradouro,
				numero: '', // Definir número como vazio por padrão
				complemento: data.complemento || '' // Definir complemento como vazio se não houver valor
			});

			// Definir os valores do endereço no formulário
			form.setValue('estado', data.uf);
			form.setValue('cidade', data.localidade);
			form.setValue('bairro', data.bairro);
			form.setValue('endereco', data.logradouro);
			form.setValue('complemento', data.complemento || '');
		} catch (error) {
			console.error('Erro ao obter dados do CEP:', error);
		}
	};

	const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const cep = formatarCep(e.target.value);
		form.setValue('cep', cep); // Atualiza o valor do campo CEP no formulário
		if (cep.length === 9) { // Verifica se o CEP está completo
			fetchAddressData(cep);
		}
	};


	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
			{/* CEP */}
			<div>
				<FormField
					control={form.control}
					name="cep"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>CEP</FormLabel>
							<FormControl>
								<Input
									placeholder="00000-000"
									{...field}
									onChange={(e) => {
										const valorFormatado = formatarCep(e.target.value);
										field.onChange(valorFormatado);
										handleCepChange(e)
									}}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Estado */}
			<div>
				<FormField
					control={form.control}
					name="estado"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Estado</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Cidade */}
			<div>
				<FormField
					control={form.control}
					name="cidade"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Cidade</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Bairro */}
			<div>
				<FormField
					control={form.control}
					name="bairro"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Bairro</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Endereço */}
			<div>
				<FormField
					control={form.control}
					name="endereco"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Endereço</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Número */}
			<div>
				<FormField
					control={form.control}
					name="numero"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Número</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}

								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Complemento */}
			<div>
				<FormField
					control={form.control}
					name="complemento"
					render={({ field }: any) => (
						<FormItem>
							<FormLabel>Complemento</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}