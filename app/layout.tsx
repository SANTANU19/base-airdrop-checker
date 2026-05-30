import './globals.css'
import { Providers } from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base Airdrop Checker',
  description:
    'Check your Base ecosystem airdrop eligibility, NFT holdings, bridge activity, and score instantly.',

  openGraph: {
    title: 'Base Airdrop Checker',
    description:
      'Check your Base ecosystem airdrop eligibility instantly.',
    siteName: 'Base Airdrop Checker',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Base Airdrop Checker',
    description:
      'Check your Base ecosystem airdrop eligibility instantly.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}