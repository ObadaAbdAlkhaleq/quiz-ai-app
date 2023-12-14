import CustomWordCloud from "@/components/CustomWordCloud";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

const HotTopicsCard = async () => {
  const topics = await prisma.topicCount.findMany({});
  const formattedTopics = topics.map(topic => {
    return {
      text: topic.topic,
      value: topic.count
    };
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>Click on a topic to start a quiz!</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={ formattedTopics } />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;