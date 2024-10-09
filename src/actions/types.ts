import { Difficulty, Status } from "@prisma/client";

export type Problems = {
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

export type Problem = {
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
    id: number | undefined;
    code: string;
    status: Status;
    userId: string | null;
    problemId: number | null;
  }[]; // Array of submissions, possibly empty
};

export type NewProblem = {
  id: number; // Primary key for the problem
  title: string; // Problem title
  slug: string;
  description: string; // Problem description
  companies: string[]; // Array of companies associated with the problem
  constraints: string[] | null; // Problem constraints
  difficulty: Difficulty; // Difficulty as a string enum
  image: string | null; // Image URL, can be null
  isSolved: boolean | undefined; // Whether the user has solved the problem
  lastSolverId: string | null; // ID of the last solver, can be null if no one has solved
  topics: string[];
  visibleCode: string;
  examples: {
    image: string | null;
    input: string;
    output: string;
    explanation: string | null;
  }[];
  submissions: {
    id: number | undefined;
    code: string;
    status: Status;
    userId: string | null;
    problemId: number | null;
  }[]; // Array of submissions, possibly empty
};
