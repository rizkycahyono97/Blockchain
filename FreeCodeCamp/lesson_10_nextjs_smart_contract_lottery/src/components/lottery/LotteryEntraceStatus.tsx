'use client';

import { useReadContracts } from 'wagmi';
import { wagmiContractConfig } from '@/src/config/wagmiContractConfig';
import { formatEther } from 'viem';
import { Users, Trophy, Ticket, LockOpen, Loader2 } from 'lucide-react';

export function LotteryEntranceStatus() {
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: 'getEntrance'
      },
      {
        ...wagmiContractConfig,
        functionName: 'getNumberOfPlayer'
      },
      {
        ...wagmiContractConfig,
        functionName: 'getRecentWinner'
      },
      {
        ...wagmiContractConfig,
        functionName: 'getRaffleState'
      },
      {
        ...wagmiContractConfig,
        functionName: 'checkUpkeep',
        args: ['0x']
      }
    ]
  });

  const entranceFee = data?.[0]?.result as bigint | undefined;
  const totalPlayers = data?.[1]?.result as bigint | undefined;
  const recentWinner = data?.[2]?.result as string | undefined;
  const raffleState = data?.[3]?.result as number | undefined;
  const checkUpkeep = data?.[4]?.result as boolean | undefined;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl border" />
        ))}
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-sm">Error: {error.message}</div>;

  console.log('checkUpKeep: ', checkUpkeep);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Entrance Fee */}
      <div className="p-4 border rounded-xl bg-white shadow-sm border-blue-100">
        <div className="flex items-center gap-3 mb-2 text-blue-600">
          <Ticket size={20} />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Entrance Fee
          </h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {entranceFee ? `${formatEther(entranceFee)} ETH` : '0 ETH'}
        </p>
      </div>

      {/* 2. Raffle State */}
      <div
        className={`p-4 border rounded-xl shadow-sm transition-colors ${
          raffleState === 0
            ? 'bg-white border-green-100'
            : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div
          className={`flex items-center gap-3 mb-2 ${
            raffleState === 0 ? 'text-green-600' : 'text-amber-600'
          }`}
        >
          {raffleState === 0 ? (
            <LockOpen size={20} />
          ) : (
            <Loader2 size={20} className="animate-spin" />
          )}
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Raffle State
          </h3>
        </div>
        <p
          className={`text-xl font-bold ${
            raffleState === 0 ? 'text-gray-900' : 'text-amber-700'
          }`}
        >
          {raffleState === 0 ? 'OPEN' : 'CALCULATING'}
        </p>
      </div>

      {/* 3. Total Players */}
      <div className="p-4 border rounded-xl bg-white shadow-sm border-purple-100">
        <div className="flex items-center gap-3 mb-2 text-purple-600">
          <Users size={20} />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Total Players
          </h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {totalPlayers?.toString() || '0'}
        </p>
      </div>

      {/* 4. Recent Winner */}
      <div className="p-4 border rounded-xl bg-white shadow-sm border-emerald-100">
        <div className="flex items-center gap-3 mb-2 text-emerald-600">
          <Trophy size={20} />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Recent Winner
          </h3>
        </div>
        <p
          className="text-sm font-mono font-bold text-gray-900 truncate"
          title={recentWinner}
        >
          {recentWinner
            ? `${recentWinner.slice(0, 6)}...${recentWinner.slice(-4)}`
            : 'No winner yet'}
        </p>
      </div>
    </div>
  );
}
