import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@herbnexus/utils/ui";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "hn-z-50 hn-overflow-hidden hn-rounded-md hn-border hn-bg-popover hn-px-3 hn-py-1.5 hn-text-sm hn-text-popover-foreground hn-shadow-md hn-animate-in hn-fade-in-0 hn-zoom-in-95 data-[state=closed]:hn-animate-out data-[state=closed]:hn-fade-out-0 data-[state=closed]:hn-zoom-out-95 data-[side=bottom]:hn-slide-in-from-top-2 data-[side=left]:hn-slide-in-from-right-2 data-[side=right]:hn-slide-in-from-left-2 data-[side=top]:hn-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
