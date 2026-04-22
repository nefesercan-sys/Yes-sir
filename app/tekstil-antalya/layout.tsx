import { Metadata } from "next";

// Bu metadata sadece bu klasör altındaki sayfalar için geçerli olur
export const metadata: Metadata = {
  title: "Tekstil Antalya | SwapHubs Üretici Sayfası",
  description: "Antalya tekstil üretim ve toptan satış detayları.",
  alternates: {
    canonical: "https://www.swaphubs.com/tekstil-antalya",
  },
};

export default function TekstilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="tekstil-ozel-wrapper">
      {/* İsterseniz buraya sadece bu sayfada görünecek bir yan menü ekleyebilirsiniz */}
      {children}
    </section>
  );
}
