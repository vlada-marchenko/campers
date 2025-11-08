import Header from "../components/Header/Header"
import TanStackProvider from "../components/TanStackProvider/TanStackProvider"
import './global.css'
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: 'TravelTrucks | Campers of Your Dreams',
  description: 'Find your ideal camper van in our catalog and start your next adventure with TravelTrucks.',
    openGraph: {
    title: 'TravelTrucks',
    description: 'Find your ideal camper van in our catalog and start your next adventure with TravelTrucks.',
    url: ''}
}

export default function RootLayout( {
children
}: Readonly<{
    children: React.ReactNode
}> ) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TanStackProvider>
                    <Header/>
                    <main>
                    {children}
                    </main>
                </TanStackProvider>
            </body>
        </html>
    )
}