import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="font-bold text-2xl">
          Time Taken
        </CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          { formatTimeDelta(differenceInSeconds(timeEnded, timeStarted)) }
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;