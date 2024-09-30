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

export const CodeEditor = ({ problem }: { problem: NewProblem }) => {
  const [code, setCode] = useState<string>(problem.visibleCode);
  // const [language, setLanguage] = useState<string>("javascript");

  useEffect(() => {
    setCode(problem.visibleCode);
  }, [problem.visibleCode]);

  return (
    <div className="h-full w-full">
      {/* <p>{language}</p> */}
      {/* <TopBar setLanguage={setLanguage} /> */}
      <TopBar />
      <Editor
        defaultLanguage="java"
        defaultValue={code}
        theme="vs-dark"
        className="h-full w-full"
      />
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex items-center justify-end sticky bottom-0 pb-2 gap-3 pr-2">
      <Button className="bg-gray-600 font-semibold hover:bg-gray-700">
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

const TopBar = () => {
  return (
    <h3 className="flex items-center gap-x-1 pl-2 py-[0.5px] sticky top-0 bg-gray-700 text-slate-300">
      <span>
        <Code2 className="text-green-500 size-5" />
      </span>
      Code
    </h3>
  );
};

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
