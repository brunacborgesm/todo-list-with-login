"use client";
import { logout } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => { logout(); router.push("/login"); }}
      className="rounded-md bg-indigo-700 px-3 py-2 text-white text-sm hover:bg-indigo-600 cursor-pointer" 
    >
      Logout
    </button>
  );
}
