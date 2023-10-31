import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { IConvexError, formatReturnString } from './_shared';
import { getUserWithId } from './auth';
import { Id } from './_generated/dataModel';

export const list = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) return [];

		const user = await getUserWithId(ctx);

		if (!user) return [];

		const projects = [];

		for (const id of user.projects) {
			const project = await ctx.db.get(id);
			if (project) {
				projects.push(project);
			}
		}

		return projects;
	},
});

export const create = mutation({
	args: {
		name: v.string(),
		description: v.optional(v.string()),
		support_email: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) return formatReturnString('create', 'User identity not found.');

		const user = await getUserWithId(ctx);

		if (!user) return formatReturnString('create', 'User not found.');

		if (user.projects.length >= 3) {
			throw new IConvexError({
				code: 'InvalidOperation',
				message: 'You have reached the maximum number of projects',
				severity: 'Low',
			});
		}

		// Create the new project
		const newProjectId = await ctx.db.insert('projects', {
			name: args.name,
			description: args.description,
			support_email: args.support_email,
			members: [],
			tombstoned: false,
		});

		// create our new project member
		const newProjectMemberId = await ctx.db.insert('project_members', {
			project_id: newProjectId,
			user_id: user._id,
			privileges: 'Creator',
		});

		// add the new project member to the project
		await ctx.db.patch(newProjectId, {
			members: [newProjectMemberId],
		});

		await ctx.db.patch(user._id, {
			projects: [...user.projects, newProjectId],
		});

		return formatReturnString('create', 'success');
	},
});

/**
 * Purges all information related to a project. (Members, logs, etc.)
 *
 * Mostly just used for testing, but might use for a feature later...
 */
export const purge = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) return formatReturnString('purge', 'User identity not found.');

		const user = await getUserWithId(ctx);

		if (!user) return formatReturnString('purge', 'User not found.');

		const projects = await list(ctx, { user_id: user.user_id });

		if (projects.length === 0) return 'No projects found to purge.';

		const projectIds: Id<'projects'>[] = [];
		const memberIds: Id<'project_members'>[] = [];
		const projectServices: Id<'project_services'>[] = [];
		const projectLogs: Id<'logs'>[] = [];
		let delete_count = 0;

		for (const project of projects) {
			for (const memberId of project.members) {
				memberIds.push(memberId);
			}

			const getServices = await ctx.db
				.query('project_services')
				.filter((q) => q.eq(q.field('project_id'), project._id))
				.collect();

			for (const service of getServices) {
				projectServices.push(service._id);

				for (const service of getServices) {
					const getLogs = await ctx.db
						.query('logs')
						.filter((q) => q.eq(q.field('project_id'), project._id))
						.filter((q) => q.eq(q.field('service_id'), service._id))
						.collect();

					for (const log of getLogs) {
						projectLogs.push(log._id);
					}
				}
			}

			projectIds.push(project._id);
		}

		let queue = [...projectIds, ...memberIds, ...projectServices, ...projectLogs];

		for (const doc of queue) {
			await ctx.db.delete(doc);
			delete_count++;
		}

		ctx.db.patch(user._id, {
			projects: [],
		});

		console.log(
			`Deleted ${delete_count} documents from ${projects.length} projects.`
		);

		return formatReturnString('purge', 'success');
	},
});
