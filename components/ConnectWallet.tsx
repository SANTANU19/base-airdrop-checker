'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useChainId,
} from 'wagmi'

import { formatEther } from 'viem'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()

  const { connect, connectors } = useConnect()

  const { disconnect } = useDisconnect()

  const chainId = useChainId()

  const {
    data: balance,
    isLoading,
  } = useBalance({
    address,
    chainId,
  })

  const formattedBalance = balance
    ? formatEther(balance.value)
    : '0'

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="border p-2 rounded"
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 items-center">

      <h2 className="text-xl font-bold">
        Wallet Connected
      </h2>

      <p>
        Address:
        {' '}
        {address}
      </p>

      <p>
        Chain ID:
        {' '}
        {chainId}
      </p>

      <p>
        Balance:
        {' '}
        {isLoading
          ? 'Loading...'
          : `${formattedBalance} ETH`}
      </p>

      <button
        onClick={() => disconnect()}
        className="border p-2 rounded"
      >
        Disconnect
      </button>
    </div>
  )
}