'use client'

type ViewBlockPropsType = {
   children: React.ReactNode,
   title: string,
   borderColor: string,
   gridPos?: string,
}

export function ViewBlock({ children, title, borderColor, gridPos }: ViewBlockPropsType) {
   return (
      <div className={`${borderColor} ${gridPos} relative border-2 rounded-xl`}>
         <span className="absolute font-medium -top-3 px-1 leading-tight left-8 inline-block bg-white">
            {title}:
         </span>
         <div className="p-5">
            {children}
         </div>
      </div>
   )
}