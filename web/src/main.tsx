import '@mantine/core/styles.css';
import './index.css';

// Libraries
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import MantineClientProvider from './components/providers/MantineClientProvider.tsx';

// Routes
import Home from './routes/Home.tsx';
import NotFound from './routes/NotFound.tsx';
import LoadSpinner from './components/ui/animations/loading/LoadSpinner.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <div>Login</div>,
	},
	{
		path: '/logout',
		element: <div>Logout</div>,
	},
	{
		path: '/dashboard',
		element: <div>Dashboard</div>,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineClientProvider>
			<Suspense fallback={<LoadSpinner />}>
				<RouterProvider router={router} />
			</Suspense>
		</MantineClientProvider>
	</React.StrictMode>
);
