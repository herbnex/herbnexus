import {
  Button,
  AvatarImage,
  AvatarFallback,
  Avatar,
  Input,
} from "@herbnexus/ui";
import { Search, Send } from "lucide-react";
import {
  getFakeMessages,
  getFakeUsers,
} from "@herbnexus/utils/faker";
import Link from "next/link";
import { cn } from "@herbnexus/utils/ui";

const fakePinnedUsers = getFakeUsers(2);
const fakeMoreUsers = getFakeUsers(10);
const fakeConversation = getFakeMessages(20);

export default function MessageArea() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="fixed flex flex-col border-r w-96 bg-gray-100/40 dark:bg-gray-800/40 overflow-auto">
        <div className="flex h-[60px] items-center border-b px-6">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button
            className="ml-auto h-8 w-8"
            size="icon"
            variant="ghost"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="space-y-4 p-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Pinned
              </h3>
              <div className="space-y-3 overflow-auto">
                <Link
                  href="/messages/hb"
                  className="flex items-center gap-3 rounded-md bg-white p-2 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 px-6 py-4"
                >
                  <Avatar>
                    <AvatarImage
                      className={cn(
                        "size-10 rounded-full",
                        "border-2 border-emerald-500",
                      )}
                      alt="Herbnexus"
                      src="https://ui-avatars.com/api/?background=random&name=herb+nexus"
                    />
                    <AvatarFallback>HB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">
                      Bot Dr. Herb Nexus
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">
                      Herbotlist
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    2h
                  </div>
                </Link>

                {fakePinnedUsers.map((user) => (
                  <Link
                    href="#"
                    key={user.id}
                    className="flex items-center gap-3 rounded-md bg-white p-2 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 px-6 py-4"
                  >
                    <Avatar>
                      <AvatarImage
                        className={cn(
                          "size-10 rounded-full",
                          user.online &&
                            "border-2 border-emerald-500",
                        )}
                        alt={user.username}
                        src={user.avatar}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        {user.jobTitle}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      2h
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Recent
              </h3>
              <div className="space-y-3 overflow-auto">
                {fakeMoreUsers.map((user) => (
                  <Link
                    href="#"
                    key={user.id}
                    className="flex items-center gap-3 rounded-md bg-white p-2 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 px-6 py-4"
                  >
                    <Avatar>
                      <AvatarImage
                        className={cn(
                          "size-10 rounded-full",
                          user.online &&
                            "border-2 border-emerald-500",
                        )}
                        alt={user.username}
                        src={user.avatar}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        {user.jobTitle}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      2h
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-96 min-h-screen w-full">
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

        <div className="flex-1 overflow-auto p-4 mt-[60px] mb-38">
          <div className="space-y-4">
            {fakeConversation.map((item) => (
              <div
                className={cn(
                  "flex items-start",
                  item.isSender && "justify-end",
                )}
                key={item.id}
              >
                <div
                  key={item.id}
                  className={cn(
                    "rounded-lg p-3 text-sm items-start w-5/6",
                    item.isSender
                      ? "text-gray-50 dark:bg-gray-50 bg-gray-900 dark:text-gray-900"
                      : "bg-gray-100 dark:bg-gray-950",
                  )}
                >
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t bg-gray-100 p-4 dark:bg-gray-800/40 bottom-0">
          <div className="flex items-center gap-2">
            <Input
              className="flex-1 border-5 border-cyan-700"
              placeholder="Type your message..."
            />
            <Button variant="outline">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
