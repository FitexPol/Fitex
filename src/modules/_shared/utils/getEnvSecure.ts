type EnvKey = 'API_PREFIX';

export default function getEnvSecure(envKey: EnvKey) {
  const env = process.env[envKey];

  if (!env) {
    throw new Error(`Environment variable ${envKey} is not defined`);
  }

  return env;
}
