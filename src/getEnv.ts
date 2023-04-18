export const getEnv = (envName: string): string => {
  const value = process.env[envName];

  if (value) return value;

  const error = new Error("ENV_VAR_NOT_DEFINED");
  error.message = `env var ${envName} is not defined`;
  throw error;
};
