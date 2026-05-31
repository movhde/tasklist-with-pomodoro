export default function ControlButton({
  buttonName,
  onClick,
}: {
  buttonName: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-6 mb-6 w-full max-w-2/3 cursor-pointer font-sniglet font-semibold text-xl bg-white border-2 border-[#FFB6D3] text-[#303153] p-2 rounded-[30px] hover:drop-shadow-[2px_2px_2px_#F5B9D1] dark:bg-[#FD81B0] dark:border-[#FFB6D3] dark:text-white transition-all duration-200"
    >
      {buttonName}
    </button>
  );
}
