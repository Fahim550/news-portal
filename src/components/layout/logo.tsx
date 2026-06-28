import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  src?: string;
}

export function Logo({ className, isDark, src = "/logos.png" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center justify-center relative w-36 h-24", className)}>
      <Image
        src={src}
        alt="পুঁজি বার্তা"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );
}
