import { raffleAbi } from '@/constants';

export const wagmiContractConfig = {
  address: process.env.NEXT_PUBLIC_RAFFLE_ADDRESS,
  abi: raffleAbi
} as const;
