'use client';

type LoadingPropsType = {
  width: string;
  height: string;
};

export function Loading({ width, height }: LoadingPropsType) {
  return (
    <div className={`flex items-center ${width} ${height}`}>
      <svg className="animate-spin text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.4" strokeDashoffset="31.4"></circle>
      </svg>
    </div>
  );
}
