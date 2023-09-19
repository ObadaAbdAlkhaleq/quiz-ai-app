import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          You have played a total of 0 games.
        </CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-scroll">
        {/* TODO: hISTORY COMPONENT */ }
      </CardContent>
    </Card>
  );
};

export default RecentActivities;