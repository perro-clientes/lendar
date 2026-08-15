import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { publicEnv, serverEnv } from "@/lib/env";

let clienteServer: SupabaseClient | null = null;

export function crearClienteSupabaseServer(): SupabaseClient {
  if (!clienteServer) {
    clienteServer = createClient(publicEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return clienteServer;
}
