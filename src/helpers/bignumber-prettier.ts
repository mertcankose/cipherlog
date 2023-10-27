import {ethers} from 'ethers';

export const parseAndFormat = (value: any) => {
  if (value) {
    return parseInt(ethers.utils.formatUnits(JSON.parse(value), 0));
  }
  return 1;
};
