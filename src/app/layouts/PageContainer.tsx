import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto w-full max-w-[1140px] px-[20px] md:px-[40px]">{children}</div>;
}
