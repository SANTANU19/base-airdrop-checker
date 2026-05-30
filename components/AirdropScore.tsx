'use client'

import { useState } from 'react'

type Props = {
  hasBasename: boolean
  hasBeta: boolean
  usedBridge: boolean
}

export function AirdropScore({
  hasBasename,
  hasBeta,
  usedBridge,
}: Props) {

  const [hasDiscordRole, setHasDiscordRole] =
    useState(false)

  const walletScore = 10

  const basenameScore =
    hasBasename ? 10 : 0

  const betaScore =
    hasBeta ? 30 : 0

  const bridgeScore =
    usedBridge ? 20 : 0

  const discordScore =
    hasDiscordRole ? 30 : 0

  const totalScore =
    walletScore +
    basenameScore +
    betaScore +
    bridgeScore +
    discordScore

  const eligible =
    totalScore >= 70

  function shareOnX() {

    const text =
      `🚀 My Base Airdrop Score: ${totalScore}/100

✅ Basenames NFT: ${hasBasename ? 'Yes' : 'No'}
✅ Beta NFT: ${hasBeta ? 'Yes' : 'No'}
✅ Bridged to Base: ${usedBridge ? 'Yes' : 'No'}

🎉 ${eligible ? 'Eligible for Airdrop' : 'Not Eligible'}

Checked on Base Airdrop Checker`

    const url =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

    window.open(
      url,
      '_blank'
    )

  }

  return (

    <div className="border rounded p-4 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Airdrop Score
      </h2>

      <p>
        Wallet Activity:
        {' '}
        {walletScore}
        {' '}
        points
      </p>

      <p>
        Basenames NFT:
        {' '}
        {basenameScore}
        {' '}
        points
      </p>

      <p>
        Beta Access NFT:
        {' '}
        {betaScore}
        {' '}
        points
      </p>

      <p>
        Native Base Bridge:
        {' '}
        {bridgeScore}
        {' '}
        points
      </p>

      <label className="flex items-center gap-2 mt-4">

        <input
          type="checkbox"
          checked={hasDiscordRole}
          onChange={(e) =>
            setHasDiscordRole(
              e.target.checked
            )
          }
        />

        I have Onchain Summer Discord Role
        (+30 points)

      </label>

      <p className="mt-2">
        Discord Role Score:
        {' '}
        {discordScore}
        {' '}
        points
      </p>

      <h2 className="text-4xl font-bold mt-6">

        Total Score:
        {' '}
        {totalScore}
        /100

      </h2>

      <h3 className="text-2xl font-bold mt-4">

        {eligible
          ? '🎉 Eligible for Airdrop'
          : '❌ Not Eligible'}

      </h3>

      <button
        onClick={shareOnX}
        className="mt-6 bg-black text-white px-6 py-3 rounded w-full"
      >
        Share on X
      </button>

    </div>

  )
}