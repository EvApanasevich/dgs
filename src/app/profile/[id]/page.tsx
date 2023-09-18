export default function Profile({ params }: { params: { id: number } }) {
   return (
      <div className="text-2xl pt-28">
         Profile page: {params.id}
      </div>
   )
}