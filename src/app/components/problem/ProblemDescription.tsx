import { NewProblem } from "@/actions/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Difficulty, Status } from "@prisma/client";
import { CheckCircle, Dot } from "lucide-react";
import { useEffect, useState } from "react";

export const ProblemDescription = ({ problem }: { problem: NewProblem }) => {
  const [totalSubmissions, setTotalSubmissions] = useState<number>(0);
  const [totalAccepted, setTotalAccepted] = useState<number>(0);
  const [acceptenceRate, setAcceptenceRate] = useState<number>(0);

  useEffect(() => {
    setTotalSubmissions(problem.submissions.length);
    setTotalAccepted(
      problem.submissions.filter(
        (submission) => submission.status === Status.AC
      ).length
    );
    setAcceptenceRate(
      (problem.submissions.filter(
        (submission) => submission.status === Status.AC
      ).length /
        problem.submissions.length) *
        100
    );
  }, [problem]);

  return (
    <ScrollArea className="h-full text-secondary-foreground">
      <div className="space-y-5 m-5 max-w-[700px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {problem.id}. {problem.title}
          </h1>
          {problem.isSolved && (
            <CheckCircle className="text-green-600 mr-5 size-5" />
          )}
        </div>
        <div>
          {problem.difficulty === Difficulty.EASY ? (
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md">
              Easy
            </span>
          ) : problem.difficulty === Difficulty.MEDIUM ? (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md">
              Medium
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 px-2 py-1 rounded-md">
              Hard
            </span>
          )}
        </div>
        <div className="space-y-3">
          {problem.description.split("\n").map((line, idx) => {
            return <p key={idx}>{line}</p>;
          })}
        </div>

        <div>
          {problem.examples.map((example, idx) => {
            return (
              <div className="mb-4" key={idx}>
                <h3 className="text-lg font-semibold">Example {idx + 1}: </h3>
                <div className="bg-secondary p-2 rounded-md">
                  {example.image ? (
                    <div className="flex justify-center items-center max-w-[400px] my-3 p-2">
                      <img src={example.image} alt="Example Image" />
                    </div>
                  ) : (
                    <></>
                  )}
                  <p className="ml-3 mt-1">
                    <span className="font-semibold">Input:</span>{" "}
                    <code>{example.input}</code>
                  </p>
                  <p className="ml-3 mt-1">
                    <span className="font-semibold">Output:</span>{" "}
                    <code>{example.output}</code>
                  </p>
                  {example.explanation ? (
                    <p className=" ml-3 mt-1">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {example.explanation}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="text-lg font-semibold">Constraints: </h3>
        <div className="bg-secondary p-2 rounded-md">
          <ul>
            {problem.constraints?.map((constraint) => {
              return (
                <li key={constraint}>
                  <code className="flex items-center">
                    <span>
                      <Dot />
                    </span>
                    {constraint}
                  </code>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex gap-x-2 flex-wrap font-semibold py-4">
          <span>Submissions: {totalSubmissions}</span>
          <span className="mx-2">|</span>
          <span>Accepted: {totalAccepted}</span>
          <span className="mx-2">|</span>
          <span>Acceptence Rate: {acceptenceRate.toFixed(2)}%</span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="Item-1">
            <AccordionTrigger className="text-lg">Companies</AccordionTrigger>
            <AccordionContent className="mt-2">
              <div className="flex flex-wrap">
                {problem.companies.map((company) => (
                  <span
                    className="mr-4 bg-gray-800 px-3 text-white py-2 mb-2 rounded-lg text-md"
                    key={company}
                  >
                    {company}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Item-2">
            <AccordionTrigger className="text-lg">Topics</AccordionTrigger>
            <AccordionContent className="mt-2">
              <div className="flex flex-wrap">
                {problem.topics.map((topic) => (
                  <span
                    className="mr-4 bg-gray-800 text-white  px-3 py-2 mb-2 rounded-lg text-md"
                    key={topic}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};
