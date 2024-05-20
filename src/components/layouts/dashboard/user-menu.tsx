import { Avatar, AvatarFallback, AvatarImage } from "@herbnexus/ui";
import Link from "next/link";

export const UserMenu = () => (
  <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
    <Link
      href="#"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    >
      <Avatar>
        <AvatarImage
          className="rounded-full"
          src="https://github.com/shadcn.png"
        />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <span className="sr-only">Menu</span>
    </Link>
  </nav>
);
