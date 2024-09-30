"use server";

import prisma from "@/db/index";
import { Status } from "@prisma/client";

export default async function getProblems(
  userEmail: string,
  problemId: number
) {
  const problems = await prisma.problem.findUnique({
    where: {
      id: problemId,
    },
    include: {
      submissions: true,
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

  const isSolved = user?.submissions.some(
    (submission) =>
      submission.problemId === problemId && submission.status === Status.AC
  );

  return {
    ...problems,
    isSolved,
  };
}
