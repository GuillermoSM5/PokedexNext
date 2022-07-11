import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../Ui';

interface Props {
	children?: React.ReactNode | undefined;
	title?: string;
}

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
			</Head>

			<Navbar />

			<main style={{ padding: '0px 20px' }}>{children}</main>
		</>
	);
};
