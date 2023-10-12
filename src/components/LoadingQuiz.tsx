import { useTheme } from "next-themes";
import Image from "next/image";
import LearningDark from 'public/Learning dark.gif';
import LearningLight from 'public/Learning light.gif';
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

type Props = {
  finished: boolean;
};

const loadingTexts = [
  "Crafting your personalized quiz...",
  "Generating quiz questions...",
  "Connecting to ChatGPT for your quiz...",
  "Quiz creation in progress...",
  "Your customized quiz is on the way..."
];

const LoadingQuiz = ({ finished }: Props) => {
  const { theme } = useTheme();
  const [ progress, setProgress ] = useState(0);
  const [ loadingText, setLoadingText ] = useState(loadingTexts[ 0 ]);
  const Learning = theme === 'light' ? LearningLight : LearningDark;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[ randomIndex ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [ finished ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) { return 0; }
        if (Math.random() < 0.1) { return prev + 2; }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image
        src={ Learning }
        alt="loading"
        height={ 400 }
        width={ 400 }
      />
      <Progress value={ progress } className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{ loadingText }</h1>
    </div>
  );
};

export default LoadingQuiz;