"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  Globe,
  PanelRight,
  PanelBottom,
  CogIcon,
} from "lucide-react";

export type EditorHeaderProps = {
  className?: string;
  /** Text value of the centered search/address bar */
  value?: string;
  /** Placeholder for the search/address bar */
  placeholder?: string;
  /** Called when the search/address value changes */
  onChange?: (value: string) => void;
  /** Called when the form is submitted (Enter in the field) */
  onSubmit?: (value: string) => void;
  /** Back/Forward action callbacks */
  onBack?: () => void;
  onForward?: () => void;
  /** Optional right-side custom actions; if not provided, a default set is used */
  rightActions?: React.ReactNode;
};

export function EditorHeader({
  className,
  value,
  placeholder = "project",
  onChange,
  onSubmit,
  onBack,
  onForward,
  rightActions,
}: EditorHeaderProps) {
  const [internalValue, setInternalValue] = React.useState<string>(value ?? "");

  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(internalValue);
  }

  return (
    <div
      className={cn(
        "relative flex h-10 w-full items-center border-b bg-white px-2 text-sm text-gray-600",
        className
      )}
      aria-label="Editor title bar"
    >
      {/* Left controls */}
      <div></div>

      {/* Centered portfolio/search text and rotated search icon */}
      <div className="pointer-events-none absolute left-1/2 z-10 w-full max-w-[560px] -translate-x-1/2 px-2 flex justify-center">
        <div className="flex items-center gap-1 mr-3">
          <IconButton ariaLabel="Back" onClick={onBack}>
            <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton ariaLabel="Forward" onClick={onForward}>
            <ChevronRight className="size-4" />
          </IconButton>
        </div>
        <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-1 min-w-[420px] max-w-full text-gray-600">
          <SearchIcon
            className="size-4 text-muted-foreground mr-2"
            style={{ transform: "rotateY(180deg)" }}
          />
          <span className="text-sm font-medium text-gray-600">
            {placeholder}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="ml-auto flex items-center gap-1 pr-1">
        {rightActions ?? (
          <>
            <IconButton ariaLabel="Open in browser">
              <Globe className="size-4" />
            </IconButton>
            <IconButton ariaLabel="Toggle layout">
              <PanelBottom className="size-4" />
            </IconButton>
            <IconButton ariaLabel="Toggle full screen">
              <PanelRight className="size-4" />
            </IconButton>
            <IconButton ariaLabel="Settings">
              <CogIcon className="size-4" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}

export default EditorHeader;

function IconButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-foreground/90 hover:bg-muted/40"
    >
      <span className="pointer-events-none">{children}</span>
    </button>
  );
}
