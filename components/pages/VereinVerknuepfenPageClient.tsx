'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { events, linkedClubs } from '@/components/data'
import { Card, Content, Hero, Shell, Topbar } from '@/components/ui'

export default function VereinVerknuepfenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('event') ?? events[0].id
  const event = useMemo(() => events.find((entry) => entry.id === eventId) ?? events[0], [eventId])
  const [clubNumber, setClubNumber] = useState('3001')
  const [licenseNumber, setLicenseNumber] = useState('300.100.200')
  const [message, setMessage] = useState('')

  function connect() {
    const match = linkedClubs.find((entry) => entry.clubNumber === clubNumber && entry.licenseNumber === licenseNumber)
    if (!match) {
      setMessage('Die Vereinsnummer oder die Lizenznummer passt nicht zu einem berechtigten Verein.')
      return
    }
    router.push(`/verein?event=${event.id}&club=${match.clubNumber}`)
  }

  return (
    <Shell>
      <Topbar />
      <Hero
        eyebrow="Verein verknüpfen"
        title="Anmeldung zum Schiessanlass vorbereiten"
        text={`Schiessanlass: ${event.title}. Geben Sie Ihre SSV Vereinsnummer und Ihre eigene SSV Lizenznummer an, damit das Login mit dem Verein verbunden werden kann.`}
      />
      <Content>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 16 }}>
          <Card title="Verein verknüpfen">
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#5a6878', marginBottom: 6 }}>SSV Vereinsnummer</div>
                <input value={clubNumber} onChange={(e) => setClubNumber(e.target.value)} style={{ width: '100%', borderRadius: 8, border: '1px solid #cfd8e3', padding: '12px 14px' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#5a6878', marginBottom: 6 }}>Ihre eigene SSV Lizenznummer</div>
                <input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} style={{ width: '100%', borderRadius: 8, border: '1px solid #cfd8e3', padding: '12px 14px' }} />
              </div>
              <button onClick={connect} style={{ background: '#a81420', color: '#fff', border: '1px solid #a81420', borderRadius: 8, padding: '12px 16px', fontWeight: 800, cursor: 'pointer' }}>Verbinden</button>
              {message ? <div style={{ color: '#991b1b', fontWeight: 700 }}>{message}</div> : null}
            </div>
          </Card>
          <Card title="Aktuell verbundene Vereine">
            <div style={{ display: 'grid', gap: 10 }}>
              {linkedClubs.map((club) => (
                <div key={club.clubNumber} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', border: '1px solid #d8dee6', borderRadius: 8, padding: 12, background: '#f7f9fb' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{club.clubName}</div>
                    <div style={{ color: '#5a6878' }}>Vereinsnummer {club.clubNumber}</div>
                  </div>
                  <button onClick={() => router.push(`/verein?event=${event.id}&club=${club.clubNumber}`)} style={{ background: '#fff', border: '1px solid #d8dee6', borderRadius: 8, padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }}>Für diesen Verein anmelden</button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Content>
    </Shell>
  )
}
