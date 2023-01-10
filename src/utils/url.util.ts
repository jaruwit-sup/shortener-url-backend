export const autoAddProtocol = (url: string) => {
  const match = url.match(/^(https?\:)\//);
  if (!match) {
    url = `https://${url}`;
  }
  return url;
};

export const isUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
