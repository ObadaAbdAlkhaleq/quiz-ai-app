import History from "@/components/History";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const RecentActivities = async () => {
  const session = await getSession();

  const gameCount = await prisma.game.count({
    where: {
      userId: session?.user.id
    }
  });
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          You have played a total of { gameCount } games.
        </CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-scroll">
        <History
          limit={ 10 }
          userId={ session?.user.id }
        />
      </CardContent>
    </Card>
  );
};

export default RecentActivities;