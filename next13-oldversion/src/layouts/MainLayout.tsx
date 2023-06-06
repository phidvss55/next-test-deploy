import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

type PageProps = {
	children?: ReactNode | undefined;
};

const MainLayout = ({ children }: PageProps) => {
	return (
		<>
			<header className="h-16 text-center bg-red-400">Header</header>
			<main className="flex">
				<Sidebar />
				{children}
			</main>
		</>
	);
};

export default MainLayout;
