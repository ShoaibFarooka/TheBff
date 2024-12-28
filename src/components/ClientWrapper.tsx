'use client'

import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

export default function ClientWrapper({
  children,
}: {
  children: ReactElement[];
}) {
  const pathname = usePathname();
  const isTrainerSignup = pathname === '/trainer/signup';

  return (
    <>
      {!isTrainerSignup && children[0]} {/* Header */}
      {children[1]} {/* Main content */}
      {children[2]} {/* Footer */}
    </>
  );
}