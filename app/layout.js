
import { AppProvider } from './context/AppContext'
import './globals.css'

export const metadata = {
  title: 'NearBuy – Find Nearby Shops Easily',
  description:
    'Find nearby shops instantly with NearBuy. Search, filter, and locate stores using your live location. Smart, fast & mobile-friendly shopping assistant.',
  keywords: [
    'nearby shop finder',
    'shop locator app',
    'local stores near me',
    'live GPS shop search',
    'shop finder with distance',
    'NearBuy app',
    'real-time shop locator',
  ],
  openGraph: {
    title: 'NearBuy – Real-Time Shop Locator App',
    description:
      'Use your GPS to find shops near you. Filter by products, view stock info, and navigate directly via Google Maps.',
    url: 'https://yourdomain.com',
    siteName: 'NearBuy',
    images: [
      {
        url: 'https://yourdomain.com/nearbuy-preview.png',
        width: 1200,
        height: 630,
        alt: 'NearBuy Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NearBuy – Real-Time Shop Locator',
    description:
      'Locate nearby shops using GPS and product filters. Shop smarter, faster with NearBuy.',
    images: ['https://yourdomain.com/nearbuy-preview.png'],
  },
};

const RootLayout = async ({ children }) => {

  return (
    <>
      <html className='text-[62.5%]' lang='en'>
        <body className='bg-white text-black text-3xl mx-0 my-auto px-0 lg:px-[3.2rem] min-w-[32rem]'>
          <AppProvider>
            {children}
          </AppProvider>
        </body>
      </html>
    </>
  )
}

export default RootLayout
