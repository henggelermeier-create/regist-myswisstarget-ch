import { linkedClubs } from '@/components/data'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { clubNumber?: string; licenseNumber?: string }
  const club = linkedClubs.find((entry) => entry.clubNumber === body.clubNumber && entry.licenseNumber === body.licenseNumber)
  if (!club) {
    return Response.json({ ok: false, message: 'Die Vereinsnummer oder die Lizenznummer passt nicht zu einem berechtigten Verein.' }, { status: 400 })
  }
  return Response.json({ ok: true, club })
}
