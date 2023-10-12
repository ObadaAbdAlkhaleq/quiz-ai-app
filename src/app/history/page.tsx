import History from "@/components/History";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/nextauth";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const HistoryPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold text-2xl">
              History
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Link href={ '/dashboard' } className={ buttonVariants() }>
                <LayoutDashboard className="mr-2" />
                <p>Back to Dashboard</p>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-scroll max-h-[60vh]">
          <History
            limit={ 20 }
            userId={ session?.user.id }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;