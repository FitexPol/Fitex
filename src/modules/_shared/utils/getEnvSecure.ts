type EnvKey = 'DB_USER' | 'DB_PASSWORD' | 'DB_NAME';

export function getEnvSecure(envKey: EnvKey): string {
  const env = process.env[envKey];

  if (!env) {
    throw new Error(`Environment variable ${envKey} is not defined`);
  }

  return env;
}
