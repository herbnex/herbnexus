import { Nav } from "./nav";
import { UserMenu } from "./user-menu";

export const Dashboard = (props: React.PropsWithChildren) => (
  <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
      <Nav />
      <UserMenu />
    </aside>

    <div className="sm:pl-20">{props.children}</div>
  </div>
);
