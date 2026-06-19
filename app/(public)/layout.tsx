import type { Metadata } from "next";
import Header from "../components/public/Header";

export const metadata: Metadata = {
  title: "Pijamariact",
  description: "Pijamaria CT",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
