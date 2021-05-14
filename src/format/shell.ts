export const formatShell = (prefix = '') =>
  ({OutputKey, OutputValue}) => `export ${prefix}${OutputKey}=${OutputValue}`
