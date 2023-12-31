import { strict_output } from "@/lib/gpt";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { getQuestionsSchema } from "@/schemas/questions";
import { getSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: "you must be logged in" }, { status: 401 });
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);

    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "you are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words, store all pairs of answers and questions in json array",
        new Array(amount).fill(
          `you are to generate random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words"
        }
      );
      console.log(questions);

    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    return NextResponse.json({
      questions: questions,
    },
      {
        status: 200
      });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400
        }
      );
    } else {
      console.error("obada gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  };
}
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ 'hellow': 'world' });
};
