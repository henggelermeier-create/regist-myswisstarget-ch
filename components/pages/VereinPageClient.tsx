'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getEvent, getSlotsByEvent, linkedClubs, shooters } from '@/components/data'
import { AppSection, Badge, CapacityBar, Card, Content, Hero, InfoGrid, SectionBlock, Shell, SplitGrid, SubtlePanel, Tabs, Topbar } from '@/components/ui'

type TabKey = 'Übersicht' | 'Vereinsangaben' | 'Schützen' | 'Rangierung' | 'Gruppeneinteilung' | 'Kontrolle'
const tabs: TabKey[] = ['Übersicht', 'Vereinsangaben', 'Schützen', 'Rangierung', 'Gruppeneinteilung', 'Kontrolle']

const surfaceCard: CSSProperties = { padding: 16, borderRadius: 10, border: '1px solid #d8dee6', background: '#ffffff', boxShadow: '0 4px 12px rgba(15,23,42,0.024)' }
const metricLabel: CSSProperties = { fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }
const metricValue: CSSProperties = { fontWeight: 900, fontSize: 18, color: '#152235' }
const fieldGrid: CSSProperties = { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }
const sectionNote: CSSProperties = { color: '#5a6878', lineHeight: 1.7, maxWidth: 760 }
const responsiveTwo: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }
const responsiveThree: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }
const responsiveFour: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }
const softDivider: CSSProperties = { borderBottom: '1px solid #e7edf3' }

function MetricBox({ label, value }: { label: string; value: ReactNode }) {
  return <div style={surfaceCard}><div style={metricLabel}>{label}</div><div style={metricValue}>{value}</div></div>
}

