"use client";

import findProblem from "@/actions/findProblem";
import getProblems from "@/actions/getProblems";
import { CodeEditor } from "@/app/components/problem/CodeEditor";
import { ProblemDescription } from "@/app/components/problem/ProblemDescription";
import { TestCase } from "@/app/components/problem/TestCase";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Problem } from "@/actions/types";

export default function page({ params }: { params: { problemId: string } }) {
  const { data: session } = useSession();
  const [problem, setProblem] = useState<Problem>({
    id: 1, // Primary key for the problem
    title: "title", // Problem title
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore deleniti consequuntur sapiente alias velit accusamus mollitia. Voluptates sapiente voluptatibus molestias esse excepturi repellat, architecto ullam. Totam, laboriosam voluptate, officiis reprehenderit eveniet natus harum enim dolore nulla provident obcaecati veritatis quaerat culpa. Culpa, provident dolorem voluptates molestiae at vitae reprehenderit aspernatur optio suscipit ipsam modi commodi nulla voluptatibus incidunt, ab exercitationem dicta magnam omnis doloremque veritatis ipsum ullam iusto. Molestias dolor aperiam laboriosam quo? Ut consectetur aut tenetur impedit provident, animi mollitia placeat autem. Atque illo nemo cupiditate ad quasi pariatur perferendis? Tempore obcaecati assumenda dolores. Error odit voluptates dicta expedita.", // Problem description
    companies: ["Google", "Amazon", "Apple"], // Array of companies associated with the problem
    constraints: "Constraints", // Problem constraints
    difficulty: "EASY", // Difficulty as a string enum
    image: null, // Image URL, can be null
    isSolved: true, // Whether the user has solved the problem
    lastSolverId: null, // ID of the last solver, can be null if no one has solved
    submissions: [],
  });

  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     const problem = await findProblem(
  //       session?.user?.email || "",
  //       parseInt(params.problemId)
  //     );
  //     if (problem && typeof problem.id === "number") {
  //       // console.log(problem);
  //       setProblem(problem as Problem);
  //     } else {
  //       console.error("Invalid problem data:", problem);
  //     }
  //   };

  //   fetchProblems();
  // }, []);

  return (
    <div className="h-screen w-full pt-20 px-10 pb-3">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full min-h-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={40}>
          <ProblemDescription problem={problem as Problem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-6">
                <TestCase />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
