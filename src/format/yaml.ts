export const formatYaml = (prefix = '') =>
  ({OutputKey, OutputValue}) => `${prefix}${OutputKey}: ${OutputValue}`
