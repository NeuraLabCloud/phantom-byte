import { FC, useEffect, useRef } from "react";
import gsap from "gsap";

interface ParticlesProps {}

const Particles: FC<ParticlesProps> = () => {
    // Create a reference to the canvas element
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Get the canvas and its context
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set the width and height of the canvas to match the window dimensions
        const cw = (canvas.width = window.innerWidth);
        const ch = (canvas.height = window.innerHeight);

        // Create an array of dots with initial positions and sizes
        const dots = Array.from({ length: 500 }, () => ({
            x: cw * Math.random(),
            y: -10,
            r: gsap.utils.random(1.5, 4.5, 0.1),
        }));

        // Define other necessary variables for the animation
        const dur = 100; // Duration of animation
        const hue = 275; // Base hue value for the dots
        const mPos = { x: cw / 2, y: ch }; // Mouse position for interactive effect

        // Function to draw a single dot
        const drawDot = (x: number, y: number, r: number) => {
            const dist = Math.abs(x - mPos.x) + Math.abs(y - mPos.y);
            ctx.fillStyle = `hsl(${hue}, 100%, ${
                Math.max(1 - dist / (dots.length - 1), 0.05) * 80
            }%)`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        };

        // Function to clear the canvas and redraw all dots
        const redraw = () => {
            ctx.clearRect(0, 0, cw, ch);
            dots.forEach((dot) => drawDot(dot.x, dot.y, dot.r));
        };

        // GSAP animation timeline for dot movement and properties
        const timeline = gsap.timeline({ onUpdate: redraw }).from(dots, {
            duration: dur,
            ease: "none",
            x: () => "+=random(-99,99)",
            y: (_, t) => t.r * ch,
            r: () => "+=random(-1,2)",
            repeatRefresh: true,
            stagger: { from: "random", amount: dur, repeat: -1 },
        });

        // Event listener for mouse movement to update the mouse position
        canvas.onpointermove = (e) => gsap.to(mPos, { x: e.offsetX, y: e.offsetY });

        // Fast-forward the animation to the end to avoid initial flickering
        timeline.seek(dur);
    }, []);

    // Render the canvas with fixed position to cover the whole viewport
    return (
        <canvas
            ref={canvasRef}
            style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        />
    );
};

export default Particles;
