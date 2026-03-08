import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth0.getSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#050C1A] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[#E8EDF5] text-3xl font-bold">
          🍁 CanadaClip
        </h1>
        <p className="text-[#5A7A9E] text-sm mt-2">
          The GEO platform for Canadian small businesses
        </p>
        <a
          href="/auth/login"
          className="bg-[#C8102E] hover:bg-[#0F1E36] text-white rounded-lg px-6 py-3 mt-8 block text-center w-full max-w-xs border border-[#1A2E4A]"
        >
          Sign in to your dashboard
        </a>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <div className="bg-[#0B1628] border border-[#1A2E4A] rounded-xl p-3 text-xs text-[#5A7A9E]">
            Northbound Packs — Ontario — Hiking backpacks
          </div>
          <div className="bg-[#0B1628] border border-[#1A2E4A] rounded-xl p-3 text-xs text-[#5A7A9E]">
            StreetRoot Co — Quebec — Urban streetwear
          </div>
          <div className="bg-[#0B1628] border border-[#1A2E4A] rounded-xl p-3 text-xs text-[#5A7A9E]">
            NorthTech Goods — British Columbia — Electronics
          </div>
          <div className="bg-[#0B1628] border border-[#1A2E4A] rounded-xl p-3 text-xs text-[#5A7A9E]">
            Shawarma Palace — Ontario — Restaurant / Food
          </div>
        </div>
        <p className="text-[#2E4A6B] text-xs mt-8">
          Hack Canada 2026 Demo
        </p>
      </div>
    </div>
  );
}
