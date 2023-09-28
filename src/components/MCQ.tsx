'use client';
import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import MCQCounter from "./MCQCounter";

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'question' | 'options'>[]; };
};


const MCQ = ({ game }: Props) => {
  // console.log(game);
  const [ questionIndex, setQuestionIndex ] = useState(0);
  const [ selectedChoice, setSelectedChoice ] = useState<number>(0);

  const currentQuestion = useMemo(() => {
    return game.questions[ questionIndex ];
  }, [ questionIndex, game.questions ]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    else if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [ currentQuestion ]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400 mr-2">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              { game.topic }
            </span>
          </p>
          <div className="flex self-start text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>
        <MCQCounter
          correctAnswer={ 0 }
          wrongAnswer={ 3 }
        />
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
        { options.map((option, index) => {
          return (
            <Button
              className="justify-start w-full py-8 mb-4"
              key={ index }
              variant={ selectedChoice === index ? "default" : "secondary" }
              onClick={ () => { setSelectedChoice(index); } }
            >
              <div className="flex items-center justify-center">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  { index + 1 }
                </div>
                <div className="text-start">{ option }</div>
              </div>
            </Button>
          );
        }) }
        <Button className="mt-2" onClick={ () => { setQuestionIndex(questionIndex + 1); } }>
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>

      </div>
    </div>
  );
};

export default MCQ;