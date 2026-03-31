export type EventItem = {
  id: string
  title: string
  date: string
  place: string
  clubhouse: string
  address: string
  deadline: string
  registrationOpen: string
  rankingMode: 'Keine Schiesszeit' | 'Fixe Schiesszeiten' | 'Schiesszeit nach Wunsch' | 'Freie Schiesszeiten auswählen'
  freeSlotsText: string
  targets: number
  activeForRegistration: boolean
  note: string
}

export type SlotItem = {
  eventId: string
  date: string
  time: string
  stand: string
  free: number
  total: number
  status: 'frei' | 'wenig frei' | 'voll' | 'gesperrt'
}

export type ShooterItem = {
  name: string
  license: string
  year: string
  category: string
  selected: boolean
  bon: boolean
  group: string
}

export const events: EventItem[] = [
  {
    id: 'alp-2026',
    title: 'Karabiner- und Stgw-Tag Alpenblick 2026',
    date: '06.06.2026 bis 07.06.2026',
    place: 'Alpenblick',
    clubhouse: 'Schützenhaus Alpenblick',
    address: 'Bergweg 11, 9444 Alpenblick',
    deadline: '24.05.2026',
    registrationOpen: '01.04.2026',
    rankingMode: 'Fixe Schiesszeiten',
    freeSlotsText: 'freie Slots direkt wählbar',
    targets: 10,
    activeForRegistration: true,
    note: 'Freie Slots können direkt gewählt werden. Volle oder gesperrte Zeiten bleiben gesperrt.',
  },
  {
    id: 'tal-2026',
    title: 'Freundschaftsschiessen Bergtal 2026',
    date: '27.06.2026',
    place: 'Bergtal',
    clubhouse: 'Schützenhaus Bergtal',
    address: 'Schützenrain 2, 9555 Bergtal',
    deadline: '15.06.2026',
    registrationOpen: '10.04.2026',
    rankingMode: 'Keine Schiesszeit',
    freeSlotsText: 'keine Zeitwahl nötig',
    targets: 8,
    activeForRegistration: true,
    note: 'Für diesen Anlass ist keine Schiesszeit-Angabe erforderlich.',
  },
  {
    id: 'fsm-2026',
    title: 'Frühlingsschiessen Musterdorf 2026',
    date: '13.06.2026 bis 15.06.2026',
    place: 'Musterdorf',
    clubhouse: 'Schützenhaus Musterdorf',
    address: 'Schützenweg 4, 9999 Musterdorf',
    deadline: '31.05.2026',
    registrationOpen: '01.04.2026',
    rankingMode: 'Freie Schiesszeiten auswählen',
    freeSlotsText: '10 freie Plätze',
    targets: 6,
    activeForRegistration: true,
    note: 'Die Anmeldung kann bis zum Anmeldeschluss angepasst werden.',
  },
  {
    id: 'jub-2026',
    title: 'Jubiläumsschiessen Beispielhausen',
    date: '21.06.2026',
    place: 'Beispielhausen',
    clubhouse: 'Schützenhaus Beispielhausen',
    address: 'Standstrasse 8, 8888 Beispielhausen',
    deadline: '05.06.2026',
    registrationOpen: '05.04.2026',
    rankingMode: 'Schiesszeit nach Wunsch',
    freeSlotsText: 'Wunschzeiten möglich',
    targets: 8,
    activeForRegistration: true,
    note: 'Die definitive Schiesszeit wird durch den Veranstalter zugeteilt.',
  },
]

export const linkedClubs = [
  { clubNumber: '3001', licenseNumber: '300.100.200', clubName: 'SG Musterdorf' },
  { clubNumber: '3109', licenseNumber: '300.100.200', clubName: 'FSG Talblick' },
]

export const shooters: ShooterItem[] = [
  { name: 'Anna Muster', license: '300.100.200', year: '1994', category: 'E', selected: true, bon: true, group: 'Gruppe A' },
  { name: 'Peter Frei', license: '300.100.201', year: '1988', category: 'E', selected: true, bon: true, group: 'Gruppe A' },
  { name: 'Luca Baumann', license: '300.100.202', year: '1972', category: 'V', selected: false, bon: false, group: '' },
  { name: 'Sara Keller', license: '300.100.203', year: '2001', category: 'E', selected: true, bon: true, group: '' },
]

export const slots: SlotItem[] = [
  { eventId: 'alp-2026', date: 'Samstag, 06.06.2026', time: '08:00–08:30', free: 3, total: 10, stand: 'Scheibenblock A', status: 'frei' },
  { eventId: 'alp-2026', date: 'Samstag, 06.06.2026', time: '08:30–09:00', free: 1, total: 10, stand: 'Scheibenblock A', status: 'wenig frei' },
  { eventId: 'alp-2026', date: 'Samstag, 06.06.2026', time: '09:00–09:30', free: 0, total: 10, stand: 'Scheibenblock A', status: 'voll' },
  { eventId: 'alp-2026', date: 'Samstag, 06.06.2026', time: '09:30–10:00', free: 0, total: 10, stand: 'Scheibenblock B', status: 'gesperrt' },
  { eventId: 'tal-2026', date: 'Samstag, 27.06.2026', time: '09:00–09:30', free: 8, total: 8, stand: 'Schützenhaus Bergtal', status: 'frei' },
  { eventId: 'fsm-2026', date: 'Samstag, 13.06.2026', time: '08:00–08:30', free: 4, total: 6, stand: 'Schützenhaus Musterdorf', status: 'frei' },
  { eventId: 'fsm-2026', date: 'Samstag, 13.06.2026', time: '08:30–09:00', free: 1, total: 6, stand: 'Schützenhaus Musterdorf', status: 'wenig frei' },
  { eventId: 'fsm-2026', date: 'Samstag, 13.06.2026', time: '09:00–09:30', free: 0, total: 6, stand: 'Schützenhaus Musterdorf', status: 'voll' },
  { eventId: 'fsm-2026', date: 'Sonntag, 14.06.2026', time: '09:30–10:00', free: 6, total: 6, stand: 'Schützenhaus Musterdorf', status: 'frei' },
  { eventId: 'jub-2026', date: 'Samstag, 21.06.2026', time: '09:00–09:30', free: 8, total: 8, stand: 'Schützenhaus Beispielhausen', status: 'frei' },
  { eventId: 'jub-2026', date: 'Samstag, 21.06.2026', time: '09:30–10:00', free: 5, total: 8, stand: 'Schützenhaus Beispielhausen', status: 'frei' },
]

export function getEvent(id: string) {
  return events.find((entry) => entry.id === id) ?? events[0]
}

export function getSlotsByEvent(id: string) {
  return slots.filter((entry) => entry.eventId === id)
}
