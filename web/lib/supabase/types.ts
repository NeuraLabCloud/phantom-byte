import {Database} from "@/lib/supabase/database-types";

type _Project = Database["public"]["Tables"]["projects"]["Row"];
export type Projects = _Project[];