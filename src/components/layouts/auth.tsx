import Image from "next/image";
import Link from "next/link";
import logo from "./images/logo.png";

export const Auth = (props: React.PropsWithChildren) => (
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm inline">
      <Link href="/">
        <Image src={logo} width={60} height={60} alt="Herbnexus" />
      </Link>
    </div>

    {props.children}
  </div>
);
