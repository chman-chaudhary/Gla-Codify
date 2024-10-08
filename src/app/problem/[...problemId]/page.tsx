"use client";

import findProblem from "@/actions/findProblem";
import getProblems from "@/actions/getProblems";
import { CodeEditor } from "@/app/components/problem/CodeEditor";
import { ProblemDescription } from "@/app/components/problem/ProblemDescription";
import { TestCase } from "@/app/components/problem/TestCase";
import ProblemHeader from "@/app/components/problem/ProblemHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NewProblem, Problem } from "@/actions/types";
import { Status } from "@prisma/client";
import { executeCode } from "@/actions/executeCode";

export default function page({ params }: { params: { problemId: string } }) {
  const { data: session } = useSession();
  const [output, setOutput] = useState<any>(null);
  const [variables, setVaribles] = useState<string>();
  const [problem, setProblem] = useState<NewProblem>({
    id: 1, // Primary key for the problem
    title: "Two Sum", // Problem title
    slug: "two-sum",
    description: `
    Given an array of integers nums, return the number of unique elements in the array.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam voluptatibus vero pariatur autem ad perferendis, doloribus dignissimos debitis nisi magnam nesciunt rem totam qui minima, maiores ab vitae quisquam porro!
    `,
    companies: ["Google", "Amazon", "Apple"], // Array of companies associated with the problem
    constraints: [
      "0 < nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "nums[i] != nums[i + 1]",
    ], // Problem constraints
    examples: [
      {
        image:
          "https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg",
        input: "nums = [1, 3, 2, 2, 3, 1]",
        output: "2",
        explanation:
          "The unique elements in the array are [1, 3, 2]. Therefore, the number of unique elements is 2.",
      },
      {
        image: null,
        input: "nums = [1, 1, 1, 2, 2, 3, 3, 3, 4]",
        output: "4",
        explanation:
          "The unique elements in the array are [1, 2, 3, 4]. Therefore, the number of unique elements is 4.",
      },
      {
        image: null,
        input: "nums = [1, 1, 2, 2, 2, 3, 3, 3, 3]",
        output: "3",
        explanation: null,
      },
    ],
    difficulty: "EASY", // Difficulty as a string enum
    image: null, // Image URL, can be null
    isSolved: true, // Whether the user has solved the problem
    lastSolverId: null, // ID of the last solver, can be null if no one has solved
    submissions: [
      {
        id: 1,
        code: "def solution(nums):",
        status: Status.AC,
        userId: "1",
        problemId: 1,
      },
      {
        id: 2,
        code: "def solution(nums):",
        status: Status.WA,
        userId: "2",
        problemId: 1,
      },
      {
        id: 3,
        code: "def solution(nums):",
        status: Status.TLE,
        userId: "3",
        problemId: 1,
      },
      {
        id: 4,
        code: "def solution(nums):",
        status: Status.WA,
        userId: "4",
        problemId: 1,
      },
      {
        id: 5,
        code: "def solution(nums):",
        status: Status.RTE,
        userId: "5",
        problemId: 1,
      },
      {
        id: 6,
        code: "def solution(nums):",
        status: Status.AC,
        userId: "6",
        problemId: 1,
      },
    ],
    topics: ["Array", "Hash Table", "Two Pointers", "Sliding Window"],
    hiddenCode: `
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/src/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        int num1 = Integer.parseInt(lines.get(0).trim());
  int num2 = Integer.parseInt(lines.get(1).trim());
        int result = addTwoNumbers(num1, num2);
        System.out.println(result);
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}`,
    visibleCode: `public int addTwoNumbers(int num1, int num2) {
      
}`,
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

  const handleRunCode = async (code: string) => {
    // console.log(code);
    const completeCode = problem.hiddenCode.replace("##USER_CODE_HERE##", code);
    // console.log(completeCode);
    const response = await executeCode(code, problem.slug);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <ProblemHeader problemId={params.problemId} />
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full min-w-full rounded-lg md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={40} minSize={25}>
          <ProblemDescription problem={problem as NewProblem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <CodeEditor
                problem={problem as NewProblem}
                onRunCode={handleRunCode}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <TestCase />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
