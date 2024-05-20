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

type Message = {
  isSender: boolean;
  message: string;
  id: string;
};

interface MessageProps {
  message: Message;
}

export default function Message(props: MessageProps) {
  const { message } = props;

  return (
    <div
      className={cn(
        "flex items-start",
        message.isSender && "justify-end",
      )}
      key={message.id}
    >
      <div
        key={message.id}
        className={cn(
          "rounded-lg p-3 text-sm items-start w-5/6",
          message.isSender
            ? "text-gray-50 dark:bg-gray-50 bg-gray-900 dark:text-gray-900"
            : "bg-gray-100 dark:bg-gray-950",
        )}
      >
        {message.message}
      </div>
    </div>
  );
}
