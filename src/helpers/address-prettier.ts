export const addressPrettier = (
  address: string | undefined,
  prefixLength = 3,
  suffixLength = 3,
) => {
  if (address && address.length !== 42) {
    return 'Invalid Ethereum address';
  }

  const prefix = address?.slice(0, prefixLength + 2);
  const suffix = address?.slice(-suffixLength);

  const shortenedAddress = `${prefix}...${suffix}`;

  return shortenedAddress;
};
