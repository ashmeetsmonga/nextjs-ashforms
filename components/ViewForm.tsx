import { FormDetails, ResponsePayload } from "@/lib/types";
import React, { FC, useState } from "react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { addResponse } from "@/app/actions/responseActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

interface ViewFormProps {
  formDetails: FormDetails;
  formId?: string;
  mode: "preview" | "view";
}
const ViewForm: FC<ViewFormProps> = ({ formDetails, formId, mode }) => {
  const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastID = toast.loading("Submitting Response");
    const formData = new FormData(e.currentTarget);
    const ansArray: any = [];
    for (let [key, value] of formData.entries()) {
      const idx = parseInt(key);
      if (Array.isArray(ansArray[idx])) ansArray[idx].push(value as string);
      else if (ansArray[idx]) ansArray[idx] = [ansArray[idx], value];
      else ansArray.push(value);
    }

    const payload: ResponsePayload = {
      formId: formId as string,
      answers: JSON.stringify(ansArray),
    };
    addResponse(payload)
      .then((data) => {
        toast.dismiss(toastID);
        setIsFormSubmittedSuccessfully(true);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e?.response?.data?.message || "Something went wrong", { id: toastID });
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold mb-10">{formDetails.title}</h1>
      {isFormSubmittedSuccessfully && (
        <Alert>
          <Rocket className="h-4 w-4" />
          <AlertTitle>Submission Successful! </AlertTitle>
          <AlertDescription>Your form has been submitted successfully. We appreciate your input & will process it shortly. Thank you for your time</AlertDescription>
        </Alert>
      )}
      {!isFormSubmittedSuccessfully && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {formDetails.questions.map((ques, idx) => (
            <>
              {ques.type === "text" && (
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{ques.title}</p>
                  <Input name={idx.toString()} placeholder={ques.placeholder} className="border-none text bg-gray-100" />
                </div>
              )}
              {ques.type === "radio" && (
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{ques.title}</p>
                  <RadioGroup name={idx.toString()}>
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
                  <p className="text-xl font-semibold">{ques.title}</p>
                  {ques.options?.map((option, checkboxIdx) => (
                    <div key={option} className="flex gap-2 items-center">
                      <Checkbox name={idx.toString()} id={option} value={option} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}

          {mode === "view" && <Button type="submit">Submit</Button>}
        </form>
      )}
    </div>
  );
};

export default ViewForm;
