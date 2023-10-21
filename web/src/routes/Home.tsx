import { Button, Center, Text, Title } from '@mantine/core';
import Particles from '../components/ui/animations/particles/Particles';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<>
			<div className='relative w-screen h-screen'>
				<div className='flex flex-col justify-center h-screen'>
					<Center>
						<Title
							order={1}
							style={{ fontFamily: 'Nosifer' }}
							className='text-center text-6xl md:text-9xl mb-4 text-zinc-100 drop-shadow-xl'>
							Phantom Byte
						</Title>
					</Center>
					<Center>
						<Text
							size='lg'
							className='text-white mt-10'>
							A Reliable Cloud Logging Solution
						</Text>
					</Center>
					<Center>
						<Button
							component={Link}
							to={'/dashboard'}
							variant='outline'
							className='mt-5 animate-pulse'>
							<Text className='text-white'>Get Started</Text>
						</Button>
					</Center>
				</div>
			</div>
			{/* Particle Animation embedded into the site. */}
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
