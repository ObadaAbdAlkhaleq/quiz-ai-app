import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";


type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session = await getSession();
  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        }
      }
    }
  });

  if (!game || game.gameType !== 'open_ended') {
    return redirect('/');
  }

  return <OpenEnded
    game={ game }

  />;
};

export default OpenEndedPage;