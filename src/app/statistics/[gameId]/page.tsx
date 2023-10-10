import AccuracyCard from "@/components/statistics/AccuracyCard";
import QuestionList from "@/components/statistics/QuestionList";
import ResultsCard from "@/components/statistics/ResultsCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/nextauth";
import { Award, LayoutDashboard, Trophy } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    gameId: string;
  };
};

const StatisticsPage = async ({ params: { gameId } }: Props) => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: true
    }
  });

  let accuracy: number = 0;
  if (game?.gameType === 'mcq') {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game?.gameType === 'open_ended') {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect || 0);
    }, 0);

    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;


  if (!game) {
    return redirect('/');
  }

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href={ '/dashboard' } className={ buttonVariants() }>
              <LayoutDashboard className="mr-2" />
              <p>Back to Dashboard</p>
            </Link>
          </div>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-7">

          <ResultsCard accuracy={ accuracy } />
          <AccuracyCard
            accuracy={ accuracy }
          />
          <TimeTakenCard
            timeEnded={ new Date() }
            timeStarted={ game.timeStarted }
          />
        </div>
        <QuestionList
          questions={ game.questions }
        />
      </div>
    </>
  );
};

export default StatisticsPage;