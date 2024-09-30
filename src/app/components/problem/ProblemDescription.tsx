import { Problem } from "@/actions/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Difficulty } from "@prisma/client";
import { CheckCircle } from "lucide-react";

export const ProblemDescription = ({ problem }: { problem: Problem }) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 m-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium text-gray-800">
            {problem.id}. {problem.title}
          </h1>
          {problem.isSolved ? (
            <h1>
              <CheckCircle className="text-green-600 mr-5" />
            </h1>
          ) : (
            <></>
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
        <div className="text-gray-600">
          {problem.description.split("\n").map((line) => {
            return <p>{line}</p>;
          })}
        </div>
        <h3 className="text-lg font-medium text-gray-800">Constraints: </h3>
        <div className="text-gray-600">{problem.constraints}</div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="Item-1">
            <AccordionTrigger className="text-lg">Companies</AccordionTrigger>
            <AccordionContent className="mt-3">
              {problem.companies.map((company) => (
                <span
                  className="mr-4 bg-gray-200 px-3 py-2 rounded-lg text-md"
                  key={company}
                >
                  {company}
                </span>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Item-2">
            <AccordionTrigger className="text-lg">Topics</AccordionTrigger>
            <AccordionContent className="mt-3">
              {problem.companies.map((company) => (
                <span
                  className="mr-4 bg-gray-200 px-3 py-2 rounded-lg text-md"
                  key={company}
                >
                  {company}
                </span>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};
