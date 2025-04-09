import React from "react";

interface SidebarOverlayProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function SidebarOverlay({
  isVisible,
  onClick,
}: SidebarOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden transition-opacity duration-300"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
