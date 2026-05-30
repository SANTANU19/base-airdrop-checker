'use client'

import { useState } from 'react'

import {
  createPublicClient,
  http,
} from 'viem'

import { base } from 'viem/chains'

import { AirdropScore } from '@/components/AirdropScore'

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

const BRIDGE_ADDRESS =
  '0x3154cf16ccdb4c6d922629664174b904d80f2c35'

export default function Home() {

  const [wallet, setWallet] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [checked, setChecked] =
    useState(false)

  const [balance, setBalance] =
    useState('0')

  const [hasBasename, setHasBasename] =
    useState(false)

  const [hasBeta, setHasBeta] =
    useState(false)

  const [usedBridge, setUsedBridge] =
    useState(false)

  async function checkWallet() {

    if (!wallet) return

    try {

      setLoading(true)

      const client = createPublicClient({
        chain: base,
        transport: http(),
      })

      // WALLET BALANCE

      const balanceWei =
        await client.getBalance({
          address:
            wallet as `0x${string}`,
        })

      setBalance(
        (
          Number(balanceWei) /
          1e18
        ).toString()
      )

      // BASENAMES NFT

      const basenameBalance =
        await client.readContract({
          address:
            '0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a',
          abi: erc721Abi,
          functionName: 'balanceOf',
          args: [wallet],
        })

      // BETA NFT

      const betaBalance =
        await client.readContract({
          address:
            '0xe3EB165C9ED6D6D87A59C410C8F30bABac44FeFD',
          abi: erc721Abi,
          functionName: 'balanceOf',
          args: [wallet],
        })

      setHasBasename(
        Number(basenameBalance) > 0
      )

      setHasBeta(
        Number(betaBalance) > 0
      )

      // BRIDGE CHECK

      const response = await fetch(
        `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=V16SVZ526YK4UMXVRNW1P68JX2VIRXKEB4`
      )

      const data =
        await response.json()

      if (
        data &&
        data.status === '1' &&
        Array.isArray(data.result)
      ) {

        const bridgeFound =
          data.result.some(
            (tx: any) =>
              tx.to?.toLowerCase() ===
              BRIDGE_ADDRESS
          )

        setUsedBridge(
          bridgeFound
        )

      }

      setChecked(true)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <main className="min-h-screen flex flex-col items-center gap-6 p-8">

      <h1 className="text-5xl font-bold">
        Base Airdrop Checker
      </h1>

      <div className="flex gap-2 w-full max-w-xl">

        <input
          type="text"
          placeholder="Enter wallet address"
          value={wallet}
          onChange={(e) =>
            setWallet(
              e.target.value
            )
          }
          className="border p-3 rounded w-full"
        />

        <button
          onClick={checkWallet}
          className="bg-black text-white px-6 rounded"
        >

          {loading
            ? 'Checking...'
            : 'Check'}

        </button>

      </div>

      {checked && (

        <>

          <div className="border rounded p-4 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              Wallet Details
            </h2>

            <p>
              Address:
              {' '}
              {wallet}
            </p>

            <p>
              Chain:
              {' '}
              Base Mainnet
            </p>

            <p>
              Balance:
              {' '}
              {balance}
              {' '}
              ETH
            </p>

          </div>

          <div className="border rounded p-4 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              Eligibility
            </h2>

            <p>
              {hasBasename
                ? '✅ Basenames NFT'
                : '❌ Basenames NFT'}
            </p>

            <p>
              {hasBeta
                ? '✅ Beta Access NFT'
                : '❌ Beta Access NFT'}
            </p>

            <p>
              {usedBridge
                ? '✅ Bridged ETH to Base'
                : '❌ No Base Bridge Activity'}
            </p>

          </div>

          <AirdropScore
            hasBasename={hasBasename}
            hasBeta={hasBeta}
            usedBridge={usedBridge}
          />

        </>

      )}

    </main>

  )
}