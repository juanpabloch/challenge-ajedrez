import { Agdasima } from "next/font/google";
import "./globals.css";


const agdasima = Agdasima({
    weight: ['400','700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
  title: "Torneos de Ajedrez",
  description: "Gestión de torneos de ajedrez",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={`${agdasima.className}`}>
        {children}
      </body>
    </html>
  );
}
