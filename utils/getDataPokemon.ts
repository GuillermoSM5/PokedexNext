import { pokeApi } from '../api';
import { PokemonFull } from '../Interfaces/PokemonFull';

export const getDataPokemon = async (pokemonId: string) => {
	const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${pokemonId}`);

	const { name, sprites, id } = data;

	return {
		name,
		sprites,
		id,
	};
};
