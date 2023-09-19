import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getSession();
  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Quizify🙇‍♂️!</CardTitle>
          <CardDescription>Quizify is a platform for creating quizzes using AI! Get Started by logging in</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton
            text="Sign In with Google"
          ></SignInButton>
        </CardContent>
      </Card>
    </main>
  );
}
