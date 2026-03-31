import './styles.css'
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "mySwissTarget Registrierung",
  description: "Registrierungsportal für Schiessanlässe mit SAT-Admin-Vereinslogin",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9fc",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: "Inter, Arial, sans-serif", background: "linear-gradient(180deg, #f8fafc 0%, #f3f6f9 100%)", color: "#162233", letterSpacing: "-0.01em" }}>
        {children}
      </body>
    </html>
  )
}
