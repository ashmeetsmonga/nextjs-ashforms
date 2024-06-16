"use client";

import EditableForm from "@/components/EditableForm/EditableForm";
import ViewForm from "@/components/ViewForm";
import { Button } from "@/components/ui/button";
import { FormDetails } from "@/lib/types";
import React, { useState } from "react";

const page = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    questions: [],
  });
  const [previewForm, setPreviewForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setPreviewForm((prev) => !prev)}>Preview</Button>
      {!previewForm ? <EditableForm formDetails={formDetails} setFormDetails={setFormDetails} mode="create" /> : <ViewForm formDetails={formDetails} mode="preview" />}
    </div>
  );
};

export default page;
