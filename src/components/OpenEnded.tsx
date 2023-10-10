'use client';
import { cn, formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Link, Loader2, Timer } from "lucide-react";
import MCQCounter from "./MCQCounter";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { checkAnswerSchema } from "@/schemas/questions";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import BlankAnswerInput from "./BlankAnswerInput";

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'question' | 'answer'>[]; };
};

const OpenEnded = ({ game }: Props) => {
  // console.log(game);
  const [ questionIndex, setQuestionIndex ] = useState<number>(0);
  const [ hasEnded, setHasEnded ] = useState<boolean>(false);
  const [ now, setNow ] = useState<Date>(new Date());
  const [ blankAnswer, setBlankAnswer ] = useState<string>('');
  const { toast } = useToast();

  const currentQuestion = useMemo(() => {
    return game.questions[ questionIndex ];
  }, [ questionIndex, game.questions ]);

  useEffect(() => {
    const intreval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => {
      clearInterval(intreval);
    };
  }, [ hasEnded ]);


  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll('#user-blank-input').forEach(input => {
        // @ts-ignore
        filledAnswer = filledAnswer.replace('_____', input.value);
        // @ts-ignore
        input.value = '';
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post('/api/checkAnswer', payload);
      return response.data;
    }
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% to the correct answer`,
          description: "answers are matched based on similarity comparisons",
          variant: 'default',
        });
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      }
    });
  }, [ checkAnswer, toast, isChecking, questionIndex, game.questions.length ]);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key == 'Enter') {
        handleNext();
      }
    });
  });

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 mt-2 font-semibold text-white bg-green-600 rounded-md whitespace-nowrap">
          You completed in { " " }
          { formatTimeDelta(differenceInSeconds(now, game.timeStarted)) }
        </div>
        <Link href={ `/statistics/${game.id}` } className={ cn(buttonVariants(), 'mt-2') }>
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="mb-2">
            <span className="text-slate-400 mr-2">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              { game.topic }
            </span>
          </p>
          <div className="flex self-start text-slate-400">
            <Timer className="mr-2" />
            { formatTimeDelta(differenceInSeconds(now, game.timeStarted)) }
          </div>
        </div>
        {/* <MCQCounter
          correctAnswer={ correctAnswer }
          wrongAnswer={ wrongAnswer }
        /> */}
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50 dark:divide-zinc-200">
            <div>{ questionIndex + 1 }</div>
            <div className="text-base text-slate-400">
              { game.questions.length }
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            { currentQuestion.question }
          </CardDescription>
        </CardHeader>
      </Card>


      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput
          answer={ currentQuestion.answer }
          setBlankAnswer={ setBlankAnswer }
        />
        <Button
          className="mt-2"
          disabled={ isChecking }
          onClick={ () => { handleNext(); } }
        >
          { isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" /> }
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>

      </div>
    </div>
  );
};

export default OpenEnded;