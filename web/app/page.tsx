import { createClient } from "@/lib/supabase/server";
import HomeComponent from "@/components/page-ui/HomeComponent";

export const dynamic = "force-dynamic";

const canInitSupabaseClient = () => {
  try {
    const client = createClient();
    return {
      client,
      ready: true,
    };
  } catch (e) {
    return {
      client: null,
      ready: false,
    };
  }
};

export default async function Index() {
  const { client, ready } = canInitSupabaseClient();

  if (!client) return null;

  const {
    data: { session },
  } = await client.auth.getSession();

  const isAuthed = session !== null;

  return <HomeComponent clientReady={ready} isAuthed={isAuthed} />;
}
