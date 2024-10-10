"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const testcases = [
  {
    id: 0,
    input: [
      { label: "num1", value: "0" },
      { label: "num2", value: "0" },
    ],
    output: "0",
  },
  {
    id: 1,
    input: [
      { label: "num1", value: "1" },
      { label: "num2", value: "0" },
    ],
    output: "1",
  },
  {
    id: 2,
    input: [
      { label: "num1", value: "0" },
      { label: "num2", value: "1" },
    ],
    output: "1",
  },
  {
    id: 3,
    input: [
      { label: "num1", value: "1000" },
      { label: "num2", value: "500" },
    ],
    output: "1500",
  },
  {
    id: 4,
    input: [
      { label: "num1", value: "95" },
      { label: "num2", value: "5" },
    ],
    output: "100",
  },
];

export const TestCase = ({ response }: { response: any }) => {
  const [visibleTestCase, setVisibleTestCase] = useState(0);

  return (
    <div>
      <h2 className="text-md font-semibold text-secondary-foreground ml-4 my-1">
        Testcases
      </h2>
      <Separator className="my-1" />
      <div className="flex gap-x-4 px-2 py-1">
        {testcases.map((testcase) => {
          return (
            <div key={testcase.id}>
              <div
                className={
                  `rounded-md px-3 py-1 hover:bg-secondary` +
                  (visibleTestCase === testcase.id
                    ? " bg-secondary text-white"
                    : "")
                }
                onClick={() => setVisibleTestCase(testcase.id)}
              >
                <span
                  className={
                    `text-sm font-semibold` +
                    (response != null &&
                    response[testcase.id].status.description === "Accepted"
                      ? " text-green-500"
                      : " text-red-500")
                  }
                >
                  Case {testcase.id + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {testcases.map((testcase) => {
          if (visibleTestCase === testcase.id) {
            return (
              <div key={testcase.id} className="px-4 py-2">
                {response != null &&
                  response[testcase.id].status.description !== "Accepted" &&
                  response[testcase.id].compile_output != null && (
                    <ShowError
                      label={response[testcase.id].status.description}
                      errorMessage={response[testcase.id].compile_output}
                    />
                  )}
                {testcase.input.map((input) => {
                  return (
                    <ShowInput
                      label={input.label}
                      text={input.value.toString()}
                    />
                  );
                })}
                {response != null && response[testcase.id].stdout != null && (
                  <ShowError
                    label="Output"
                    errorMessage={response[testcase.id].stdout}
                  />
                )}
                <ShowInput
                  label="Expected output"
                  text={testcase.output.toString()}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

const ShowInput = ({ text, label }: { text: string; label: string }) => {
  return (
    <>
      <Label className="text-md font-semibold">{label} :</Label>
      <div className="mb-4 mt-2 text-md bg-secondary px-3 py-2 rounded-lg flex items-center justify-start">
        <code>{text}</code>
      </div>
    </>
  );
};

const ShowError = ({
  label,
  errorMessage,
}: {
  label: string;
  errorMessage: string;
}) => {
  return (
    <>
      <Label className="text-md font-semibold">{label} :</Label>
      <div className="mb-4 mt-2 text-md bg-secondary px-3 py-2 rounded-lg">
        {errorMessage.split("\n").map((message) => {
          return <pre>{message}</pre>;
        })}
      </div>
    </>
  );
};
