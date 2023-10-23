import { useAuth } from "./useAuth";

/** UserMeta Taken from consoling the object */
type GoogleMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
};

/** UserMeta Taken from consoling the object */
type GithubMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  iss: string;
  preferred_username?: string;
  provider_id: string;
  sub: string;
  user_name: string;
};

/**
 * This function is a helper  for fetching user information in components.
 *
 * Things like there email, avatar_url, name etc. Basically, we check which provider there using
 * then return the correct information.
 *
 * Supported providers: Github and Google for now.
 */
export default () => {
  const auth = useAuth();

  const provider = auth?.user?.app_metadata.provider as "github" | "google";

  switch (provider) {
    case "github":
      const data = auth?.user?.user_metadata as GithubMetadata;
      // The username from the auth metadata can be stale, so we use the client username instead
      const username = auth?.client?.username as string;

      return {
        email: data.email,
        avatar_url: data.avatar_url,
        username,
      };
    case "google":
      const data2 = auth?.user?.user_metadata as GoogleMetadata;
      const username2 = auth?.client?.username as string;

      return {
        email: data2.email,
        avatar_url: data2.avatar_url,
        username: username2,
      };
    default:
      return {
        email: "",
        avatar_url: "",
        username: "",
      };
  }
};
