import { BookOpen, Puzzle } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 bg-gradient-primary rounded-xl rotate-12 opacity-80" />
        <div className="absolute inset-0 bg-gradient-secondary rounded-xl -rotate-6 opacity-60" />
        <div className="relative z-10 w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-yellow">
          <div className="flex items-center gap-0.5">
            <BookOpen className="w-1/2 h-1/2 text-primary-foreground" />
            <Puzzle className="w-1/3 h-1/3 text-primary-foreground -ml-1" />
          </div>
        </div>
      </div>
      {showText && (
        <h1 className={`font-fredoka font-bold ${textSizeClasses[size]}`}>
          <span className="text-primary">Edu</span>
          <span className="text-secondary">Cross</span>
        </h1>
      )}
    </div>
  );
}