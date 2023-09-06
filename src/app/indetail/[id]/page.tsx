import { dgses } from "@/app/review/page";
import { ObjectList } from "../ObjectList";

export default function ObjectInDetail({ params }: { params: { id: number } }) {
   return (
      <div>
         {/* <ObjectList paramsId={params.id} dgses={dgses} /> */}
         Object with id: {params.id}
      </div>
   )
}