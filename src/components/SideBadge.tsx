export default function SideBadge() {
  return (
    <aside
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center bg-[#121212]/90 backdrop-blur-md border-l border-t border-b border-neutral-800 py-6 px-2.5 rounded-l-md shadow-2xl select-none"
      data-purpose="side-badge"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3">
        IDN
      </span>
      <span className="vertical-badge font-mono text-[10px] uppercase tracking-widest text-neutral-500 py-3 border-y border-neutral-800">
        ARCHITECT 2025
      </span>
      <span className="font-mono text-[9px] text-emerald-400 mt-3 animate-pulse">
        ● UTC+7
      </span>
    </aside>
  );
}
