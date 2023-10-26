import { protectedProcedure, router } from '@/lib/trpc/server/trpc';
import { wait } from '@/lib/utils';

import projects from '../../data/mock/projects';

export const projectsRouter = router({
	list: protectedProcedure.query(async ({ ctx }) => {
		// todo - fetch this from supabase
		// we will only return the projects that the user is a member.
		// We can get the current user data from the session cookie like so: ctx.session.user.id
		await wait(500);
		return projects;
	}),
});
