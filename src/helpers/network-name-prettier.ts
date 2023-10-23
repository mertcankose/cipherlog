export const networkNamePrettier = (
  name: string | undefined,
  end: number | undefined,
) => {
  if (name === undefined) {
    return 'Invalid Ethereum address';
  }

  const prefix = name?.slice(0, end);

  const shortenedName = `${prefix}..`;

  return shortenedName;
};
