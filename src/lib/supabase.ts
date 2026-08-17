import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let clienteServer: SupabaseClient | null = null;

export function crearClienteSupabaseServer(): SupabaseClient {
  if (!clienteServer) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Faltan variables de entorno de Supabase");
    }

    clienteServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return clienteServer;
}
