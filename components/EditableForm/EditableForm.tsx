"use client";

import { createForm, updateForm } from "@/app/actions/formActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateFormPayload, FormDetails, Question, UpdateFormPayload } from "@/lib/types";
import { Circle, Plus, Square, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import QuestionCommand from "../QuestionCommand";

interface EditableFormProps {
  formDetails: FormDetails;
  setFormDetails: React.Dispatch<React.SetStateAction<FormDetails>>;
  mode: string;
  id?: string;
}
const EditableForm: FC<EditableFormProps> = ({ formDetails, setFormDetails, mode, id }) => {
  const [openQuestionCommand, setOpenQuestionCommand] = useState(false);
  const router = useRouter();

  const addNewQuestion = (type: string) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions.push({
      title: "",
      type: type,
      placeholder: "",
      options: [""],
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
      questions: formDetails.questions,
    };

    createForm(payload)
      .then((data) => {
        router.push("/forms");
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateSubmit = () => {
    const payload: UpdateFormPayload = {
      id: id!,
      title: formDetails.title,
      questions: formDetails.questions,
    };

    updateForm(payload)
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

  const addNewRadioOption = (questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options?.push("");
    setFormDetails(newFormDetails);
  };

  const handleRadioOptionChange = (value: string, optionIdx: number, questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options![optionIdx] = value;
    setFormDetails(newFormDetails);
  };

  const deleteRadioOption = (optionIdx: number, questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options?.splice(optionIdx, 1);
    setFormDetails(newFormDetails);
  };

  const addNewCheckboxOption = (questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options?.push("");
    setFormDetails(newFormDetails);
  };

  const handleCheckboxOptionChange = (value: string, optionIdx: number, questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options![optionIdx] = value;
    setFormDetails(newFormDetails);
  };

  const deleteCheckboxOption = (optionIdx: number, questionIdx: number) => {
    const newFormDetails = { ...formDetails };
    newFormDetails.questions[questionIdx].options?.splice(optionIdx, 1);
    setFormDetails(newFormDetails);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <Input
          placeholder="Enter form title"
          className="text-5xl font-semibold tracking-tight p-8 pl-0 border-0 focus-visible:ring-0"
          value={formDetails.title}
          type="text"
          onChange={(e) => setFormDetails((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Button className="w-fit" variant="outline" onClick={() => setOpenQuestionCommand(true)}>
          Add Question
        </Button>
        <div className="flex flex-col gap-4">
          {formDetails.questions.map((ques, idx) => (
            <div key={idx} className="flex gap-4">
              <Trash2 className="mt-2 text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => handleDelete(idx)} />
              {ques.type === "text" && (
                <div className="flex flex-col gap-2 flex-1">
                  <Input placeholder="Enter the question" value={ques.title} onChange={(e) => handleInputChange(e.target.value, idx, "title")} className="border-none font-semibold text-xl" />
                  <Input
                    placeholder="Enter a placeholder for the response"
                    value={ques.placeholder}
                    className="text-muted-foreground ml-2 w-1/2"
                    onChange={(e) => handleInputChange(e.target.value, idx, "placeholder")}
                  />
                </div>
              )}
              {ques.type === "radio" && (
                <div className="flex flex-col gap-2 flex-1">
                  <Input placeholder="Enter the question" value={ques.title} onChange={(e) => handleInputChange(e.target.value, idx, "title")} className="border-none font-semibold text-xl" />
                  <div>
                    {ques.options?.map((option, optionIdx) => (
                      <div key={optionIdx} className="flex gap-2 items-center">
                        {optionIdx === 0 ? (
                          <Plus size={28} className="text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => addNewRadioOption(idx)} />
                        ) : (
                          <Trash2 className="ml-1 text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => deleteRadioOption(optionIdx, idx)} />
                        )}
                        <Circle />
                        <Input placeholder="Enter Option" value={option} onChange={(e) => handleRadioOptionChange(e.target.value, optionIdx, idx)} className="border-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {ques.type === "checkbox" && (
                <div className="flex flex-col gap-2 flex-1">
                  <Input placeholder="Enter the question" value={ques.title} onChange={(e) => handleInputChange(e.target.value, idx, "title")} className="border-none font-semibold text-xl" />
                  <div>
                    {ques.options?.map((option, optionIdx) => (
                      <div key={optionIdx} className="flex gap-2 items-center">
                        {optionIdx === 0 ? (
                          <Plus size={28} className="text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => addNewCheckboxOption(idx)} />
                        ) : (
                          <Trash2 className="ml-1 text-muted-foreground hover:text-black cursor-pointer transition-colors" onClick={() => deleteCheckboxOption(optionIdx, idx)} />
                        )}
                        <Square />
                        <Input placeholder="Enter Option" value={option} onChange={(e) => handleCheckboxOptionChange(e.target.value, optionIdx, idx)} className="border-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {mode === "create" && (
            <Button className="w-fit" onClick={handleSubmit}>
              Create Form
            </Button>
          )}
          {mode === "edit" && (
            <Button className="w-fit" onClick={handleUpdateSubmit}>
              Update Form
            </Button>
          )}
        </div>
      </div>
      <QuestionCommand addNewQuestion={addNewQuestion} open={openQuestionCommand} setOpen={setOpenQuestionCommand} />
    </>
  );
};

export default EditableForm;
