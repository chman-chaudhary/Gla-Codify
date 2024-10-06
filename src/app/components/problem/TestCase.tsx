"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const testcases = [
  {
    id: 1,
    input: [
      { label: "nums", value: "[1, 2]" },
      { label: "target", value: 3 },
    ],
    output: "[3, 1]",
  },
  {
    id: 2,
    input: [
      { label: "nums", value: "[2, 3]" },
      { label: "target", value: 5 },
    ],
    output: "[5, 2]",
  },
];

export const TestCase = () => {
  const [visibleTestCase, setVisibleTestCase] = useState(1);

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
                  `rounded-md px-2 py-[2px] hover:bg-gray-500/60` +
                  (visibleTestCase === testcase.id
                    ? " bg-gray-500/60 text-white"
                    : "")
                }
                onClick={() => setVisibleTestCase(testcase.id)}
              >
                <span className="text-sm font-semibold">
                  Case {testcase.id}
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
                {testcase.input.map((input) => {
                  return (
                    <div key={input.label}>
                      <Label className="text-md font-semibold">
                        {input.label} :
                      </Label>
                      <Input
                        placeholder={input.value.toString()}
                        className="mb-4 mt-2 text-md"
                      />
                    </div>
                  );
                })}
                <Label className="text-md font-semibold">Output :</Label>
                <Input
                  placeholder={testcase.output.toString()}
                  className="mb-4 mt-2 text-md"
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
