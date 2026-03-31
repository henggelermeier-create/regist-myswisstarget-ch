import Link from 'next/link'
import { getEvent, getSlotsByEvent } from '@/components/data'
import { CapacityBar, Card, Content, Hero, Shell, Topbar } from '@/components/ui'

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id)
  const eventSlots = getSlotsByEvent(event.id)

  return (
    <Shell>
      <Topbar />
      <Hero
        eyebrow="Schiessanlass"
        title={event.title}
        text="Vor dem Login sehen Sie Austragungsort, Anmeldeschluss und die Art der Rangierung. Für die Bearbeitung verbinden Sie danach den Verein mit SSV Vereinsnummer und eigener SSV Lizenznummer."
        actions={<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><Link href={`/verein-verknuepfen?event=${event.id}`} style={{ display: 'inline-block', textDecoration: 'none', background: '#fff', color: '#132033', borderRadius: 8, padding: '11px 15px', fontWeight: 800 }}>Verein verknüpfen</Link></div>}
      />
      <Content>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 16 }}>
          <Card title="Anlassdaten">
            <div style={{ display: 'grid', gap: 6, lineHeight: 1.7 }}>
              <div><strong>Datum:</strong> {event.date}</div>
              <div><strong>Ort:</strong> {event.place}</div>
              <div><strong>Schützenhaus:</strong> {event.clubhouse}</div>
              <div><strong>Adresse:</strong> {event.address}</div>
              <div><strong>Scheiben:</strong> {event.targets}</div>
              <div><strong>Anmeldeschluss:</strong> {event.deadline}</div>
              <div><strong>Rangierung:</strong> {event.rankingMode}</div>
              <div><strong>Hinweis:</strong> {event.note}</div>
            </div>
          </Card>
          <Card title="Freie Kapazität">
            <div style={{ display: 'grid', gap: 12 }}>
              {eventSlots.map((slot) => (
                <div key={`${slot.date}-${slot.time}`} style={{ border: '1px solid #d8dee6', borderRadius: 8, padding: 14, background: '#f7f9fb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{slot.date}</div>
                      <div>{slot.time}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800 }}>{slot.stand}</div>
                      <div style={{ color: '#5a6878' }}>{slot.status}</div>
                    </div>
                  </div>
                  <CapacityBar free={slot.free} total={slot.total} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Content>
    </Shell>
  )
}
