"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsBuildingsFill } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import companies from "@/lib/Companies";
import { addProblem } from "@/actions/addProblem";
import { FcPlus } from "react-icons/fc";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Difficulty } from "@prisma/client";

export default function ComboboxDemo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [image, setImage] = useState("");
  const [constraints, setConstraints] = useState("");
  const [testCases, setTestCases] = useState<
    Array<{ input: string; output: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await addProblem({
      title,
      description,
      companies,
      difficulty,
      image,
      constraints,
      testCases,
    });

    if (response) {
      toast({
        title: "Successfully",
        description: "Problem added successfully",
      });

      router.push("/");
    } else {
      toast({
        title: "Error",
        description: "Failed to add problem",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    setLoading(false);
  };

  const handleTestCaseInputChange = (index: number, value: string) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].input = value;
    setTestCases(updatedTestCases);
  };

  const handleTestCaseOutputChange = (index: number, value: string) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].output = value;
    setTestCases(updatedTestCases);
  };

  const handleAddTestCase = () => {
    if (testCases.length < 100) {
      setTestCases([...testCases, { input: "", output: "" }]);
    }
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[90%] mx-auto mt-20">
      <Card className="px-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Problem</CardTitle>
          <CardDescription className="text-md">
            Add a new problem to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-5 space-y-2">
              <Label className="ml-1 text-md font-medium">Problem Title</Label>
              <Input
                placeholder="3 SUM"
                className="text-md font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="mb-5 space-y-2">
              <Label className="ml-1 text-md font-medium">
                Problem Description
              </Label>
              <Textarea
                placeholder="Problem Description"
                className="text-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="flex justify-between mb-5">
              <SelectCompany setCompanies={setCompanies} />
              <Select
                onValueChange={(value) => setDifficulty(value as Difficulty)}
                required
              >
                <SelectTrigger className="w-[250px] text-md">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value={Difficulty.EASY}>Easy</SelectItem>
                    <SelectItem value={Difficulty.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={Difficulty.HARD}>Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-5 space-y-2">
              <Label className="ml-1 text-md font-medium">Image URL</Label>
              <Input
                placeholder="Image URL (if any)"
                className="text-md"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mb-5 space-y-2">
              <Label className="ml-1 text-md font-medium">Constraints</Label>
              <Textarea
                placeholder={`0 < n <= 100\n0 <= nums[i] <= 1000`}
                className="text-md"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div>
              {testCases.map((testCase, index) => (
                <div key={index} className="mb-4 space-y-2 ml-1">
                  <Label className="text-md">Test Case {index + 1}</Label>
                  <Input
                    type="text"
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseInputChange(index, e.target.value)
                    }
                    placeholder={`Test Case ${index + 1} Input`}
                    className="mb-2 text-md"
                    disabled={loading}
                    required
                  />
                  <Input
                    type="text"
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseOutputChange(index, e.target.value)
                    }
                    placeholder={`Test Case ${index + 1} Output`}
                    className="mb-2 text-md"
                    disabled={loading}
                    required
                  />
                  {index > 0 && (
                    <Button
                      onClick={() => handleRemoveTestCase(index)}
                      className="ml-1"
                      variant={"destructive"}
                    >
                      <Trash className="mr-2 size-4" /> Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                onClick={handleAddTestCase}
                className="ml-1 mb-6"
                variant="outline"
                disabled={loading}
              >
                <FcPlus className="mr-2 size-4" /> Add Test Case
              </Button>
            </div>
            <Button
              size="lg"
              className="text-md font-semibold"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              Add Problem
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

type SelectCompanyProps = {
  setCompanies: (state: React.SetStateAction<string[]>) => void;
};

const SelectCompany = ({ setCompanies }: SelectCompanyProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setCompanies((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[250px] w-fit max-w-[300px] justify-between text-md font-medium"
          >
            {selectedValues.length > 0
              ? selectedValues
                  .map(
                    (value) =>
                      companies.find((company) => company.value === value)
                        ?.value
                  )
                  .join(", ")
              : "Select Company..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 h-[300px] overflow-y-auto">
          <Command>
            <CommandInput placeholder="Search Company...." />
            <CommandList>
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                {companies.map((company) => (
                  <CommandItem
                    className="text-md"
                    key={company.value}
                    value={company.value}
                    onSelect={() => {
                      handleSelect(company.value);
                      // You can optionally close the dropdown after selection
                      // setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(company.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {company.logo ? (
                      company.logo
                    ) : (
                      <BsBuildingsFill className="mr-2 size-6" />
                    )}{" "}
                    {company.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
