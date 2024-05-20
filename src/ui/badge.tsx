import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@herbnexus/utils/ui";

const badgeVariants = cva(
  "hn-inline-flex hn-items-center hn-rounded-full hn-border hn-px-2.5 hn-py-0.5 hn-text-xs hn-font-semibold hn-transition-colors focus:hn-outline-none focus:hn-ring-2 focus:hn-ring-ring focus:hn-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "hn-border-transparent hn-bg-primary hn-text-primary-foreground hover:hn-bg-primary/80",
        secondary:
          "hn-border-transparent hn-bg-secondary hn-text-secondary-foreground hover:hn-bg-secondary/80",
        destructive:
          "hn-border-transparent hn-bg-destructive hn-text-destructive-foreground hover:hn-bg-destructive/80",
        outline: "hn-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
