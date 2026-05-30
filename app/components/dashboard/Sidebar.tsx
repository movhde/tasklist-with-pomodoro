import SidebarMenu from "./SidebarMenu";

export default function Sidebar(props: any) {
  return (
    <aside
      className="hidden lg:flex sticky top-0 h-screen w-[360px] rounded-r-[54px] bg-[#ffffff]
     dark:bg-[#32334B] border-r border-[#59B7FF]/20 dark:border-[#FD81B0]/20 overflow-hidden shadow-[18px_0_80px_rgba(89,183,255,.22)] dark:shadow-[0_0_40px_#00000040]"
    >
      <SidebarMenu {...props} />
    </aside>
  );
}
