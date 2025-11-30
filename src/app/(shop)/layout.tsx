import { Header, Footer } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FFF5FB]">{children}</main>
      <Footer />
    </>
  );
}
