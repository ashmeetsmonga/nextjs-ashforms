import { FormDetails } from "@/lib/types";
import React, { FC } from "react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

interface ViewFormProps {
  formDetails: FormDetails;
}
const ViewForm: FC<ViewFormProps> = ({ formDetails }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">{formDetails.title}</h1>
      <div className="space-y-4">
        {formDetails.questions.map((ques, idx) => (
          <>
            {ques.type === "text" && (
              <div className="space-y-2">
                <p className="font-semibold">{ques.title}</p>
                <Input placeholder={ques.placeholder} />
              </div>
            )}
            {ques.type === "radio" && (
              <div className="space-y-2">
                <p className="font-semibold">{ques.title}</p>
                <RadioGroup className="">
                  {ques.options?.map((option, idx) => (
                    <div key={option} className="flex gap-2 items-center">
                      <RadioGroupItem value={option} />
                      <p>{option}</p>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            {ques.type === "checkbox" && (
              <div className="space-y-2">
                <p className="font-semibold">{ques.title}</p>
                {ques.options?.map((option, idx) => (
                  <div key={option} className="flex gap-2 items-center">
                    <Checkbox id={option} />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewForm;
