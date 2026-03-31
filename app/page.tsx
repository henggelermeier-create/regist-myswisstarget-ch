import Link from 'next/link'
import { events } from '@/components/data'
import { Badge, Card, Content, Hero, Shell, Topbar } from '@/components/ui'

export default function HomePage() {
  return (
    <Shell>
      <Topbar />
      <Hero
        eyebrow="Registrierung zum Schiessanlass"
        title="Offene Schiessanlässe"
        text="Hier sehen Vereine, für welche Schiessanlässe eine Anmeldung möglich ist. Nach dem Login werden Vereinsangaben, Schützen, Rangierung, Gruppeneinteilung und Kontrolle in einem ruhigen Ablauf geführt."
      />
      <Content>
        <div style={{ display: 'grid', gap: 18 }}>
          {events.filter((event) => event.activeForRegistration).map((event) => (
            <Card key={event.id}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.8fr 0.75fr', gap: 20, alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 10 }}>{event.title}</div>
                  <div style={{ display: 'grid', gap: 4, color: '#5a6878', lineHeight: 1.7 }}>
                    <div><strong>Datum:</strong> {event.date}</div>
                    <div><strong>Ort:</strong> {event.place}</div>
                    <div><strong>Schützenhaus:</strong> {event.clubhouse}</div>
                    <div><strong>Anmeldeschluss:</strong> {event.deadline}</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(247,250,252,0.84)', border: '1px solid #d8dee6', borderRadius: 20, padding: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Rangierung</div>
                  <div style={{ color: '#5a6878', marginBottom: 12 }}>{event.rankingMode}</div>
                  <Badge>{event.freeSlotsText}</Badge>
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <Link href={`/anlass/${event.id}`} style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', borderRadius: 16, padding: '12px 16px', fontWeight: 800, border: '1px solid #d8dee6', background: 'rgba(255,255,255,0.9)' }}>Anlass ansehen</Link>
                  <Link href={`/verein-verknuepfen?event=${event.id}`} style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', borderRadius: 16, padding: '12px 16px', fontWeight: 800, background: 'linear-gradient(180deg, #aa2b23, #8f1b18)', color: '#fff', border: '1px solid #8f1b18' }}>Zum Login</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Content>
    </Shell>
  )
}
