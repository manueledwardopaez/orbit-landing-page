export default function SectionBadge({ label }: { label: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255,255,255,0.04)',
      padding: '6px 14px 6px 8px',
    }}>
      <div className="badge-dot-outer" style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: '#00c8ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#060d1b' }} />
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}
