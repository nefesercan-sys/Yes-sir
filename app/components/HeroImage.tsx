import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Image
        src="/ag_image.jpg" // public klasöründeki görselin
        alt="SwapHubs Takas ve Ticaret Borsası"
        fill
        priority // 🚀 LCP puanını düşüren "Sihirli" parametre
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1200px"
        quality={75} // Hız için kaliteyi 75'e düşürdük (gözle görülmez, yüklenmeyi hızlandırır)
      />
    </div>
  );
}
