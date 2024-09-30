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
import { NewProblem, Problem } from "@/actions/types";
import { Status } from "@prisma/client";

export default function page({ params }: { params: { problemId: string } }) {
  const { data: session } = useSession();
  const [problem, setProblem] = useState<NewProblem>({
    id: 1, // Primary key for the problem
    title: "Add Two Numbers", // Problem title
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
    hiddenCode: "def solution(nums):",
    visibleCode: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
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

  return (
    <div className="h-screen w-[90%] mx-auto pt-20 pb-3">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full min-h-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={40}>
          <ProblemDescription problem={problem as NewProblem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <CodeEditor problem={problem as NewProblem} />
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
