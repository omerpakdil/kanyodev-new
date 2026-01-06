"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg", gap: "gap-1.5" },
    md: { icon: 32, text: "text-2xl", gap: "gap-2" },
    lg: { icon: 48, text: "text-4xl", gap: "gap-3" },
  };

  const { icon, text, gap } = sizes[size];

  return (
    <div className={cn("flex items-center", gap, className)}>
      {/* Icon - Stylized K with code brackets */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="url(#logoGradient)"
        />

        {/* K letter - modern geometric style */}
        <path
          d="M16 12V36M16 24L30 12M16 24L30 36"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span className={cn("font-bold tracking-tight", text)}>
          <span className="text-primary">kanyo</span>
          <span className="text-foreground">dev</span>
        </span>
      )}
    </div>
  );
}

// Alternative minimal logo variant
export function LogoMinimal({ size = "md", className }: Omit<LogoProps, "showText">) {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 48,
  };

  const iconSize = sizes[size];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
    >
      <defs>
        <linearGradient id="logoGradientMin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
        </linearGradient>
      </defs>

      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#logoGradientMin)"
      />

      <path
        d="M16 12V36M16 24L30 12M16 24L30 36"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
