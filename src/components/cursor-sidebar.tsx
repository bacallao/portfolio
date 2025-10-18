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
        "h-full w-[280px] max-w-full border-l border border-[#24262d] bg-[#0d1117]",
        "flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold rounded bg-[#10141b] text-[#e5e7eb] border border-[#24262d] px-2 py-1 cursor-pointer group relative inline-flex items-center">
            New Chat
            <span className="transition-all duration-150 w-0 group-hover:w-auto ml-0 group-hover:ml-1 overflow-hidden opacity-0 group-hover:opacity-100 flex items-center">
              <X className="h-4 w-4 text-[#9aa0aa]" />
            </span>
          </p>
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-[#111318] cursor-pointer"
              aria-label="New"
            >
              <Plus className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-[#111318] cursor-pointer"
              aria-label="History"
            >
              <HistoryIcon className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-[#111318] cursor-pointer"
              aria-label="More"
            >
              <CopySlash className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
            </button>
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-[#111318] cursor-pointer"
              aria-label="More"
            >
              <Ellipsis className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="px-4">
        <div className="rounded-xl border border-[#24262d] bg-[#0f1319]">
          {/* Row 1: Top selectors */}
          <div className="flex items-center gap-2 px-3 pt-2">
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#2a2e37] bg-transparent hover:bg-[#111318] cursor-pointer"
              aria-label="Attach"
            >
              <AtSign className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
            </button>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border border-[#2a2e37] text-xs font-medium text-[#cfd5df] cursor-pointer">
              <Files className="h-3 w-3 mr-1 text-[#9aa0aa]" />1 Tab
            </div>
            <span
              className="inline-flex items-center gap-1 px-2 py-1 border border-dashed border-[#2a2e37] rounded-sm text-xs font-medium text-[#cfd5df] bg-transparent cursor-pointer"
              aria-label="Browse"
            >
              <Plus className="h-3 w-3 text-[#9aa0aa]" />
              Browse
            </span>
          </div>

          {/* Row 2: Input field */}
          <div className="px-3 py-2">
            <input
              aria-label="Message"
              placeholder="Plan, search, build anything"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#6b7280] text-[#e5e7eb] cursor-pointer"
            />
          </div>

          {/* Row 3: Infinity icon and submit button */}
          <div className="px-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-[99px] bg-[#10141b] text-[#d7dee8] font-semibold border-none cursor-pointer">
                <InfinityIcon className="h-3 w-3 text-[#9aa0aa]" />
                <Command className="h-3 w-3 text-[#9aa0aa]" />
                I
                <ChevronUp className="h-2 w-2 text-[#9aa0aa]" />
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-[99px] bg-[#10141b] text-[#e5e7eb] font-semibold border-none cursor-pointer">
                gpt-5
                <Brain className="h-3 w-3 text-[#9aa0aa]" />
                <ChevronUp className="h-2 w-2 text-[#9aa0aa]" />
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full cursor-pointer"
                aria-label="Send"
              >
                <FileImage className="h-3 w-3 text-[#9aa0aa] hover:text-[#f5f6f7] transition-colors cursor-pointer" />
              </button>
              <button
                type="button"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#24262d] hover:bg-[#111318] cursor-pointer"
                aria-label="Send"
              >
                <ArrowUp className="h-3 w-3 text-[#9aa0aa] cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-row items-center gap-1 pb-4 pl-4 ml-2">
        <span className="text-[#9aa0aa]">Past chats</span>
        <ChevronRight className="h-4 w-4 text-[#9aa0aa] cursor-pointer" />
      </div>
    </aside>
  );
}

export default CursorSidebar;
