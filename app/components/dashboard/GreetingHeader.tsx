import EditIcon from "../Elements/EditIcon";

export default function GreetingHeader({ email }: { email: string }) {
   const username = (email || "user@gmail.com").split("@")[0];
  const now = new Date();

  const hour = now.getHours();

  const greeting = hour < 12 ? "Good morning" : "Good afternoon";

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="font-sniglet text-[26px] md:text-[34px] font-bold text-[#303153] dark:text-white">
          {greeting}, {username}
        </h1>

        <p className="mt-1 font-sniglet md:mt-2 text-[14px] text-[#707070] dark:text-[#B7B7C9]">
          {date}
        </p>
      </div>

      {/* desktop edit icon */}

      <button className="hidden lg:flex mt-2 w-8 h-8 items-center justify-center transition-all duration-200">
        <div className="dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(2290%)_hue-rotate(295deg)_brightness(101%)_contrast(102%)]">
          <EditIcon />
        </div>
      </button>
    </div>
  );
}
