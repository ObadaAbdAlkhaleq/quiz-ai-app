'use client';

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { z } from 'zod';
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingQuiz from "../LoadingQuiz";
import { useToast } from "../ui/use-toast";

type Props = {
  topicParam: string;
};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({ topicParam }: Props) => {

  const router = useRouter();

  const [ showLoader, setShowLoader ] = useState(false);
  const [ finished, setFinished ] = useState(false);
  const { toast } = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {

      const response = await axios.post('/api/game', {
        amount, topic, type
      });
      return response.data;
    }
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: topicParam,
      type: 'mcq'
    }
  });

  const onSubmit = async (data: Input) => {
    setShowLoader(true);
    getQuestions({
      amount: data.amount,
      topic: data.topic,
      type: data.type
    }, {
      onSuccess: ({ gameId }) => {
        setFinished(true);
        setTimeout(() => {
          if (form.getValues('type') === 'mcq') {
            router.push(`/play/mcq/${gameId}`);
          } else if (form.getValues('type') === 'open_ended') {
            router.push(`/play/open_ended/${gameId}`);
          }
        }, 2000);
      },
      onError: (error: any) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: 'Error',
              description: `${error}`,
              variant: 'destructive',
            });
          }
        }
      }
    });
  };

  form.watch();

  if (showLoader) {
    return <LoadingQuiz
      finished={ finished }
    />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Create a Quiz!</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>

        <CardContent>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
              <FormField
                control={ form.control }
                name="topic"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." { ...field } />
                    </FormControl>
                    <FormDescription>
                      Please provide a topic for the quiz
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="amount"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount..."
                        { ...field }
                        type="number"
                        min={ 1 }
                        max={ 10 }
                        onChange={ (e) => {
                          form.setValue('amount', parseInt(e.target.value));
                        } }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <div className="flex justify-between">
                <Button
                  onClick={ () => { form.setValue("type", 'mcq'); } }
                  type="button"
                  className="rounded-none rounded-l-lg"
                  variant={
                    form.getValues('type') === 'mcq' ? 'default' : 'secondary'
                  }
                >
                  <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  onClick={ () => { form.setValue("type", 'open_ended'); } }
                  type="button"
                  className="w-1/2 rounded-none rounded-r-lg"
                  variant={
                    form.getValues('type') === 'open_ended' ? 'default' : 'secondary'
                  }
                >
                  <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button disabled={ isLoading } type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;