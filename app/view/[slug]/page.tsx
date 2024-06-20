"use client";

import { getFormByID } from "@/app/actions/formActions";
import ViewForm from "@/components/ViewForm";
import { FormDetails } from "@/lib/types";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    questions: [],
  });

  useEffect(() => {
    getFormByID(params.slug).then((data: any) => {
      setFormDetails({
        title: data.data.form.title,
        questions: data.data.questions,
      });
    });
  }, []);

  return <ViewForm formDetails={formDetails} mode="view" formId={params.slug} />;
};

export default page;
