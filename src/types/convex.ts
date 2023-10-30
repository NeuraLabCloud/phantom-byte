import { api } from '../../convex/_generated/api';

export type AuthUser = typeof api.auth.get._returnType;
export type Projects = typeof api.projects.list._returnType;
export type Project = typeof api.projects.list._returnType[0];