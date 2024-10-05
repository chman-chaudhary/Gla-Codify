"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function Test() {
  const [code, setCode] = useState<string>("");

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
        "x-rapidapi-key": "45b9847af7msh1281e5bd926cde7p12db9fjsn60354321f216",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id: 62,
        source_code: code,
        stdin: null,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      getSubmission(response.data.token);
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
        "x-rapidapi-key": "45b9847af7msh1281e5bd926cde7p12db9fjsn60354321f216",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      //   setCode(response.data.stdout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Editor
        defaultLanguage="java"
        theme="vs-dark"
        height={500}
        width={500}
        value={code}
        onChange={(value) => setCode(value as string)}
      />
      <Button onClick={() => runCode(code)}>Run</Button>
    </div>
  );
}
