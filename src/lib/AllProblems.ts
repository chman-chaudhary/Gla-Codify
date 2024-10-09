import { Difficulty } from "@prisma/client";
import companies from "./Companies";

const AllProblems = [
  {
    id: "1",
    title: "Two Sum",
    slug: "two-sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: Difficulty.EASY,
    status: true,
    solution: "Solution 1",
    companies: ["Google", "Meta", "Amazon", "Apple"],
    topics: ["Array", "Hash Table", "Dynamic Programming"],
    testcases: [
      {
        input: [[2, 7, 11, 15], 9],
        output: [0, 1],
      },
    ],
    constraints: [
      "0 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    lastSolver: {
      name: "John Doe",
      image: "https://github.com/john-doe.png",
      email: "john-doe@gmail.com",
    },
  },
  {
    id: "2",
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    difficulty: Difficulty.MEDIUM,
    status: false,
    solution: "Solution 2",
    companies: ["Google", "Meta", "Amazon", "Apple"],
    topics: ["Linked List", "Math", "Recursion"],
    testcases: [
      {
        input: [
          [2, 4, 3],
          [5, 6, 4],
        ],
        output: [7, 0, 8],
      },
    ],
    constraints: [
      "0 <= l1.length, l2.length <= 100",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    lastSolver: {
      name: "John Doe",
      image: "https://github.com/john-doe.png",
      email: "john-doe@gmail.com",
    },
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: Difficulty.HARD,
    status: true,
    solution: null,
    companies: ["Google", "Meta", "Amazon", "Apple"],
    topics: ["String", "Hash Table", "Sliding Window"],
    testcases: [
      {
        input: ["abcabcbb"],
        output: 3,
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    lastSolver: {
      name: "John Doe",
      image: "https://github.com/john-doe.png",
      email: "john-doe@gmail.com",
    },
  },
];

export default AllProblems;
