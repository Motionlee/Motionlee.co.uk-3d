export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25">
        <span className="font-display text-[15px] font-bold leading-none">M</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lime" />
      </span>
      <span className="font-display text-[19px] font-bold tracking-tight">Motionlee</span>
    </span>
  );
}
