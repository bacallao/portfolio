"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import {
  GitBranch,
  Bell,
  SeparatorVertical,
  RefreshCcw,
  CircleX,
  TriangleAlert,
  Braces,
  CheckCheck,
} from "lucide-react";

type EditorFooterProps = {
  className?: string;
  branch?: string;
  showModifiedStar?: boolean;
  errors?: number;
  warnings?: number;
  line?: number;
  column?: number;
  spaces?: number;
  encoding?: string; // e.g. "UTF-8"
  eol?: string; // e.g. "LF"
  language?: string; // e.g. "TypeScript JSX"
  prettier?: boolean;
};

export function EditorFooter({
  className,
  branch = "main",
  showModifiedStar = true,
  errors = 0,
  warnings = 0,
  line = 0,
  column = 0,
  spaces = 1,
  encoding = "UTF-8",
  eol = "LF",
  language = "TypeScript JSX",
  prettier = true,
}: EditorFooterProps) {
  return (
    <div
      className={cn(
        // Opaque background so underlying content doesn't show through
        "w-full bg-background text-[11px] text-gray-600 border-t",
        "flex items-center h-7 select-none pr-3",
        "",
        className
      )}
      aria-label="Editor status bar"
    >
      {/* Left cluster */}
      <div className="flex items-center gap-3 min-w-0 h-full">
        {/* Celest background behind the separator icon */}
        <BarItem className="bg-sky-100/80 text-gray-600 px-3">
          <SeparatorVertical className="h-3.5 w-3.5" />
        </BarItem>

        {/* Branch + star + refresh */}
        <BarItem>
          <GitBranch className="h-3.5 w-3.5" />
          <span className="truncate max-w-[18ch]">{branch}{showModifiedStar ? " *" : ""}</span>
          <RefreshCcw className="h-3.5 w-3.5" />
        </BarItem>

        {/* Errors and Warnings */}
        <BarItem>
          <CircleX className="h-3.5 w-3.5" />
          <span>{errors}</span>
          <TriangleAlert className="h-3.5 w-3.5 ml-2" />
          <span>{warnings}</span>
        </BarItem>
      </div>

      {/* Right cluster */}
      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-3 h-full">
        <BarItem>
          <span>Cursor Tab</span>
        </BarItem>
        <BarItem>
          <span>
            {`Ln ${line}, Col ${column}`}
          </span>
        </BarItem>
        <BarItem>
          <span>{`Spaces: ${spaces}`}</span>
        </BarItem>
        <BarItem>
          <span>{encoding}</span>
        </BarItem>
        <BarItem>
          <span>{eol}</span>
        </BarItem>
        <BarItem>
          <Braces className="h-3.5 w-3.5 mr-1" />
          <span>{language}</span>
        </BarItem>
        <BarItem>
          <CheckCheck className="h-3.5 w-3.5 mr-1" />
          <span>{prettier ? "Prettier" : "Formatter Off"}</span>
        </BarItem>
        <BarItem>
          <Bell className="h-3.5 w-3.5" />
        </BarItem>
      </div>
    </div>
  );
}

function BarItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 h-full hover:bg-muted/40 hover:cursor-pointer whitespace-nowrap select-none px-1", className)}>
      {children}
    </span>
  );
}

export default EditorFooter;


