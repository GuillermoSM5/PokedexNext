import { FC, useEffect, useState } from 'react';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { pokeApi } from '../../api';
import { Layout } from '../../components/Layouts';
import { PokemonFull } from '../../Interfaces';
import { LocalFavorite } from '../../utils/';
import localFavorites from '../../utils/localFavorites';
import { getDataPokemon } from '../../utils/getDataPokemon';

interface Props {
	pokemon: PokemonFull;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		// setIsFavorite(localFavorites.existPokemonInFavorites(pokemon.id));
	}, []);

	const onToggleFvorite = () => {
		LocalFavorite.toogleFavorite(pokemon.id);
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid>
					<Card isHoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={
									pokemon.sprites.other?.dream_world.front_default ||
									'./no-image'
								}
								alt={pokemon.name}
								width='100%'
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header
							css={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Text h1 transform='capitalize'>
								{pokemon.name}
							</Text>
							<Button
								onPress={onToggleFvorite}
								color='gradient'
								ghost={!isFavorite}
							>
								Guardar en favoritos
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex'>
								<Image
									src={pokemon.sprites.front_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
	return {
		paths: pokemons151.map((id) => ({ params: { id } })),
		// fallback: false,
		fallback: 'blocking',
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user???s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };

	const pokemon = await getDataPokemon(id);

	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			pokemon,
		},
		revalidate: 86400,
	};
};

export default PokemonPage;
