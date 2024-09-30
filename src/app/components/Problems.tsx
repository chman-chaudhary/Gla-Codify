"use client";

import { useEffect, useState } from "react";
import getProblems from "@/actions/getProblems";
import { Difficulty, Problem, Status, User } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { CheckCircle } from "lucide-react";
import { BsDash } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type Problems = {
  id: number; // Primary key for the problem
  title: string; // Problem title
  description: string; // Problem description
  companies: string[]; // Array of companies associated with the problem
  constraints: string | null; // Problem constraints
  difficulty: Difficulty; // Difficulty as a string enum
  image: string | null; // Image URL, can be null
  isSolved: boolean | undefined; // Whether the user has solved the problem
  lastSolverId: string | null; // ID of the last solver, can be null if no one has solved
  submissions: {
    id: number;
    code: string;
    status: Status;
    userId: string | null;
    problemId: number | null;
  }[]; // Array of submissions, possibly empty
  lastSolver: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
};

export const Problems = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [problems, setProblems] = useState<Problems[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getProblems(session?.user?.email || "");
      // console.log(problems);
      setProblems(problems);
    };

    fetchProblems();
  }, []);

  return (
    <Table className="w-full text-md border-[1px] broder-gray-400/20 mb-20 ">
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead className="text-center">Last Solver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow
            key={problem.id}
            onClick={() => {
              router.push(`/problem/${problem.id}`);
            }}
          >
            <TableCell>
              {!problem.isSolved ? (
                <CheckCircle className="size-5 ml-3 text-green-500" />
              ) : (
                <BsDash className="size-5 ml-3 text-yellow-500" />
              )}
            </TableCell>
            <TableCell>
              {problem.id}. {problem.title}
            </TableCell>
            <TableCell>
              {problem.difficulty === Difficulty.EASY ? (
                <span className="bg-green-500 text-white p-1 text-sm rounded-md">
                  Easy
                </span>
              ) : problem.difficulty === Difficulty.MEDIUM ? (
                <span className="bg-yellow-500 text-white p-1 text-sm rounded-md">
                  Medium
                </span>
              ) : (
                <span className="bg-red-500 text-white p-1 text-sm rounded-md">
                  Hard
                </span>
              )}
            </TableCell>
            <TableCell className="flex justify-center">
              {problem.lastSolver ? (
                <>
                  <Avatar className="size-5 mr-2">
                    <AvatarImage src={problem.lastSolver.image!} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                      {problem.lastSolver.name !== undefined
                        ? problem.lastSolver.name?.charAt(0)
                        : ""}
                    </AvatarFallback>
                  </Avatar>{" "}
                  {problem.lastSolver?.name}
                </>
              ) : (
                <BsDash className="size-5 text-yellow-500" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
