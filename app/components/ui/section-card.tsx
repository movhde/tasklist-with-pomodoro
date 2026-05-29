"use client";

export default function SectionCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,.05)] backdrop-blur-xl">
      {children}
    </section>
  );
}
