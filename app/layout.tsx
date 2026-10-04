import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TeamDeck — The workspace that never loses work',
  description: 'A real-time workspace for projects, tasks, deadlines and team momentum.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
