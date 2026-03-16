import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Image
        src="/og-image.jpg" // Resmin public klasöründe olduğundan emin ol
        alt="SwapHubs Takas ve Ticaret Merkezi"
        fill
        priority // LCP puanını düşürmek için tarayıcıya "öncelikli" olduğunu söyler
        fetchPriority="high" // Yeni nesil tarayıcılar için ek bir hız sinyali
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        quality={85} // 75 biraz düşük kalabilir, 85 kalite-boyut dengesi için idealdir
        // Opsiyonel: Yüklenirken bulanık bir görüntü göstermek için
        // placeholder="blur" 
        // blurDataURL="data:image/png;base64,..." 
      />
    </div>
  );
}
