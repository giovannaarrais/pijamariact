import type { Metadata } from "next";
import Header from "../components/public/home/Header";
import Footer from "../components/public/home/Footer";

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
      <main className="py-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
