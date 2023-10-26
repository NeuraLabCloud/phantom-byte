import { createClient } from "@/lib/supabase/client";

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
  const supabase = createClient();
  const auth = supabase.auth.getUser();

  // const provider = auth?.user?.app_metadata.provider as "github" | "google";

  // switch (provider) {
  //     case "github":
  //         // todo
  //     case "google":
  //         // todo
  //     default:
  //         return {
  //             email: "",
  //             avatar_url: "",
  //             username: "",
  //         };
  // }
};
