import { getSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import QuizCard from "@/components/dashboard/QuizCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "./HotTopicsCard";
import RecentActivities from "./RecentActivities";

export const metadata: Metadata = {
  title: 'Dashboard'
};

const DashboardPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold mr-2 tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default DashboardPage;