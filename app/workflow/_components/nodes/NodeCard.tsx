"use client";

import { cn } from "@/lib/utils";

function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
}

export default NodeCard;
