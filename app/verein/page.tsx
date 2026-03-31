import { Suspense } from 'react'
import VereinPageClient from '@/components/pages/VereinPageClient'

export const dynamic = 'force-dynamic'

export default function VereinPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>Lade Anmeldung…</div>}>
      <VereinPageClient />
    </Suspense>
  )
}
