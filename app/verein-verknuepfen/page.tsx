import { Suspense } from 'react'
import VereinVerknuepfenPageClient from '@/components/pages/VereinVerknuepfenPageClient'

export const dynamic = 'force-dynamic'

export default function VereinVerknuepfenPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>Lade Vereinsverknüpfung…</div>}>
      <VereinVerknuepfenPageClient />
    </Suspense>
  )
}
