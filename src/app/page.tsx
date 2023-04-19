"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(120);
  const [initialMouseX, setMouseX] = useState(0);

  const minWidth = 120;
  const maxWidth = 250;

  const asideRef = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);

  function handleMouseDown(event: React.MouseEvent) {
    setIsResizing(true);
    setMouseX(event.clientX);
  }

  function handleMouseUp() {
    setIsResizing(false);
    setMouseX(0);
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (isResizing && event.pageX > initialMouseX) {
      const newWidth = event.pageX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      } else if (newWidth < minWidth) {
        setWidth(minWidth);
      } else if (newWidth > maxWidth) {
        setWidth(maxWidth);
      }
    }
  }

  return (
    <div
      className="relative h-screen flex flex-row"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <aside
        ref={asideRef}
        style={{ width: `${width}px` }}
        className="relative left-0 top-0 bg-red-500"
      ></aside>
      <div
        ref={divRef}
        onMouseDown={handleMouseDown}
        className="resizing z-10 relative left-0 top-0 bg-green-500 w-10"
      ></div>
      <main className="relative flex-1 bg-blue-500"></main>
    </div>
  );
}
