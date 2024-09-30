"use client";

import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

export const CodeEditor = () => {
  return (
    <Editor
      className="h-full w-full"
      defaultLanguage="javascript"
      defaultValue={`console.log("Hello World!");`}
      theme="vs-dark"
    />
  );
};
