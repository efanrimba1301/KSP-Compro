import { type ReactNode, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * CTA Button khusus Landing Page.
 * Dipisah dari `Components/ui/button.tsx` (shadcn) karena button admin
 * dibuat compact (h-7, text-xs) untuk dashboard, sedangkan CTA marketing
 * butuh ukuran besar, pill shape, dan trailing icon bulat sesuai Figma.
 *
 * Dipakai di: Navbar, Hero, Footer, Pricing, Contact form, dst.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-pill font-landing text-label-1 whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // Pill hitam + trailing icon bulat — CTA utama ("Contact Us", "Send inquiry")
        primary: "bg-ink text-white pl-6 pr-2 py-2 shadow-btn-soft hover:bg-black",
        // Outline tipis — dipakai untuk CTA sekunder di atas card putih
        outline: "border border-divider-2 text-ink px-6 py-4 hover:bg-tag",
        // Cuma icon bulat, tanpa background — dipakai di Service card ("lihat detail")
        ghostArrow:
          "border border-[#d0d0d0] p-[3px] rounded-full aspect-square !gap-0",
      },
      size: {
        default: "",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
  VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  icon?: typeof ArrowRight01Icon;
  iconOnly?: boolean;
}

export const ButtonLanding = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, icon, className, ...props }, ref) => {
    const showTrailingIconCircle = variant === "primary" || variant === undefined;

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {variant !== "ghostArrow" && children}

        {showTrailingIconCircle && (
          <span className="flex items-center justify-center size-12 rounded-full bg-white">
            <HugeiconsIcon icon={icon ?? ArrowUpRight01Icon} size={24} className="text-black" />
          </span>
        )}

        {variant === "ghostArrow" && (
          <HugeiconsIcon icon={icon ?? ArrowUpRight01Icon} size={24} className="text-ink" />
        )}
      </motion.button>
    );
  }
);

ButtonLanding.displayName = "LandingButton";
