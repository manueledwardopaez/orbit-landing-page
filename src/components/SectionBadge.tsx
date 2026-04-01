export default function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.04)] py-[6px] pr-[14px] pl-[8px] rounded-lg">
      <div className="badge-dot-outer flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#00c8ff]">
        <div className="h-[6px] w-[6px] rounded-full bg-[#060d1b]" />
      </div>
      <span className="font-['DM_Sans',sans-serif] text-[11px] font-semibold uppercase tracking-[2.5px] text-[rgba(255,255,255,0.55)]">
        {label}
      </span>
    </div>
  );
}

