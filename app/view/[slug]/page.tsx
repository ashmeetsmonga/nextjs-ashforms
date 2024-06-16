"use client";

import { formAtom } from "@/app/recoil/atom/formAtom";
import ViewForm from "@/components/ViewForm";
import { FormDetails } from "@/lib/types";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

const page = ({ params }: { params: { slug: string } }) => {
  const formRecoilState = useRecoilValue(formAtom);
  const selectedForm = formRecoilState.forms.filter((form) => form.id === params.slug)[0];
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: selectedForm.title,
    questions: JSON.parse(selectedForm.questions),
  });

  return <ViewForm formDetails={formDetails} mode="view" formId={params.slug} />;
};

export default page;
