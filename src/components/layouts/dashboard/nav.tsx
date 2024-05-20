import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@herbnexus/ui";
import { Home, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export const Nav = () => (
  <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
    <Logo />

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Dashboard</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/messages"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Messages</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Settings</TooltipContent>
    </Tooltip>
  </nav>
);
