"use client";

import EditableForm from "@/components/EditableForm/EditableForm";
import ViewForm from "@/components/ViewForm";
import { Button } from "@/components/ui/button";
import { FormDetails } from "@/lib/types";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    questions: [],
  });
  const [previewForm, setPreviewForm] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[1000px]">
        <Button className="self-end" variant="ghost" onClick={() => setPreviewForm((prev) => !prev)}>
          <Eye className="mr-2" />
          Preview
        </Button>
        {!previewForm ? <EditableForm formDetails={formDetails} setFormDetails={setFormDetails} mode="create" /> : <ViewForm formDetails={formDetails} mode="preview" />}
      </div>
    </div>
  );
};

export default page;
