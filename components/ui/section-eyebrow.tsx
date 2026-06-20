import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionEyebrow({ index, label, className }: SectionEyebrowProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-3 font-mono text-xs text-muted", className)}>
      <span className="text-primary">{`// ${index}`}</span>
      <span className="h-px flex-1 max-w-[40px] bg-border" />
      <span className="uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}