export default function VereinPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('event') ?? 'fsm-2026'
  const clubId = searchParams.get('club') ?? '3001'
  const event = useMemo(() => getEvent(eventId), [eventId])
  const club = useMemo(() => linkedClubs.find((entry) => entry.clubNumber === clubId) ?? linkedClubs[0], [clubId])
  const [activeTab, setActiveTab] = useState<TabKey>('Übersicht')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [definitiveSubmitted, setDefinitiveSubmitted] = useState(false)
  const eventSlots = getSlotsByEvent(event.id)
  const selectableSlots = eventSlots.filter((slot) => slot.status === 'frei' || slot.status === 'wenig frei')

  const clubStatus = definitiveSubmitted
    ? (selectedSlot ? 'Schiesszeit zugeteilt' : event.rankingMode === 'Keine Schiesszeit' ? 'Keine Schiesszeit erforderlich' : 'Wunsch gespeichert')
    : event.rankingMode === 'Keine Schiesszeit'
      ? 'Keine Schiesszeit erforderlich'
      : selectedSlot
        ? 'Schiesszeit gewählt'
        : event.rankingMode === 'Schiesszeit nach Wunsch'
          ? 'Wunsch gespeichert'
          : 'offen'

  const organiserStatus = definitiveSubmitted
    ? (selectedSlot ? 'vollständig eingeteilt' : 'teilweise zugeteilt')
    : event.rankingMode === 'Keine Schiesszeit'
      ? 'offen'
      : selectedSlot
        ? 'teilweise zugeteilt'
        : 'offen'

  return (
    <Shell>
      <Topbar />
      <Hero
        eyebrow="Verein verbunden"
        title="Anmeldung zum Schiessanlass"
        text={`Verein: ${club.clubName} · Anlass: ${event.title} · Schützenhaus: ${event.clubhouse} · Bearbeitbar bis ${event.deadline}. Der Ablauf bleibt bewusst einfach, ruhig und bedienerfreundlich: Vereinsangaben, Schützen, Rangierung, Gruppeneinteilung und Kontrolle folgen einer klaren Reihenfolge.`}
      />
      <Content>
        <InfoGrid items={[
          ['Status Verein', clubStatus],
          ['Rangierung', event.rankingMode],
          ['Bon durch Verein', 'Ja'],
          ['Status Veranstalter', organiserStatus],
          ['Gewählter Slot', selectedSlot || 'noch nicht gewählt'],
          ['Weitergabe', definitiveSubmitted ? 'an Haupt-App übergeben' : 'bereit zur Übergabe'],
        ]} />

        <div style={{ height: 16 }} />
        <Tabs items={tabs} active={activeTab} onChange={(value) => setActiveTab(value as TabKey)} />

        {activeTab === 'Übersicht' && (
          <SectionBlock title="Übersicht" text="Alle wichtigen Angaben bleiben oben kompakt sichtbar. So erkennt der Verein sofort Anlass, Rangierungsmodus, Bearbeitungsstand und spätere Weitergabe.">
          <Card title="Übersicht">
            <div style={responsiveTwo}>
              <div style={{ lineHeight: 1.9 }}>
                <div><strong>Schiessanlass:</strong> {event.title}</div>
                <div><strong>Ort:</strong> {event.place}</div>
                <div><strong>Schützenhaus:</strong> {event.clubhouse}</div>
                <div><strong>Anmeldeschluss:</strong> {event.deadline}</div>
                <div><strong>Schiesszeit-Modell:</strong> {event.rankingMode}</div>
              </div>
              <div style={{ lineHeight: 1.9 }}>
                <div><strong>Scheiben:</strong> {event.targets}</div>
                <div><strong>Bon:</strong> Vereins-Bon möglich</div>
                <div><strong>Gruppen:</strong> gemeinsam schiessen optional</div>
                <div><strong>Status:</strong> {clubStatus}</div>
                <div><strong>Hinweis:</strong> Definitive Zuteilung, Reihenfolge und Zeitplan erfolgen in der Haupt-App.</div>
                <div><strong>Übergabe:</strong> Nach definitiver Anmeldung werden Wunsch, Gruppe und Bon direkt an die Haupt-App weitergegeben.</div>
              </div>
            </div>
          </Card>
          </SectionBlock>
        )}

        {activeTab === 'Vereinsangaben' && (
          <AppSection title="Vereinsangaben" text="Die Vereinsdaten bleiben auf einer klaren, ruhigen Eingabeseite zusammen und können vor der definitiven Anmeldung nochmals geprüft werden.">
            <Card title="Vereinsangaben">
              <div style={{ ...responsiveThree, marginBottom: 14 }}>
                <MetricBox label="Verein" value={club.clubName} />
                <MetricBox label="Nummer" value={club.clubNumber} />
                <MetricBox label="Status" value={definitiveSubmitted ? 'definitiv angemeldet' : 'in Bearbeitung'} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  ['Verein', club.clubName],
                  ['Vereinsnummer', club.clubNumber],
                  ['Kontaktperson', 'Martin Muster'],
                  ['E-Mail', 'verein@musterdorf.ch'],
                  ['Telefon', '+41 79 000 00 00'],
                  ['Adresse', 'Dorfplatz 1, 9999 Musterdorf'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: 13, color: '#5a6878', marginBottom: 6, fontWeight: 800 }}>{label}</div>
                    <input defaultValue={value} style={{ width: '100%', borderRadius: 10, padding: '12px 14px' }} />
                  </div>
                ))}
              </div>
            </Card>
          </AppSection>
        )}

        {activeTab === 'Schützen' && (
          <AppSection title="Schützen" text="Alle erfassten Schützen bleiben übersichtlich auf einer Liste mit Lizenz, Kategorie, Bon und Gruppenzuteilung.">
            <Card title="Schützen">
              <div style={{ ...responsiveThree, marginBottom: 14 }}>
                <MetricBox label="Erfasste Schützen" value={shooters.length} />
                <MetricBox label="Gruppen" value={shooters.filter((row) => row.group).length ? 'vorhanden' : 'offen'} />
                <MetricBox label="Bon" value="Verein / bar" />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {shooters.map((row) => (
                  <div key={row.license} style={{ display: 'grid', gridTemplateColumns: '0.55fr 1.4fr 0.7fr 0.7fr 0.9fr 1fr 1fr', gap: 12, border: '1px solid #d7dee7', borderRadius: 8, padding: 14, alignItems: 'center', background: '#fbfcfe' }}>
                    <div><input type="checkbox" defaultChecked={row.selected} /></div>
                    <div><div style={{ fontWeight: 900 }}>{row.name}</div><div style={{ color: '#5a6878', fontSize: 13 }}>{row.license}</div></div>
                    <div>{row.year}</div>
                    <div>{row.category}</div>
                    <div>{row.bon ? 'Vereins-Bon' : 'bar'}</div>
                    <div>{row.group || 'keine Gruppe'}</div>
                    <div style={{ color: '#5a6878' }}>Aus SAT-Admin übernommen</div>
                  </div>
                ))}
              </div>
            </Card>
          </AppSection>
        )}

        {activeTab === 'Rangierung' && (
          <AppSection title="Rangierung" text="Je nach Anlass wählen Sie direkt einen freien Slot oder erfassen einen Wunsch für die spätere Zuteilung.">
            <div style={{ display: 'grid', gap: 16 }}>
              <Card title="Status und Rückmeldung">
                <div style={responsiveFour}>
                  <MetricBox label="Status Verein" value={clubStatus} />
                  <MetricBox label="Status Veranstalter" value={organiserStatus} />
                  <MetricBox label="Freie Slots" value={selectableSlots.length} />
                  <MetricBox label="Gemeinsame Einteilung" value="möglich" />
                </div>
                <div style={{ ...responsiveThree, marginTop: 12 }}>
                  <MetricBox label="Gewählter Slot" value={selectedSlot || 'noch nicht gewählt'} />
                  <MetricBox label="Gemeinsam mit Verein" value="berücksichtigen" />
                  <MetricBox label="Weiter in Haupt-App" value="Zuteilung & Zeitplan" />
                </div>
                <div style={{ ...responsiveFour, marginTop: 12 }}>
                  <MetricBox label="1. Verein" value="Wunsch erfassen" />
                  <MetricBox label="2. Kontrolle" value="definitiv anmelden" />
                  <MetricBox label="3. Veranstalter" value="Slot zuteilen" />
                  <MetricBox label="4. Haupt-App" value="Zeitplan führen" />
                </div>
              </Card>

              <SplitGrid>
                <Card title="Rangierung">
                  <div style={{ display: 'grid', gap: 10, lineHeight: 1.85 }}>
                    <div><strong>Modus:</strong> {event.rankingMode}</div>
                    <div><strong>Schützenhaus:</strong> {event.clubhouse}</div>
                    <div><strong>Ort:</strong> {event.place}</div>
                    <div><strong>Scheiben:</strong> {event.targets}</div>
                    <div><strong>Status Verein:</strong> {clubStatus}</div>
                  </div>

                  {event.rankingMode === 'Keine Schiesszeit' && (
                    <div style={{ marginTop: 16 }}>
                      <SubtlePanel>
                        <strong>Für diesen Anlass ist keine Schiesszeit-Angabe erforderlich.</strong>
                        <div style={{ color: '#5a6878', marginTop: 6 }}>Die definitive Einteilung erfolgt später in der Haupt-App durch den Veranstalter.</div>
                      </SubtlePanel>
                    </div>
                  )}

                  {event.rankingMode === 'Schiesszeit nach Wunsch' && (
                    <div style={{ ...fieldGrid, marginTop: 16 }}>
                      <input placeholder="Gewünschter Schiesstag" style={{ borderRadius: 10, padding: '12px 14px' }} />
                      <input placeholder="Gewünschtes Zeitfenster" style={{ borderRadius: 10, padding: '12px 14px' }} />
                      <input placeholder="Alternativ-Zeitfenster" style={{ borderRadius: 10, padding: '12px 14px' }} />
                      <label><input type="checkbox" defaultChecked /> Flexibel bei der Einteilung</label>
                      <label><input type="checkbox" defaultChecked /> Gemeinsam mit Gruppe / Verein</label>
                      <textarea placeholder="Bemerkung" rows={4} style={{ borderRadius: 10, padding: '12px 14px' }} />
                      <div style={sectionNote}>Die definitive Schiesszeit wird durch den Veranstalter zugeteilt.</div>
                    </div>
                  )}

                  {(event.rankingMode === 'Fixe Schiesszeiten' || event.rankingMode === 'Freie Schiesszeiten auswählen') && (
                    <div style={{ marginTop: 16, color: '#5a6878', lineHeight: 1.8 }}>
                      {event.rankingMode === 'Fixe Schiesszeiten'
                        ? 'Freie Slots können direkt gewählt werden. Volle oder gesperrte Slots bleiben sichtbar, aber nicht wählbar.'
                        : 'Es werden nur freie Slots direkt zur Auswahl angezeigt. Belegte oder gesperrte Slots bleiben nicht wählbar.'}
                    </div>
                  )}

                  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
                    <MetricBox label="Modus" value={event.rankingMode} />
                    <MetricBox label="Freie Slots" value={selectableSlots.length} />
                    <MetricBox label="Direkte Wahl" value={event.rankingMode === 'Schiesszeit nach Wunsch' || event.rankingMode === 'Keine Schiesszeit' ? 'nicht direkt' : 'möglich'} />
                  </div>

                  <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <Badge>Keine Schiesszeit erforderlich</Badge>
                      <Badge>Wunsch gespeichert</Badge>
                      <Badge>Schiesszeit gewählt</Badge>
                      <Badge>Schiesszeit zugeteilt</Badge>
                      <Badge>Schiesszeit geändert</Badge>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
                      <MetricBox label="Status Verein" value={clubStatus} />
                      <MetricBox label="Status Veranstalter" value={organiserStatus} />
                      <MetricBox label="Gewählter Slot" value={selectedSlot || 'noch offen'} />
                    </div>
                  </div>
                </Card>

                <Card title="Freie Schiesszeiten">
                  <div style={{ display: 'grid', gap: 10 }}>
                    {eventSlots.map((slot) => {
                      const selectable = slot.status === 'frei' || slot.status === 'wenig frei'
                      const key = `${slot.date}-${slot.time}`
                      return (
                        <button key={key} disabled={!selectable || event.rankingMode === 'Keine Schiesszeit' || event.rankingMode === 'Schiesszeit nach Wunsch'} onClick={() => setSelectedSlot(key)} style={{ textAlign: 'left', border: selectedSlot === key ? '1px solid #355f9b' : '1px solid #d8dee6', borderRadius: 10, padding: 14, background: selectedSlot === key ? '#eef4ff' : '#fbfcfe', opacity: selectable ? 1 : 0.62, cursor: selectable ? 'pointer' : 'default' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                            <div>
                              <div style={{ fontWeight: 900 }}>{slot.date}</div>
                              <div>{slot.time}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 800 }}>{slot.stand}</div>
                              <div style={{ color: '#5a6878' }}>{slot.status}</div>
                            </div>
                          </div>
                          <CapacityBar free={slot.free} total={slot.total} />
                        </button>
                      )
                    })}
                  </div>
                </Card>
              </SplitGrid>
            </div>
          </AppSection>
        )}

        {activeTab === 'Gruppeneinteilung' && (
          <AppSection title="Gruppeneinteilung" text="Gruppen und gemeinsames Schiessen bleiben einfach verständlich und werden nach der definitiven Anmeldung in die Haupt-App weitergegeben.">
            <div style={{ display: 'grid', gap: 16 }}>
              <Card title="Gruppen und Rangierung">
                <div style={responsiveFour}>
                  <MetricBox label="Gemeinsam schiessen" value="berücksichtigen" />
                  <MetricBox label="Wunschslot" value={selectedSlot || 'nach Wunsch'} />
                  <MetricBox label="Weitergabe" value="an Haupt-App" />
                  <MetricBox label="Reihenfolge" value="durch Veranstalter" />
                </div>
              </Card>
              <SplitGrid>
                <Card title="Gruppeneinteilung">
                  <div style={{ display: 'grid', gap: 8, lineHeight: 1.8 }}>
                    <div><strong>Gruppe A:</strong> Anna Muster, Peter Frei</div>
                    <div><strong>Gruppe B:</strong> noch offen</div>
                    <div><strong>Ohne Gruppe:</strong> Sara Keller</div>
                  </div>
                </Card>
                <Card title="Hinweis">
                  <p style={{ margin: 0, lineHeight: 1.8, color: '#5a6878' }}>Gruppen, gemeinsames Schiessen und Reihenfolge können bis zum Anmeldeschluss ergänzt oder angepasst werden.</p>
                </Card>
              </SplitGrid>
            </div>
          </AppSection>
        )}

        {activeTab === 'Kontrolle' && (
          <div style={responsiveTwo}>
            <Card title="Kontrolle">
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  ['Vereinsangaben', 'vollständig'],
                  ['Schützen', '3 aktiv'],
                  ['Gruppeneinteilung', 'optional offen'],
                  ['Rangierung', clubStatus],
                  ['Definitive Anmeldung', definitiveSubmitted ? 'übergeben' : 'bereit'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 0', ...softDivider }}>
                    <strong>{label}</strong><span>{value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Übergabe in die Haupt-App">
              <div style={{ display: 'grid', gap: 10, lineHeight: 1.8 }}>
                <div>Übernommen werden: Vereinsdaten, Schützen, Gruppen, Bon und Rangierung / Schiesszeit.</div>
                <div>Zusätzlich mitgegeben werden: Wunschslot, Alternativwunsch, flexibel, gemeinsame Einteilung und Bemerkung.</div>
                <div>Die definitive Einteilung mit Reihenfolge, Slot-Zuteilung, Stand und Scheibe erfolgt danach in der Haupt-App.</div>
                <div>Der Veranstalter arbeitet dort mit Eingangsrang, Schiesszeit-Zuteilung und Zeitplan weiter.</div>
                <div>Nach Anmeldeschluss sind Änderungen nur noch in der Haupt-App möglich.</div>
                <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}>
                  <div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Weitergabe</div>
                  <div style={{ fontWeight: 900 }}>Verein · Schützen · Gruppen · Wunschslot · Bon · Bemerkung</div>
                </div>
                <div style={{ ...responsiveThree, marginTop: 6 }}>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Status Verein</div><div style={{ fontWeight: 900 }}>{clubStatus}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Status Veranstalter</div><div style={{ fontWeight: 900 }}>{organiserStatus}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Gewählter Slot</div><div style={{ fontWeight: 900 }}>{selectedSlot || 'nach Wunsch / offen'}</div></div>
                </div>
                <div style={{ ...responsiveThree, marginTop: 6 }}>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Wunsch</div><div style={{ fontWeight: 900 }}>{event.rankingMode === 'Keine Schiesszeit' ? 'nicht nötig' : selectedSlot || 'erfasst / offen'}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Alternative</div><div style={{ fontWeight: 900 }}>{event.rankingMode === 'Schiesszeit nach Wunsch' ? 'möglich' : 'optional'}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Flexibel</div><div style={{ fontWeight: 900 }}>{event.rankingMode === 'Keine Schiesszeit' ? 'nicht nötig' : 'ja / nein'}</div></div>
                </div>
                <div style={{ ...responsiveThree, marginTop: 6 }}>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Eingangsrang</div><div style={{ fontWeight: 900 }}>{definitiveSubmitted ? 'definitiv gesetzt' : 'nach definitiver Anmeldung'}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Schiesszeit-Zuteilung</div><div style={{ fontWeight: 900 }}>{event.rankingMode === 'Keine Schiesszeit' ? 'nicht nötig' : 'durch Veranstalter'}</div></div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px solid #d8dee6', background: '#fbfcfe' }}><div style={{ fontSize: 12, color: '#5a6878', fontWeight: 800, marginBottom: 6 }}>Zeitplan</div><div style={{ fontWeight: 900 }}>Tag · Reihenfolge · Stand / Scheibe</div></div>
                </div>
                <button onClick={() => setDefinitiveSubmitted(true)} style={{ borderRadius: 12, padding: '12px 16px', fontWeight: 800, color: '#fff', background: 'linear-gradient(180deg, #aa2b23, #8f1b18)', border: '1px solid #8f1b18', width: 'fit-content' }}>{definitiveSubmitted ? 'Definitiv angemeldet' : 'Definitiv anmelden'}</button>
              </div>
            </Card>
          </div>
        )}
      </Content>
    </Shell>
  )
}
