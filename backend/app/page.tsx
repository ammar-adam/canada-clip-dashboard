import { getSession } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session?.user) redirect("/dashboard");
  redirect("/api/auth/login");
}
