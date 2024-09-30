"use server";

import prisma from "@/db/index";
import { Difficulty } from "@prisma/client";

interface ProblemData {
  title: string;
  description: string;
  companies: string[];
  difficulty: Difficulty;
  constraints: string;
  image?: string;
  testCases: {
    input: string;
    output: string;
  }[];
}

export async function addProblem(problemData: ProblemData) {
  const {
    title,
    description,
    companies,
    difficulty,
    constraints,
    image,
    testCases,
  } = problemData;

  try {
    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        companies,
        difficulty,
        constraints,
        image: image || undefined,
        testCases: {
          create: testCases.map((testCase) => ({
            input: testCase.input,
            output: testCase.output,
          })),
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding problem", error);
    return false;
  }
}
