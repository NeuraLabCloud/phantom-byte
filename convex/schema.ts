import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const authUserRoles = v.union(
	v.literal('User'),
	v.literal('Mod'),
	v.literal('Admin'),
	v.literal('Developer')
);

const logLevels = v.union(
	v.literal('Debug'),
	v.literal('Info'),
	v.literal('Warn'),
	v.literal('Error'),
	v.literal('Fatal'),
	v.literal('Trace')
);

const projectPrivileges = v.union(
	v.literal('Read'),
	v.literal('Write'),
	v.literal('Admin'),
	v.literal('Creator')
);

export default defineSchema({
	/**
	 * * Users table
	 *
	 * Most data here comes from the clerk identity.
	 */
	auth: defineTable({
		// Clerk data
		tokenIdentifier: v.string(),
		issuer: v.string(),
		user_id: v.string(),
		username: v.string(),
		email: v.string(),
		emailVerified: v.boolean(),
		// End clerk data
		role: authUserRoles,
		// todo - later, when users are tombstoned, we will keep all there data, until a cron job is ran
		// automatically to delete all the related users information such as projects, logs, etc. Only after
		// this will there information be deleted forever.
		tombstoned: v.boolean(),
		/**
		 * ? FOREIGN KEY
		 * Projects that the user is a creator of.
		 *
		 * We keep these separate from the `joined_projects` field because we want to limit the number of projects
		 * a user can create, however a user can join many projects if needed.
		 *
		 * If a user creates a project, they will not be on it's join list.
		 * The user will be on its `members` list however.
		 */
		projects: v.array(v.id('projects')),
		/**
		 * ? FOREIGN KEY
		 * Projects that the user is a member of.
		 */
		joined_projects: v.array(v.id('projects')),
	}).index('by_user_id', ['user_id']),
	/**
	 * * Projects table
	 *
	 * Stores projects for the application.
	 */
	projects: defineTable({
		name: v.string(),
		description: v.optional(v.string()),
		support_email: v.optional(v.string()),
		/**
		 * ? FOREIGN KEY
		 * Members of the project referenced by their auth id.
		 * This is a list of auth ids that are allowed to access the project and view it on there dashboard as well.
		 */
		members: v.array(v.id('project_members')),
	}),
	/**
	 * * Project services table
	 *
	 * Stores services for a project. After creating a project, you can make services for it.
	 * These services are attached to different logs and it allows for separation of logs for different services.
	 */
	project_services: defineTable({
		name: v.string(),
		description: v.optional(v.string()),
		/**
		 * ? FOREIGN KEY
		 */
		project_id: v.id('projects'),
	}),
	/**
	 * * Project members table
	 *
	 * Stores members of a project.
	 *
	 * This is a many to many relationship between `auth` and `projects`.
	 *
	 * This table is used to store the privileges that a user has on a project as well as any other metadata for project members.
	 */
	project_members: defineTable({
		/**
		 * ? FOREIGN KEY
		 */
		project_id: v.id('projects'),
		/**
		 * ? FOREIGN KEY
		 */
		user_id: v.id('auth'),
		/**
		 * The privileges that the user has on the project.
		 */
		privileges: projectPrivileges,
		/**
		 * The status of the project invite.
		 */
		invite_status: v.optional(
			v.union(v.literal('Pending'), v.literal('Accepted'), v.literal('Declined'))
		),
	}),
	/**
	 * * Logs table
	 *
	 * Stores logs for the application.
	 */
	logs: defineTable({
		/**
		 * The data that is stored in the log.
		 * This is a JSON object that can be anything.
		 */
		data: v.any(),
		message: v.optional(v.string()),
		severity: logLevels,
		/**
		 * ? FOREIGN KEY
		 */
		project_id: v.id('projects'),
		/**
		 * ? FOREIGN KEY
		 */
		service_id: v.id('project_services'),
	}),
	/**
	 * * Tokens table
	 *
	 * Stores API tokens for projects and users.
	 * Each project can have many tokens, and users all share the same tokens for the project.
	 */
	tokens: defineTable({
		/** The name of the token to display on the dashboard */
		name: v.string(),
		token: v.string(),
		/**
		 * ? FOREIGN KEY
		 */
		project_id: v.id('projects'),
	}),
	/*
	 * * Global table
	 *
	 * Stores global settings for the application.
	 */
	global_metadata: defineTable({
		active_users: v.number(),
	}),
	/**
	 * * Global settings table
	 *
	 * Stores global settings for the application.
	 */
	global_settings: defineTable({
		maintenance_mode: v.boolean(),
	}),
});
