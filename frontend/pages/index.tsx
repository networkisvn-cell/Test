import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import LiveMembers from "../components/LiveMembers";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Premium Discord Server</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <nav className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Premium Server</h1>
          <div className="space-x-4">
            <Link href="/music"><a className="px-4 py-2 bg-indigo-600 rounded">Music</a></Link>
            <Link href="/admin"><a className="px-4 py-2 bg-gray-700 rounded">Admin</a></Link>
            {session ? (
              <button onClick={() => signOut()} className="px-4 py-2 bg-red-600 rounded">Sign out</button>
            ) : (
              <button onClick={() => signIn("discord")} className="px-4 py-2 bg-emerald-500 rounded">Sign in with Discord</button>
            )}
          </div>
        </nav>

        <section className="p-8">
          <div className="max-w-4xl mx-auto bg-white/5 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Welcome{session?.user?.name ? `, ${session.user.name}` : ""}</h2>
            <p className="text-slate-200 mb-4">A premium-facing site for your Discord community. Use the Music tab to control playback, or visit Admin for staff tools.</p>

            <LiveMembers />
          </div>
        </section>
      </main>
    </>
  );
}
