export type Perfil = Root;

export interface Root {
  user: User;
  address: Address;
}

export interface User {
  id?: string;
  name: string;
  brithday: string;
  whatsapp: string;
  accessLevel?: string;
  addressId?: string;
  orchestraId?: string;
  auth_id?: string;
  active?: boolean;
  deletedAt?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id?: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
}
