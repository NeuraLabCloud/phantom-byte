'use client';

import React, { FC } from 'react';
import Particles from '../ui/Particles';

interface ParticlesClientProps {
	children: React.ReactNode;
}

const ParticlesClient: FC<ParticlesClientProps> = async ({ children }) => {
	return (
		<>
			{children}
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: -1,
					mixBlendMode: 'screen',
				}}>
				<Particles />
			</div>
		</>
	);
};

export default ParticlesClient;
