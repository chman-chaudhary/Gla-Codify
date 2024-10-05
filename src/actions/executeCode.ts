"use server";

import axios from "axios";

export const executeCode = async (code: string) => {
  const response = await runCode(code);
  return response;
};

const runCode = async (code: string) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",
      wait: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY!,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST!,
      "Content-Type": "application/json",
    },
    data: {
      language_id: 62,
      source_code: code,
      stdin: null,
    },
  };

  try {
    const submission = await axios.request(options);
    // console.log(submission.data);
    console.log(
      "------------------------------Code submitted------------------------------"
    );
    const result = await getSubmission(submission.data.token);
    return result;
  } catch (error) {
    console.error("Error while submitting code", error);
  }
};

const getSubmission = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${id}`,
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY!,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST!,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    console.log(
      "------------------------------Code executed------------------------------"
    );
    //   setCode(response.data.stdout);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
