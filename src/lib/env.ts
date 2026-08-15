const publicEnvRaw = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const serverEnvRaw = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

function assertEnv<T extends Record<string, string | undefined>>(
  env: T,
  names: (keyof T & string)[],
): { [K in keyof T]: string } {
  const missing = names.filter((name) => !env[name]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(", ")}`);
  }
  return env as { [K in keyof T]: string };
}

function getPublicEnv() {
  return assertEnv(publicEnvRaw, ["supabaseUrl", "supabaseAnonKey"]);
}

function getServerEnv() {
  return assertEnv(serverEnvRaw, ["supabaseServiceRoleKey"]);
}

export { getPublicEnv, getServerEnv };
