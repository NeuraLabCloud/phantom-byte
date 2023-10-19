import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticlesProps {}

const Particles: FC<ParticlesProps> = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const cw = (canvas.width = window.innerWidth);
		const ch = (canvas.height = window.innerHeight);
		const dots = Array.from({ length: 450 }, () => ({
			x: cw * Math.random(),
			y: -10,
			r: gsap.utils.random(1.5, 4.5, 0.1),
		}));
		const dur = 100;
		const hue = 275;
		const mPos = { x: cw / 2, y: ch };

		const drawDot = (x: number, y: number, r: number) => {
			const dist = Math.abs(x - mPos.x) + Math.abs(y - mPos.y);
			ctx.fillStyle = `hsl(${hue}, 100%, ${
				Math.max(1 - dist / (dots.length - 1), 0.05) * 80
			}%)`;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
		};

		const redraw = () => {
			ctx.clearRect(0, 0, cw, ch);
			dots.forEach((dot) => drawDot(dot.x, dot.y, dot.r));
		};

		const timeline = gsap.timeline({ onUpdate: redraw }).from(dots, {
			duration: dur,
			ease: 'none',
			x: () => '+=random(-99,99)',
			y: (_, t) => t.r * ch,
			r: () => '+=random(-1,2)',
			repeatRefresh: true,
			stagger: { from: 'random', amount: dur, repeat: -1 },
		});

		canvas.onpointermove = (e) => gsap.to(mPos, { x: e.offsetX, y: e.offsetY });

		timeline.seek(dur);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
		/>
	);
};

export default Particles;
