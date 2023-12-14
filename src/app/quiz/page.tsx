import QuizCreation from "@/components/forms/QuizCreation";
import { getSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata: Metadata = {
  title: 'Quiz | Quizify'
};

const QuizPage = async ({ searchParams }: Props) => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <QuizCreation topicParam={ searchParams.topic ?? "" } />
  );
};

export default QuizPage;