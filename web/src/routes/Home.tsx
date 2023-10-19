import { Text, Title } from '@mantine/core';
import Particles from '../components/ui/animations/particles/Particles';

const Home = () => {
	return (
		<>
			<div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
				<div className='flex flex-col justify-center items-center h-screen'>
					<Title
						order={1}
						style={{ fontFamily: 'Nosifer' }}
						className='text-center text-6xl md:text-9xl mb-4 text-zinc-100 drop-shadow-xl'>
						Phantom Byte
					</Title>
					<Text
						size='lg'
						className='text-white text-center animate-pulse motion-safe:animate-pulse'>
						A Reliable Cloud Logging service
					</Text>
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 0,
					mixBlendMode: 'screen',
				}}>
				<Particles />
			</div>
		</>
	);
};

export default Home;
