import { redirect } from "next/navigation";

export default function Home() {
  return <div>{redirect("/review")}Home page</div>;
}
