import Image from 'next/image';

export default function HeroImage() {
  return (
    // Mobilde 300px, masaüstünde 500px yükseklik daha dengeli bir görünüm sağlar
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <Image
        src="/og_image.svg" // .jpg olan uzantıyı .svg olarak düzelttik
        alt="SwapHubs Takas ve Ticaret Merkezi"
        fill
        priority // LCP puanını iyileştirmek için en önemli ayar
        fetchPriority="high" // Tarayıcıya bu resmin "acil" olduğunu bildirir
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        // quality={85} // SVG vektörel olduğu için bu satırı silebiliriz
      />
    </div>
  );
}
