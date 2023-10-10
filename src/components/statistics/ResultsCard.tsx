import { Award, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  // console.log(accuracy);

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="font-bold text-2xl">
          Results
        </CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex flex-col text-center items-center justify-center h-3/5">
        { accuracy > 75 ? (
          <>
            <Trophy size={ 50 } stroke="gold" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-600">
              <span >Impressive!</span>
              <span className="text-sm opacity-50 text-foreground">{ `> 75% accuracy` }</span>
            </div>
          </>
        ) : accuracy > 25 ? (
          <>
            <Trophy size={ 50 } stroke="silver" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-600">
              <span >Good Job!</span>
              <span className="text-sm text-center opacity-50 text-foreground">{ `> 25% accuracy` }</span>
            </div>
          </>
        ) : (
          <>
            <Trophy size={ 50 } stroke="maroon" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-600">
              <span >Nice Try!</span>
              <span className="text-sm text-center opacity-50 text-foreground">{ `< 25% accuracy` }</span>
            </div>
          </>
        )
        }
      </CardContent>
    </Card>
  );
};

export default ResultsCard;