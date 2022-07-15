import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../Ui';

interface Props {
	children?: React.ReactNode | undefined;
	title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'PokeApp'}</title>
				<meta name='author' content='Guillermo Soto' />
				<meta
					name='description'
					content='Informacion sobre el nombre del pokemon XXXX'
				/>
				<meta name='Keywords' content='XXXX,pokemon,pokedex' />
				<meta property='og:title' content={`Información sobre ${title}`} />
				<meta
					property='og:description'
					content={`Esta es la página sobre ${title}`}
				/>
				<meta property='og:image' content={`${origin}/img/banner.png`} />
			</Head>

			<Navbar />

			<main style={{ padding: '0px 20px' }}>{children}</main>
		</>
	);
};
