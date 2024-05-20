import { AvatarImage, AvatarFallback, Avatar } from "@herbnexus/ui";

export default function ChatHeader() {
  return (
    <div className="fixed flex h-[60px] py-4 w-full items-center border-b bg-gray-100 px-6 dark:bg-gray-800/40">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            className="size-10 rounded-full"
            alt="@herbnexus"
            src="https://ui-avatars.com/api/?name=Herb+Nexus&color=random"
          />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Bot Dr. Herb Nexus</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Online
          </div>
        </div>
      </div>
    </div>
  );
}
