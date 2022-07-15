import { pokeApi } from '../api';
import { PokemonFull } from '../Interfaces/PokemonFull';

export const getDataPokemon = async (pokemonId: string) => {
	try {
		const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${pokemonId}`);

		const { name, sprites, id } = data;

		return {
			name,
			sprites,
			id,
		};
	} catch (error) {
		return null;
	}
};
