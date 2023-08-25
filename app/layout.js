import './globals.css'
import { Poppins } from 'next/font/google' 

const poppins = Poppins(
	{subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'] },
	)

export const metadata = {
  title: 'LocateU',
  description: 'Never lose your way on campus. LocateU allows educational institutions to provide accurate location data on all lecture halls, examination venues and administrative buildings to resident students.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className="bg-white">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
