"use server";

import axios from "axios";
import fs from "fs";

const MOUNT_PATH = "src/problems";

export const executeCode = async (code: string, slug: string) => {
  const response = await runCode(code, slug);
  return response;
};

const runCode = async (code: string, problemId: string) => {
  const problem = await getProblem(problemId, "java");
  problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    code
  );
  const options = {
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
      submissions: problem.inputs.map((input, index) => ({
        language_id: 62,
        source_code: problem.fullBoilerplateCode.replace(
          "##INPUT_FILE_INDEX##",
          index.toString()
        ),
        expected_output: problem.outputs[index],
      })),
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Create Submission", response.data);
    let tokens: any = [];
    response.data.map((tokenObj: { token: string }) => {
      tokens.push(tokenObj.token);
    });
    tokens = tokens.join(",");
    const result = await getSubmission(tokens);
    result.map((res: any) => {
      console.log({
        expected: res.expected_output,
        stdout: res.stdout,
        status: res.status,
        language: res.language,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

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

export const getProblem = async (problemId: string, languageId: any) => {
  const fullBoilderPlate = await getProblemFullBoilerplateCode(
    problemId,
    languageId
  );
  const inputs = await getProblemInputs(problemId);
  const outputs = await getProblemOutputs(problemId);

  return {
    id: problemId,
    fullBoilerplateCode: fullBoilderPlate,
    inputs: inputs,
    outputs: outputs,
  };
};

async function getProblemFullBoilerplateCode(
  problemId: string,
  languageId: any
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      `${MOUNT_PATH}/${problemId}/boilerplate-full/function.${languageId}`,
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

async function getProblemInputs(problemId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${problemId}/tests/inputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${problemId}/tests/inputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  }
                );
              });
            })
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      }
    );
  });
}

async function getProblemOutputs(problemId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${problemId}/tests/outputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${problemId}/tests/outputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  }
                );
              });
            })
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      }
    );
  });
}
