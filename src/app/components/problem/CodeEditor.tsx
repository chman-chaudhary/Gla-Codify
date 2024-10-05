"use client";

import { NewProblem } from "@/actions/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { Code, Code2, RepeatIcon } from "lucide-react";
import { useState, useEffect } from "react";

type CodeEditorProps = {
  problem: NewProblem;
  onRunCode: (code: string) => void;
};

export const CodeEditor = ({ problem, onRunCode }: CodeEditorProps) => {
  const [code, setCode] = useState<string>(problem.visibleCode);
  // const [language, setLanguage] = useState<string>("javascript");
  const [hiddenCode, setHiddenCode] = useState<string>(problem.hiddenCode);

  useEffect(() => {
    setCode(problem.visibleCode);
  }, [problem.visibleCode]);

  return (
    <div className="h-full w-full bg-gray-700">
      <Editor
        defaultLanguage="java"
        defaultValue={code}
        theme="vs-dark"
        className="h-full w-full"
        onChange={(value) => setCode(value as string)}
        options={{
          minimap: { enabled: false },
        }}
      />
      <Footer onRunCode={onRunCode} code={code} />
    </div>
  );
};

type FooterProps = {
  onRunCode: (code: string) => void;
  code: string;
};

const Footer = ({ onRunCode, code }: FooterProps) => {
  return (
    <div className="flex items-center justify-end sticky bottom-0 pb-2 gap-3 pr-4">
      <Button
        className="bg-gray-600 font-semibold hover:bg-gray-700"
        onClick={() => onRunCode(code)}
      >
        Run
      </Button>
      <Button className="bg-green-600 font-semibold hover:bg-green-700">
        Submit
      </Button>
    </div>
  );
};

// type TopBarProps = {
//   setLanguage: (state: string) => void;
// };

// const SelectLanguage = ({
//   setLanguage,
// }: {
//   setLanguage: (state: string) => void;
// }) => {
//   return (
//     <Select
//       defaultValue="javascript"
//       onValueChange={(value) => setLanguage(value)}
//     >
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a language" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Languages</SelectLabel>
//           <SelectItem value="java">Java</SelectItem>
//           <SelectItem value="javascript">JavaScript</SelectItem>
//           <SelectItem value="python">Python</SelectItem>
//           <SelectItem value="cpp">C/C++</SelectItem>
//           <SelectItem value="c">C</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };
