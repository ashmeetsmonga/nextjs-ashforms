"use client";

import { createForm } from "@/app/actions/formActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateFormPayload, FormDetails, Question } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    questions: [],
  });

  const router = useRouter();

  const addTextQuestion = () => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions.push({
      title: "",
      type: "text",
      placeholder: "",
    });
    setFormDetails(newFormDetails);
  };

  const handleInputChange = (value: string, idx: number, key: string) => {
    const newFormDetails = { ...formDetails };
    if (key !== "options") newFormDetails.questions[idx][key as keyof Question] = value as any;
    setFormDetails(newFormDetails);
  };

  const handleSubmit = () => {
    const payload: CreateFormPayload = {
      title: formDetails.title,
      questions: JSON.stringify(formDetails.questions),
    };

    createForm(payload)
      .then((data) => {
        router.push("/forms");
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = (idx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions.splice(idx, 1);
    setFormDetails(newFormDetails);
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder="Enter form title"
        className="text-3xl font-bold p-8 pl-0 border-0 focus-visible:ring-0"
        value={formDetails.title}
        onChange={(e) => setFormDetails((prev) => ({ ...prev, title: e.target.value }))}
      />
      <Button className="w-fit" variant="outline" onClick={addTextQuestion}>
        Add Question
      </Button>
      <div className="flex flex-col gap-4">
        {formDetails.questions.map((ques, idx) => (
          <div key={idx} className="flex gap-4">
            <Trash2 className="mt-2 text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => handleDelete(idx)} />
            <div className="flex flex-col gap-2 flex-1">
              <Input placeholder="Enter the question" value={ques.title} onChange={(e) => handleInputChange(e.target.value, idx, "title")} />
              <Input placeholder="Enter the placeholder" value={ques.placeholder} className="text-muted-foreground" onChange={(e) => handleInputChange(e.target.value, idx, "placeholder")} />
            </div>
          </div>
        ))}
        <Button className="w-fit" onClick={handleSubmit}>
          Create Form
        </Button>
      </div>
    </div>
  );
};

export default page;
