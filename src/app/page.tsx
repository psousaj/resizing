"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [posX, setPosX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialPosX, setInitialPosX] = useState(0);
  const [asideWidth, setAsideWidth] = useState(8);

  const asideRef = useRef(null);

  function handleMouseDown(event: React.MouseEvent) {
    if (asideRef.current) {
      setIsMouseDown(true);
      setInitialPosX(event.clientX - posX);
    }
  }

  function handleMouseUp() {
    setIsMouseDown(false);
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (isMouseDown) {
      const newPosX = event.clientX - initialPosX;
      setPosX(newPosX);

      const newAsideWidth = newPosX + 10;
      setAsideWidth(newAsideWidth);
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
        style={{ width: `${asideWidth}rem` }}
        className="relative left-0 top-0 bg-red-500"
      ></aside>
      <div
        onMouseDown={handleMouseDown}
        style={{ left: `${posX}px` }}
        className="z-10 relative left-0 top-0 bg-green-500 w-10"
      ></div>
      <main className="relative flex-1 bg-blue-500"></main>
    </div>
  );
}
