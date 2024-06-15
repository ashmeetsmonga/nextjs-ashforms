"use client";

import EditableForm from "@/components/EditableForm/EditableForm";
import { FormDetails } from "@/lib/types";
import React, { useState } from "react";

const page = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    questions: [],
  });

  return <EditableForm formDetails={formDetails} setFormDetails={setFormDetails} mode="create" />;
};

export default page;
