import { dgses } from "../review/page";
import { ObjectList } from "./ObjectList";

export default function InDetailLayout({ children }: { children: React.ReactNode }) {

   return (
      <>
         <ObjectList dgses={dgses} />
         {children}
      </>
   )
}