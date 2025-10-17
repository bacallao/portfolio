"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import {
  Plus,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  Ellipsis,
  AtSign,
  X,
  ArrowUp,
  Files,
  Command,
  ChevronUp,
  Brain,
  ChevronRight,
  FileImage,
  HistoryIcon,
  CopySlash,
} from "lucide-react";

type CursorSidebarProps = {
  className?: string;
};

export function CursorSidebar({ className }: CursorSidebarProps) {
  return (
    <aside
      aria-label="Cursor Agent Sidebar"
      className={cn(
        "h-full w-[280px] max-w-full border-l border-gray-300 bg-white",
        "flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold rounded bg-accent px-2 py-1 cursor-pointer group relative inline-flex items-center">
            New Chat
            <span className="transition-all duration-150 w-0 group-hover:w-auto ml-0 group-hover:ml-1 overflow-hidden opacity-0 group-hover:opacity-100 flex items-center">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          </p>
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
              aria-label="New"
            >
              <Plus className="h-3 w-3 cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
              aria-label="History"
            >
              <HistoryIcon className="h-3 w-3 cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
              aria-label="More"
            >
              <CopySlash className="h-3 w-3 cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
              aria-label="More"
            >
              <Ellipsis className="h-3 w-3 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="px-4">
        <div className="rounded-xl border bg-white">
          {/* Row 1: Top selectors */}
          <div className="flex items-center gap-2 px-3 pt-2">
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-border bg-transparent hover:bg-accent cursor-pointer"
              aria-label="Attach"
            >
              <AtSign className="h-3 w-3 cursor-pointer" />
            </button>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border text-xs font-medium cursor-pointer">
              <Files className="h-3 w-3 mr-1 text-muted-foreground" />1 Tab
            </div>
            <span
              className="inline-flex items-center gap-1 px-2 py-1 border border-dashed border-gray-300 rounded-sm text-xs font-medium bg-transparent cursor-pointer"
              aria-label="Browse"
            >
              <Plus className="h-3 w-3" />
              Browse
            </span>
          </div>

          {/* Row 2: Input field */}
          <div className="px-3 py-2">
            <input
              aria-label="Message"
              placeholder="Plan, search, build anything"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground cursor-pointer"
            />
          </div>

          {/* Row 3: Infinity icon and submit button */}
          <div className="px-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-[99px] bg-muted text-accent-foreground font-semibold border-none cursor-pointer">
                <InfinityIcon className="h-3 w-3" />
                <Command className="h-3 w-3" />
                I
                <ChevronUp className="h-2 w-2" />
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-[99px] bg-muted text-accent-foreground font-semibold border-none cursor-pointer">
                gpt-5
                <Brain className="h-3 w-3" />
                <ChevronUp className="h-2 w-2" />
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full cursor-pointer"
                aria-label="Send"
              >
                <FileImage className="h-3 w-3 text-muted-foreground hover:text-accent-foreground transition-colors cursor-pointer" />
              </button>
              <button
                type="button"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border hover:bg-accent cursor-pointer"
                aria-label="Send"
              >
                <ArrowUp className="h-3 w-3 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-row items-center gap-1 pb-4 pl-4 ml-2">
        <span className="text-muted-foreground">Past chats</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </div>
    </aside>
  );
}

export default CursorSidebar;
