export default function Profile({ params }: { params: { id: number } }) {
   return (
      <div>
         Profile page: {params.id}
      </div>
   )
}