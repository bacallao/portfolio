"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import {
  SquareTerminal,
  Plus,
  ChevronDown,
  Columns2,
  Trash2,
  Ellipsis,
  ChevronUp,
  X as XIcon,
} from "lucide-react";

type TerminalTab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type CursorTerminalProps = {
  className?: string;
  /** Optional tabs to render at the top (e.g., Problems, Output, Terminal, Ports) */
  tabs?: TerminalTab[];
  /** Which tab is active by id */
  activeTabId?: string;
  /** Called when a tab is clicked */
  onTabChange?: (id: string) => void;
  /** Optional right-side actions area (e.g., split, clear, kebab menu) */
  actions?: React.ReactNode;
  /** Terminal content. Provide lines or arbitrary children. */
  children?: React.ReactNode;
  /** Show subtle top divider like Cursor console */
  withTopDivider?: boolean;
  /** Optional footer area (status bar) */
  footer?: React.ReactNode;
  /** Caret style shown in the placeholder prompt */
  caretStyle?: "block" | "squiggle";
  /** Whether the caret blinks */
  caretBlink?: boolean;
};

/**
 * CursorTerminal mimics Cursor's console/terminal panel chrome.
 * It focuses on accurate spacing, separators and colors using Tailwind + your theme tokens.
 */
export function CursorTerminal({
  className,
  tabs = [
    { id: "problems", label: "Problems" },
    { id: "output", label: "Output" },
    { id: "debug", label: "Debug Console" },
    { id: "terminal", label: "Terminal" },
    { id: "ports", label: "Ports" },
  ],
  activeTabId = "terminal",
  onTabChange,
  actions,
  children,
  withTopDivider = true,
  footer,
  caretStyle = "block",
  caretBlink = true,
}: CursorTerminalProps) {
  return (
    <div
      className={cn(
        "border-x border-t border border-neutral-800 bg-[#0d1117] text-muted-foreground",
        "flex h-[160px] min-h-[110px] flex-col overflow-hidden",
        className
      )}
    >
      {/* Titlebar / Tabs */}
      <div
        className={cn(
          "flex items-center gap-2 px-3",
          withTopDivider ? "border-b border border-neutral-800" : null,
          "bg-[#0d1117]"
        )}
      >
        {/* Tabs */}
        <div className="flex items-center gap-1 py-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "group relative inline-flex items-center gap-1 px-2.5 py-1.5 text-xs",
                  "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100",
                  isActive && "bg-neutral-800 text-neutral-100 hover:bg-neutral-800"
                )}
              >
                {tab.icon ? <span className="size-3.5 text-neutral-400">{tab.icon}</span> : null}
                <span className="select-none">{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Right controls extend to the end */}
        <div className="ml-auto flex items-center gap-1 py-2">
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs text-muted-foreground hover:bg-muted/40 cursor-pointer"
          >
            <SquareTerminal className="size-4 text-neutral-400" />
            <span className="select-none">zsh</span>
          </button>
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground hover:bg-muted/40 cursor-pointer"
            aria-label="New terminal"
          >
            <Plus className="size-4 text-neutral-400" />
            <ChevronDown className="size-3.5 text-neutral-400" />
          </button>
          <IconButton ariaLabel="Split">
            <Columns2 className="size-4 text-neutral-400" />
          </IconButton>
          <IconButton ariaLabel="Clear">
            <Trash2 className="size-4 text-neutral-400" />
          </IconButton>
          <IconButton ariaLabel="More">
            <Ellipsis className="size-4 text-neutral-400" />
          </IconButton>
          <IconButton ariaLabel="Collapse">
            <ChevronUp className="size-4 text-neutral-400" />
          </IconButton>
          <IconButton ariaLabel="Close">
            <XIcon className="size-4 text-neutral-400" />
          </IconButton>
          {actions}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative flex min-h-0 flex-1">
        {/* Scrollable content area */}
        <div className="min-w-0 flex-1 overflow-auto bg-[#0d1117]">
          <div className="px-4 py-3 text-xs leading-relaxed">
            {children ?? (
              <PlaceholderOutput
                caretStyle={caretStyle}
                caretBlink={caretBlink}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer / Status bar */}
      <div className="bg-[#0d1117] text-[11px] text-muted-foreground border-t border-neutral-800">
        {footer ?? (
          <div className="flex items-center justify-center">
            <span>cursor agent to run Agent • ⌘K to generate command</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceholderOutput({
  caretStyle,
  caretBlink,
}: {
  caretStyle: "block" | "squiggle";
  caretBlink: boolean;
}) {
  return (
    <div className="text-muted-foreground flex items-center">
      <span
        className="inline-block mr-1"
        style={{
          width: "0.7em",
          height: "0.7em",
          borderRadius: "9999px",
          border: "2.5px solid currentColor",
          borderColor: "currentColor",
          boxSizing: "border-box",
        }}
      />
      <span className="leading-none">Metrica@MacBook-Pro project % </span>
      {caretStyle === "squiggle" ? (
        <SquiggleCaret blinking={caretBlink} />
      ) : (
        <BlockCaret blinking={caretBlink} />
      )}
    </div>
  );
}

export default CursorTerminal;

function IconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-foreground/90 hover:bg-muted/40"
    >
      <span className="pointer-events-none">{children}</span>
    </button>
  );
}

function BlockCaret({ blinking }: { blinking: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block align-middle ml-1.5",
        "h-[1em] w-[0.55ch]",
        "bg-white/90",
        blinking ? "animate-pulse" : undefined
      )}
    />
  );
}

function SquiggleCaret({ blinking }: { blinking: boolean }) {
  return (
    <svg
      aria-hidden
      className={cn("inline-block align-middle ml-1.5 h-[0.7em] w-4 text-neutral-400", blinking ? "animate-pulse" : undefined)}
      viewBox="0 0 24 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 5c2-4 4 4 6 0s4 4 6 0 4 4 6 0" />
    </svg>
  );
}
