import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

/**
 * Gets many services from a single project
 */
export const getMany = query({
	args: {
		project_id: v.id('projects'),
	},
	handler: async (ctx, { project_id }) => {
		return await ctx.db
			.query('project_services')
			.withIndex('by_project_id', (q) => q.eq('project_id', project_id))
			.collect();
	},
});
