import Image from "next/image";

export default function UserProfile({
  email,
  mobile,
}: {
  email?: string;
  mobile?: boolean;
}) {
  const username = (email || "user@gmail.com").split("@")[0];

  return (
    <div className={mobile ? "lg:hidden mt-[3px]" : "flex items-center gap-3"}>
      <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden border-[2px] border-[#FF8DBB] dark:border-[#FD81B0] shadow-[0_0_10px_rgba(255,141,187,0.18)] dark:shadow-[0_0_18px_#00000040]">
        <Image
          src="/icons/avatar.png"
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>

      {!mobile && (
        <span className="text-[16px] font-medium text-[#303153] dark:text-white">
          {username}
        </span>
      )}
    </div>
  );
}
