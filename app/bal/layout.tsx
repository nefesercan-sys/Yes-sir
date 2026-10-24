import type { ReactNode } from 'react';
import { Nunito, Lora } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap' });
const lora = Lora({ subsets: ['latin', 'latin-ext'], variable: '--font-lora', display: 'swap' });

export default function BalLayout({ children }: { children: ReactNode }) {
  return <div className={`${nunito.variable} ${lora.variable}`}>{children}</div>;
}
