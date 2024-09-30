"use server";

import prisma from "@/db/index";
import { Status } from "@prisma/client";

export default async function getProblems(userEmail: string) {
  const problems = await prisma.problem.findMany({
    include: {
      submissions: true,
      lastSolver: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    include: {
      submissions: true,
    },
  });

  const response = problems.map((problem) => {
    const isSolved = user?.submissions.some(
      (submission) =>
        submission.problemId === problem.id && submission.status === Status.AC
    );
    return {
      ...problem,
      isSolved,
    };
  });

  return response;
}
