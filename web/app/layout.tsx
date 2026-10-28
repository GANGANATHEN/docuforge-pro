import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DocuForge Pro | Instant AST-Powered Documentation',
  description: 'Zero-cloud, high-speed automated README and architecture generator for local codebases.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
        {children}
      </body>
    </html>
  );
}