import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicEnv, getServerEnv } from "@/lib/env";

let clienteServer: SupabaseClient | null = null;

export function crearClienteSupabaseServer(): SupabaseClient {
  if (!clienteServer) {
    clienteServer = createClient(getPublicEnv().supabaseUrl, getServerEnv().supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return clienteServer;
}
