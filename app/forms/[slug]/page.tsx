"use client";

import { getFormByID } from "@/app/actions/formActions";
import { formAtom } from "@/app/recoil/atom/formAtom";
import EditableForm from "@/components/EditableForm/EditableForm";
import { FormDetails } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[1000px]">
        <EditableForm formDetails={formDetails} setFormDetails={setFormDetails} mode="edit" id={params.slug} />
      </div>
    </div>
  );
};

export default page;
