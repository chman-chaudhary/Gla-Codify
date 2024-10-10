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
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

type CodeEditorProps = {
  problem: NewProblem;
  onRunCode: (code: string, languageId: string) => void;
};

export const CodeEditor = ({ problem, onRunCode }: CodeEditorProps) => {
  const { theme, systemTheme } = useTheme();

  const [code, setCode] = useState<string>(problem.visibleCode);
  const [languageId, setLanguageId] = useState<string>("java");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCode(problem.visibleCode);
  }, [problem.visibleCode]);

  return (
    <div className="h-full w-full">
      <SelectLanguage setLanguage={setLanguageId} />
      <Editor
        defaultLanguage="java"
        defaultValue={code}
        theme={
          theme === "system"
            ? systemTheme === "dark"
              ? "vs-dark"
              : "default"
            : theme === "dark"
            ? "vs-dark"
            : "default"
        }
        className="h-full w-full"
        onChange={(value) => setCode(value as string)}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastColumn: 3,
        }}
      />
      <Footer
        onRunCode={onRunCode}
        code={code}
        languageId={languageId}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

type FooterProps = {
  onRunCode: (code: string, languageId: string) => void;
  code: string;
  languageId: string;
  setIsLoading: (state: boolean) => void;
  isLoading: boolean;
};

const Footer = ({
  onRunCode,
  code,
  languageId,
  setIsLoading,
  isLoading,
}: FooterProps) => {
  return (
    <div className="flex items-center justify-end sticky bottom-0 pb-2 gap-3 pr-4">
      <Button
        variant="secondary"
        className="font-semibold text-secondary-foreground"
        onClick={async () => {
          setIsLoading(true);
          try {
            await onRunCode(code, languageId);
          } catch (error) {
            console.error("Error while execution of code:", error);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run"}
      </Button>
      <Button
        variant="outline"
        className="bg-green-600 font-semibold text-white hover:bg-green-700"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          try {
            await onRunCode(code, languageId);
          } catch (error) {
            console.error("Error while execution of code:", error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

type TopBarProps = {
  setLanguage: (state: string) => void;
};

const SelectLanguage = ({ setLanguage }: TopBarProps) => {
  return (
    <div className="p-1">
      <Select defaultValue="java" onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
