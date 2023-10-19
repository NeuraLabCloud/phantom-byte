import { FC } from 'react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';

interface loginProps {}

const LoginButton: FC<loginProps> = ({}) => {
	return (
		<Auth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			providers={['github']}
			onlyThirdPartyProviders={true}
		/>
	);
};

export default LoginButton;
