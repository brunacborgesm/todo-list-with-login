"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
      className="rounded-md bg-slate-700 px-3 py-2 text-white text-sm hover:bg-slate-800"
    >
      Logout
    </button>
  );
}
