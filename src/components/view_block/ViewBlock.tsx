'use client';

import { useRouter } from 'next/navigation';

type ViewBlockPropsType = {
  children: React.ReactNode;
  title: string;
  borderColor: string;
  gridPos?: string;
};

export function ViewBlock({ children, title, borderColor, gridPos }: ViewBlockPropsType) {
  const router = useRouter();

  return (
    <div style={{ borderColor: borderColor }} className={`${gridPos} relative border-2 rounded-xl bg-stone-50`}>
      <span style={{ borderColor: borderColor }} className="absolute inline-block font-medium text-xs -top-2 left-8 px-2 leading-tight  bg-stone-50">
        {title}:
      </span>
      <div className="p-5">{children}</div>
    </div>
  );
}
