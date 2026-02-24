'use client';

import { useReadContract } from 'wagmi';
import { wagmiContractConfig } from '@/src/config/wagmiContractConfig';
import { formatEther } from 'viem';

export function LotteryEntranceStatus() {
  const {
    data: entranceFee,
    isLoading,
    error
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getEntrance'
  });

  if (isLoading) return <div>Fetching entrance fee...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded-xl bg-blue-50">
      <h3 className="text-sm font-medium text-blue-600">Entrance Fee</h3>
      <p className="text-2xl font-bold">
        {entranceFee ? formatEther(entranceFee as bigint) : '0'} ETH
      </p>
    </div>
  );
}
