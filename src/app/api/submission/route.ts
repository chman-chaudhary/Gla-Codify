import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getProblem } from "@/actions/problem";

export async function POST(req: NextRequest) {
  const { code, languageId, problemSlug } = await req.json();

  const problem = await getProblem(problemSlug, languageId);
  problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    code
  );
  const sourceCodes: string[] = [];
  problem.inputs.map((input) => {
    let code = problem.fullBoilerplateCode;
    input.split("\r\n").map((i, idx) => {
      code = code.replace(`##input_${idx}##`, i);
    });
    sourceCodes.push(code);
  });

  const createSubmissionOptions = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "45b9847af7msh1281e5bd926cde7p12db9fjsn60354321f216",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions: sourceCodes.map((code, idx) => ({
        language_id: 62,
        source_code: code,
        expected_output: problem.outputs[idx],
      })),
    },
  };

  try {
    const response = await axios.request(createSubmissionOptions);
    let tokens: any = [];
    response.data.map((tokenObj: { token: string }) => {
      tokens.push(tokenObj.token);
    });
    tokens = tokens.join(",");
    const result = await checkBatchStatus(tokens);
    return NextResponse.json({ result });
  } catch (e) {
    console.log("Error while creating submission", e);
  }
}

const checkBatchStatus = async (tokens: string): Promise<any[]> => {
  try {
    const submissions = await getSubmission(tokens);
    let inProgress = false;
    submissions.forEach((submission: any) => {
      if (
        submission.status.description === "In Queue" ||
        submission.status.description === "Processing"
      ) {
        inProgress = true;
      }
    });

    if (inProgress) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(checkBatchStatus(tokens)), 2000);
      });
    } else {
      return submissions;
    }
  } catch (error) {
    console.error("Error fetching batch statuses:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// export const executeCode = async (code: string, slug: string) => {
//   const response = await runCode(code, slug);
//   return response;
// };

// const runCode = async (code: string, problemId: string) => {
//   const problem = await getProblem(problemId, "java");
//   problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
//     "##USER_CODE_HERE##",
//     code
//   );
//   const options = {
//     method: "POST",
//     url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
//     params: {
//       base64_encoded: "false",
//     },
//     headers: {
//       "x-rapidapi-key": "45b9847af7msh1281e5bd926cde7p12db9fjsn60354321f216",
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     data: {
//       submissions: problem.inputs.map((input, index) => ({
//         language_id: 62,
//         source_code: problem.fullBoilerplateCode.replace(
//           "##INPUT_FILE_INDEX##",
//           index.toString()
//         ),
//         expected_output: problem.outputs[index],
//       })),
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     console.log("Create Submission", response.data);
//     let tokens: any = [];
//     response.data.map((tokenObj: { token: string }) => {
//       tokens.push(tokenObj.token);
//     });
//     tokens = tokens.join(",");
//     const result = await getSubmission(tokens);
//     result.map((res: any) => {
//       console.log({
//         expected: res.expected_output,
//         stdout: res.stdout,
//         status: res.status,
//         language: res.language,
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

const getSubmission = async (tokens: string) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: tokens,
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "45b9847af7msh1281e5bd926cde7p12db9fjsn60354321f216",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.submissions;
  } catch (error) {
    console.error(error);
  }
};
