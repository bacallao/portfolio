"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FileCode,
  FileJson,
  FolderOpen,
  Circle,
  Files,
  Search,
  GitFork,
  Codesandbox,
} from "lucide-react";

type FileItem = {
  name: string;
  type: "file" | "folder";
  icon?: string;
  iconColor?: string;
  isExpanded?: boolean;
  hasIndicator?: boolean;
  children?: FileItem[];
};

type FileExplorerSidebarProps = {
  className?: string;
};

export function FileExplorerSidebar({ className }: FileExplorerSidebarProps) {
  // Mock file structure based on the image
  const fileStructure: FileItem[] = [
    { name: ".next", type: "folder", iconColor: "text-gray-600" },
    { name: "node_modules", type: "folder", iconColor: "text-green-600" },
    { name: "public", type: "folder", iconColor: "text-blue-600" },
    {
      name: "src",
      type: "folder",
      iconColor: "text-green-600",
      isExpanded: true,
      hasIndicator: true,
      children: [
        { name: "app", type: "folder", iconColor: "text-red-600" },
        { name: "components", type: "folder", iconColor: "text-yellow-600" },
        { name: "lib", type: "folder", iconColor: "text-yellow-600" },
      ],
    },
    { name: "styles", type: "folder", iconColor: "text-purple-600" },
    { name: ".gitignore", type: "file", iconColor: "text-orange-600" },
    { name: "components.json", type: "file", iconColor: "text-blue-600" },
    { name: "eslint.config.mjs", type: "file", iconColor: "text-blue-600" },
    { name: "next-env.d.ts", type: "file", iconColor: "text-blue-600" },
    { name: "next.config.mjs", type: "file", iconColor: "text-gray-600" },
    { name: "next.config.ts", type: "file", iconColor: "text-gray-600" },
    { name: "package-lock.json", type: "file", iconColor: "text-yellow-600" },
    { name: "package.json", type: "file", iconColor: "text-yellow-600" },
    { name: "postcss.config.mjs", type: "file", iconColor: "text-red-600" },
    { name: "README.md", type: "file", iconColor: "text-blue-600" },
    { name: "tsconfig.json", type: "file", iconColor: "text-blue-600" },
  ];

  const FileIcon = ({ item }: { item: FileItem }) => {
    if (item.type === "folder") {
      return (
        <Folder
          className={cn("h-4 w-4", item.iconColor || "text-gray-600")}
          fill="currentColor"
        />
      );
    }
    return (
      <FileText
        className={cn("h-4 w-4", item.iconColor || "text-gray-600")}
      />
    );
  };

  const FileTreeItem = ({
    item,
    depth = 0,
  }: {
    item: FileItem;
    depth?: number;
  }) => {
    const paddingLeft = depth * 16 + 8;

    return (
      <div>
        <div
          className={cn(
            "flex items-center gap-1 py-0.5 px-2 hover:bg-gray-300/50 cursor-pointer group text-sm relative"
          )}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {item.type === "folder" && (
            <span className="flex items-center justify-center w-4">
              {item.isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-600" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-600" />
              )}
            </span>
          )}
          {item.type === "file" && <span className="w-4" />}
          <FileIcon item={item} />
          <span className="text-gray-900 text-sm leading-tight">
            {item.name}
          </span>
          {item.hasIndicator && (
            <Circle
              className="h-2 w-2 text-blue-400 ml-auto mr-2"
              fill="currentColor"
            />
          )}
        </div>
        {item.isExpanded && item.children && (
          <div>
            {item.children.map((child, index) => (
              <FileTreeItem key={index} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      aria-label="File Explorer"
      className={cn(
        "h-full w-[280px] max-w-full border-r border-l bg-white text-gray-900 border-gray-300",
        "flex flex-col text-sm",
        className
      )}
    >

      {/* Header */}
      <div className="px-3 py-2 flex justify-center items-center gap-1">
        <button
          type="button"
          className="p-1 hover:bg-gray-300/50 rounded cursor-pointer"
          aria-label="New File"
        >
          <Files className="h-4 w-4 text-gray-600" />
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-300/50 rounded cursor-pointer"
          aria-label="New Folder"
        >
          <Search className="h-4 w-4 text-gray-600" style={{ transform: "rotateY(180deg)" }} />
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-300/50 rounded cursor-pointer"
          aria-label="Refresh"
        >
          <GitFork className="h-4 w-4 text-gray-600" />
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-300/50 rounded cursor-pointer"
          aria-label="Cursor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{
              width: "calc(var(--spacing) * 4)",
              height: "calc(var(--spacing) * 4)",
            }}
          >
            <path
              fill="currentColor"
              className="text-gray-600"
              d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-300/50 rounded cursor-pointer"
          aria-label="Collapse All"
        >
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      
      <div className="px-3 py-2 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-4 w-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Project
          </span>
        </div>
        
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {fileStructure.map((item, index) => (
          <FileTreeItem key={index} item={item} />
        ))}
      </div>

      {/* Bottom sections */}
      <div className="">
        <div className="px-3 py-2 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2 cursor-pointer">
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              Outline
            </span>
          </div>
        </div>
        <div className="px-3 py-2 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2 cursor-pointer">
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              Timeline
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FileExplorerSidebar;

