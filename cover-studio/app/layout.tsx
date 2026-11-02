import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'COVER STUDIO — AI Thumbnail Generator', description: 'Create bold, beautiful covers with AI.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body>{children}</body></html>; }
