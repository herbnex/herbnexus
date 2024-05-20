import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Link href="/conversations">Conversations</Link>
      <Link href="/settings">Settings</Link>
    </div>
  );
}
