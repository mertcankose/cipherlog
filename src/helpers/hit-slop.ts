import {hexValue} from 'ethers/lib/utils';

export const getHitSlop = (value: number) => {
  return {
    top: value,
    bottom: value,
    left: value,
    right: value,
  };
};
