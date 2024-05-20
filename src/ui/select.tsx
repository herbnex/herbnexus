import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@herbnexus/utils/ui";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "hn-flex hn-h-10 hn-w-full hn-items-center hn-justify-between hn-rounded-md hn-border hn-border-input hn-bg-background hn-px-3 hn-py-2 hn-text-sm hn-ring-offset-background placeholder:hn-text-muted-foreground focus:hn-outline-none focus:hn-ring-2 focus:hn-ring-ring focus:hn-ring-offset-2 disabled:hn-cursor-not-allowed disabled:hn-opacity-50 [&>span]:hn-line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="hn-h-4 hn-w-4 hn-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollUpButton
  >
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "hn-flex hn-cursor-default hn-items-center hn-justify-center hn-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="hn-h-4 hn-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  >
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "hn-flex hn-cursor-default hn-items-center hn-justify-center hn-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="hn-h-4 hn-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "hn-relative hn-z-50 hn-max-h-96 hn-min-w-[8rem] hn-overflow-hidden hn-rounded-md hn-border hn-bg-popover hn-text-popover-foreground hn-shadow-md data-[state=open]:hn-animate-in data-[state=closed]:hn-animate-out data-[state=closed]:hn-fade-out-0 data-[state=open]:hn-fade-in-0 data-[state=closed]:hn-zoom-out-95 data-[state=open]:hn-zoom-in-95 data-[side=bottom]:hn-slide-in-from-top-2 data-[side=left]:hn-slide-in-from-right-2 data-[side=right]:hn-slide-in-from-left-2 data-[side=top]:hn-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:hn-translate-y-1 data-[side=left]:hn--translate-x-1 data-[side=right]:hn-translate-x-1 data-[side=top]:hn--translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "hn-p-1",
          position === "popper" &&
            "hn-h-[var(--radix-select-trigger-height)] hn-w-full hn-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "hn-py-1.5 hn-pl-8 hn-pr-2 hn-text-sm hn-font-semibold",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "hn-relative hn-flex hn-w-full hn-cursor-default hn-select-none hn-items-center hn-rounded-sm hn-py-1.5 hn-pl-8 hn-pr-2 hn-text-sm hn-outline-none focus:hn-bg-accent focus:hn-text-accent-foreground data-[disabled]:hn-pointer-events-none data-[disabled]:hn-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="hn-absolute hn-left-2 hn-flex hn-h-3.5 hn-w-3.5 hn-items-center hn-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="hn-h-4 hn-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("hn--mx-1 hn-my-1 hn-h-px hn-bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
