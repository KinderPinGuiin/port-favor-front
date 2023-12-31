import { ReactNode } from 'react';
import Navbar from '@component/Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutWithNavbar({ children }: LayoutProps) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}