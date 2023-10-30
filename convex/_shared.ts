import { Auth } from "convex/server";
import { ConvexError } from "convex/values";

export type ErrorData = {
  code:
    | "Unauthorized"
    | "InvalidOperation"
    | "NotFound"
    | "DatabaseError"
    | "Unknown";
  message?: string;
  severity?: "High" | "Medium" | "Low";
  where?: string;
};

/**
 * Custom error class for Convex errors to give ourself's type safety.
 * see https://docs.convex.dev/functions/error-handling/application-errors
 */
export class IConvexError extends ConvexError<ErrorData> {
  constructor(data: ErrorData) {
    super(data);
  }

  formatMessage() {
    return `[${this.data.code.toUpperCase()}]: ${this.data.message}`;
  }
}

/**
 * Gets the users identity from the auth object and checks if it exists.
 * @param auth The auth object from the context.
 */
export async function isAuthenticated(auth: Auth) {
  const identity = await auth.getUserIdentity();

  if (!identity) {
    throw new IConvexError({
      code: "Unauthorized",
      message: "No identity found",
    });
  }

  return identity;
}
