'use client';

import React, { useState } from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = '' }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-sm'}
        hover:border-blue-300
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}