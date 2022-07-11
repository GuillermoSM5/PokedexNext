import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { Layout } from '../components/Layouts';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../Interfaces';

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout title='Listado de pokemons'>
			<Grid.Container gap={2} justify='flex-start'>
				{pokemons.map((pokemon) => (
					<PokemonCard pokemon={pokemon} key={pokemon.id} />
					// <li key={pokemon.id}>{`${pokemon.id} - ${pokemon.name}`}</li>
				))}
			</Grid.Container>
		</Layout>
	);
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
	// your fetch function here
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
		return {
			...pokemon,
			id: index + 1,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
				index + 1
			}.svg`,
		};
	});

	return {
		props: { pokemons },
	};
};
export default HomePage;
