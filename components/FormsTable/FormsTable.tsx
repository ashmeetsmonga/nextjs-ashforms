"use client";

import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePenLine, Trash2 } from "lucide-react";
import { getFormsByUserID } from "@/app/actions/formActions";
import { formatDate } from "@/lib/utils";
import DeleteAlertDialog from "../DeleteAlertDialog";
import CompactToolTip from "../CompactToolTip";
import { useRecoilState } from "recoil";
import { formAtom } from "@/app/recoil/atom/formAtom";
import { useRouter } from "next/navigation";

const FormsTable = () => {
  const [formRecoilState, setFormRecoilState] = useRecoilState(formAtom);
  const deleteAlertDialogRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (formRecoilState.deleteFormId === "")
      getFormsByUserID()
        .then((data: any) => {
          setFormRecoilState((prev) => ({ ...prev, forms: data.data.forms }));
        })
        .catch((e) => console.log(e));
  }, [formRecoilState]);

  const handleDelete = (id: string) => {
    setFormRecoilState((prev) => ({ ...prev, deleteFormId: id }));
    deleteAlertDialogRef.current?.click();
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your created forms</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formRecoilState.forms.map((form, idx) => (
            <TableRow key={form.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{form.title}</TableCell>
              <TableCell>{formatDate(form.createdAt)}</TableCell>
              <TableCell>{formatDate(form.updatedAt)}</TableCell>
              <TableCell className="flex gap-2">
                <CompactToolTip component={<FilePenLine onClick={() => router.push(`/forms/${form.id}`)} />} title="Edit" />
                <CompactToolTip component={<Trash2 onClick={() => handleDelete(form.id)} />} title="Delete" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteAlertDialog deleteAlertDialogRef={deleteAlertDialogRef} />
    </>
  );
};

export default FormsTable;
