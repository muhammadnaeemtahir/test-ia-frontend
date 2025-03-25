import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <span className="absolute right-5 top-5">
        <ThemeToggle />
      </span>
      {children}
    </>
  );
}
