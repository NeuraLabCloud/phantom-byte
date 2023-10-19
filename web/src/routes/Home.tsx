import { Text, Title } from '@mantine/core';
import Particles from '../components/ui/animations/particles/Particles';

export default () => {
	return (
		<>
			<div className='relative w-screen h-screen'>
				<div className='flex flex-col justify-center items-center h-screen'>
					<Title
						order={1}
						style={{ fontFamily: 'Nosifer' }}
						className='text-center text-6xl md:text-9xl mb-4 text-zinc-100 drop-shadow-xl'>
						Phantom Byte
					</Title>
					<Text
						size='lg'
						className='text-white text-center animate-pulse mt-10'>
						A Reliable Cloud Logging Solution
					</Text>
				</div>
			</div>
			<div className='absolute top-0 left-0 z-0 mix-blend-screen'>
				<Particles />
			</div>
		</>
	);
};
