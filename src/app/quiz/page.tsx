import CreateQuiz from "@/components/CreateQuiz";
import { getSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Quiz | Quizify'
};

const QuizPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <CreateQuiz />
  );
};

export default QuizPage;