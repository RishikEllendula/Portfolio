import type { ProjectArchitecture } from "@/types";

interface ArchitectureDiagramProps {
  architecture?: ProjectArchitecture;
}

const defaultArchitecture: ProjectArchitecture = {
  nodes: [
    { label: "Client Web App\n(User Interface)", x: 30, y: 40 },
    { label: "Backend API\n(Services)", x: 230, y: 40 },
    { label: "Database\n(Primary Store)", x: 430, y: 40 },
    { label: "Cache / Session\n(Memory Store)", x: 230, y: 130 },
    { label: "Cloud Services\n(External APIs)", x: 430, y: 130 },
  ],
  connections: [
    { path: "M170,63 H220" },
    { path: "M370,63 H420" },
    { path: "M300,86 V120" },
    { path: "M370,68 C390,85 400,105 420,150" },
  ],
  flowDescription: "Request flow: client application → backend services (cache & authentication) → database / storage layers",
};

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  const { nodes, connections, flowDescription } = architecture || defaultArchitecture;

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface/60 p-4">
      <svg viewBox="0 0 600 200" className="h-auto w-full min-w-[560px]" role="img" aria-label="System architecture diagram">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--muted))" />
          </marker>
        </defs>

        {/* connections */}
        <g stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          {connections.map((conn, idx) => (
            <path key={idx} d={conn.path} />
          ))}
        </g>

        {nodes.map((node) => (
          <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width="140"
              height="46"
              rx="8"
              fill="hsl(var(--surface))"
              stroke="hsl(var(--primary) / 0.35)"
              strokeWidth="1"
            />
            {node.label.split("\n").map((line, i) => (
              <text
                key={line}
                x="70"
                y={20 + i * 14}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="ui-monospace, monospace"
                fill="hsl(var(--foreground))"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
      <p className="mt-3 px-1 font-mono text-[11px] text-muted">
        {flowDescription}
      </p>
    </div>
  );
}

