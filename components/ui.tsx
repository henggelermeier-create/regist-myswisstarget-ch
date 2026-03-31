import React from "react"
import Image from "next/image"

export const palette = {
  bg: '#f4f6f8',
  surface: '#ffffff',
  surfaceSoft: '#f8fafc',
  line: '#d7dee7',
  text: '#182434',
  sub: '#607083',
  title: '#122033',
  red: '#9d1f20',
  redDark: '#7d1718',
  blue: '#294d85',
  shadow: '0 8px 18px rgba(15, 23, 42, 0.032)',
}

const containerWidth = { maxWidth: 1280, margin: '0 auto' } as const

const shellBg: React.CSSProperties = {
  minHeight: '100vh',
  color: palette.text,
  background: 'linear-gradient(180deg, #f7f9fb 0%, #f2f5f8 100%)',
}

const panel: React.CSSProperties = {
  background: palette.surface,
  border: `1px solid ${palette.line}`,
  borderRadius: 10,
  boxShadow: '0 6px 16px rgba(15, 23, 42, 0.03)',
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={shellBg}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.965), rgba(244,247,250,0.995)), url(/hero-shooting.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.09,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </main>
  )
}

export function Topbar() {
  const nav = ['Übersicht', 'Vereinsangaben', 'Schützen', 'Rangierung', 'Gruppeneinteilung', 'Kontrolle']
  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ ...containerWidth, ...panel, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: '#fff', border: `1px solid ${palette.line}`, display: 'grid', placeItems: 'center', boxShadow: '0 4px 10px rgba(15,23,42,0.028)' }}>
              <Image src="/logo-icon.png" alt="SwissTarget" width={34} height={34} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: palette.title }}>mySwissTarget.ch</div>
              <div style={{ color: palette.sub, fontSize: 13 }}>Registrierung und Vereinsanmeldung für Schweizer Schiessanlässe</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ padding: '7px 10px', borderRadius: 999, background: '#f8fafc', border: `1px solid ${palette.line}`, fontWeight: 700, color: '#33455c', fontSize: 11.5 }}>Karabiner · Stgw 90 · Stgw 57</span>
            <a href="/" style={{ textDecoration: 'none', borderRadius: 9, padding: '10px 12px', fontWeight: 700, background: '#fff', color: palette.text, border: `1px solid ${palette.line}` }}>Zum Start</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 16px 12px', borderTop: `1px solid ${palette.line}`, background: '#fafbfd' }}>
          {nav.map((item) => (
            <div key={item} style={{ padding: '8px 11px', fontWeight: 700, color: '#314155', borderRadius: 10, border: `1px solid ${palette.line}`, background: '#ffffff' }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero({ eyebrow, title, text, actions }: { eyebrow: string; title: string; text: string; actions?: React.ReactNode }) {
  return (
    <section style={{ padding: '10px 20px 0' }}>
      <div style={{ ...containerWidth, ...panel, overflow: 'hidden', minHeight: 140, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, rgba(249,251,253,0.985) 0%, rgba(249,251,253,0.96) 48%, rgba(249,251,253,0.88) 70%, rgba(249,251,253,0.62) 100%), url(/rifle-shooting.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', padding: '20px 22px', maxWidth: 760 }}>
          <div style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 12, background: '#fff', border: `1px solid ${palette.line}`, fontWeight: 700, color: palette.blue, fontSize: 12, marginBottom: 12 }}>{eyebrow}</div>
          <h1 style={{ margin: 0, fontSize: 27, lineHeight: 1.12, color: palette.title }}>{title}</h1>
          <p style={{ maxWidth: 700, lineHeight: 1.62, color: '#4b5b6d', marginBottom: actions ? 14 : 0, fontSize: 14.5 }}>{text}</p>
          {actions}
        </div>
      </div>
    </section>
  )
}

export function Content({ children }: { children: React.ReactNode }) {
  return <section style={{ ...containerWidth, padding: '20px 20px 36px', position: 'relative', display: 'grid', gap: 18 }}>{children}</section>
}

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ ...panel, padding: 18 }}>
      {title ? <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${palette.line}`, color: palette.title }}>{title}</div> : null}
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 800, color: palette.sub, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>{children}</div>
}

export function SplitGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, alignItems: 'start' }}>{children}</div>
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 10, background: '#fff', color: palette.blue, fontWeight: 800, fontSize: 12, border: `1px solid ${palette.line}` }}>{children}</span>
}

export function InfoGrid({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {items.map(([label, value]) => (
        <div key={label} style={{ background: '#fafbfd', border: `1px solid ${palette.line}`, borderRadius: 10, padding: 15 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: palette.sub, marginBottom: 6 }}>{label}</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: palette.title }}>{value}</div>
        </div>
      ))}
    </div>
  )
}




export function SectionBlock({ title, text, children }: { title: string; text?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: palette.title }}>{title}</div>
        {text ? <div style={{ color: palette.sub, lineHeight: 1.6, marginTop: 4, fontSize: 14 }}>{text}</div> : null}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>{children}</div>
    </div>
  )
}

export function AppSection({ title, text, children }: { title: string; text?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: palette.title, marginBottom: text ? 6 : 0 }}>{title}</div>
        {text ? <div style={{ color: palette.sub, lineHeight: 1.6 }}>{text}</div> : null}
      </div>
      {children}
    </div>
  )
}

export function SubtlePanel({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#fafbfd', border: `1px solid ${palette.line}`, borderRadius: 10, padding: 16 }}>{children}</div>
}

export function Tabs({ items, active, onChange }: { items: string[]; active: string; onChange: (value: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
      {items.map((item) => {
        const activeItem = item === active
        return (
          <button key={item} onClick={() => onChange(item)} style={{ cursor: 'pointer', borderRadius: 10, padding: '10px 12px', fontWeight: 700, background: activeItem ? '#1f3b63' : '#ffffff', color: activeItem ? '#fff' : palette.text, border: `1px solid ${activeItem ? '#1f3b63' : palette.line}`, boxShadow: 'none' }}>
            {item}
          </button>
        )
      })}
    </div>
  )
}

export function CapacityBar({ free, total }: { free: number; total: number }) {
  const used = Math.max(0, total - free)
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${total}, minmax(0,1fr))`, gap: 5, marginBottom: 8 }}>
        {Array.from({ length: total }).map((_, i) => {
          const isFree = i >= used
          return <div key={i} style={{ height: 12, borderRadius: 999, background: isFree ? '#2cab64' : '#d6dee8', border: '1px solid #c9d4df' }} />
        })}
      </div>
      <div style={{ color: palette.sub, fontSize: 13 }}>{free} von {total} Scheiben frei</div>
    </div>
  )
}

export function ActionButton({ children, primary = false, href }: { children: React.ReactNode; primary?: boolean; href?: string }) {
  const style: React.CSSProperties = { display: 'inline-block', textDecoration: 'none', borderRadius: 10, padding: '11px 16px', fontWeight: 700, background: primary ? palette.red : '#fff', color: primary ? '#fff' : palette.text, border: `1px solid ${primary ? palette.redDark : palette.line}`, boxShadow: 'none' }
  if (href) return <a href={href} style={style}>{children}</a>
  return <button style={{ ...style, cursor: 'pointer' }}>{children}</button>
}
