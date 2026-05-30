'use client'

import { useEffect, useState } from 'react'

import {
  createPublicClient,
  http,
} from 'viem'

import { base } from 'viem/chains'

const erc721Abi = [
  {
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const NFTS = [
  {
    name: 'Basenames NFT',
    address:
      '0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a',
  },

  {
    name: 'Beta NFT',
    address:
      '0xe3EB165C9ED6D6D87A59C410C8F30bABac44FeFD',
  },
]

export function NFTChecker({
  address,
}: {
  address: `0x${string}`
}) {
  const [results, setResults] = useState<
    {
      name: string
      owned: boolean
    }[]
  >([])

  useEffect(() => {
    async function checkNFTs() {
      const client = createPublicClient({
        chain: base,
        transport: http(),
      })

      const checks = await Promise.all(
        NFTS.map(async (nft) => {
          try {
            const balance =
              await client.readContract({
                address: nft.address as `0x${string}`,
                abi: erc721Abi,
                functionName: 'balanceOf',
                args: [address],
              })

            return {
              name: nft.name,
              owned: Number(balance) > 0,
            }
          } catch {
            return {
              name: nft.name,
              owned: false,
            }
          }
        })
      )

      setResults(checks)
    }

    checkNFTs()
  }, [address])

  const eligible =
    results.length > 0 &&
    results.every((nft) => nft.owned)

  return (
    <div className="border rounded p-4 mt-4 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        NFT Eligibility
      </h2>

      <div className="flex flex-col gap-2">

        {results.map((nft) => (
          <p key={nft.name}>
            {nft.owned ? '✅' : '❌'}
            {' '}
            {nft.name}
          </p>
        ))}

      </div>

      <div className="mt-4 text-xl font-bold">
        {eligible
          ? '🎉 Eligible for Airdrop'
          : '❌ Missing Required NFTs'}
      </div>

    </div>
  )
}