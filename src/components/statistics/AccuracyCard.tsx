import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100;
  // console.log(accuracy);

  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="font-bold text-2xl">
          Average Accuracy
        </CardTitle>
        <Target />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          { accuracy.toString() }%
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;