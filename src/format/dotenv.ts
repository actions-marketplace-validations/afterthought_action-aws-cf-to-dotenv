export const formatDotenv = (prefix = '') =>
  ({OutputKey, OutputValue}) => `${prefix}${OutputKey}=${OutputValue}`
