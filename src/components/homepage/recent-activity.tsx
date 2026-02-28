import { Activity } from "lucide-react";

export function RecentActivity() {
    return (
        <section className="space-y-4 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Recent Activity
          </h2>
          <div className="border border-zinc-800 rounded-2xl flex-1 p-6 flex flex-col items-center justify-center text-zinc-500 space-y-3 bg-zinc-900/20">
            <Activity className="w-8 h-8 opacity-40" />
            <p className="text-sm text-center max-w-[200px]">
              Your recent watching activity will appear here.
            </p>
          </div>
        </section>
    )
}