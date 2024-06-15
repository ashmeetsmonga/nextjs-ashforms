"use client";

import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { FilePenLine, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { getFormsByUserID } from "@/app/actions/formActions";
import { formatDate } from "@/lib/utils";
import DeleteAlertDialog from "../DeleteAlertDialog";
import CompactToolTip from "../CompactToolTip";
import { useRecoilState } from "recoil";
import { formAtom } from "@/app/recoil/atom/formAtom";

const FormsTable = () => {
  const [formData, setFormData] = useState<any>([]);
  const deleteAlertDialogRef = useRef<HTMLDialogElement | null>(null);

  const [fd, setFD] = useRecoilState(formAtom);

  useEffect(() => {
    if (fd.deleteFormId === "")
      getFormsByUserID()
        .then((data: any) => {
          setFormData(data.data.forms);
        })
        .catch((e) => console.log(e));
  }, [fd]);

  const handleDelete = (id: string) => {
    setFD((prev) => ({ ...prev, deleteFormId: id }));
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
          {formData.map((form: any, idx: number) => (
            <TableRow key={form.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{form.title}</TableCell>
              <TableCell>{formatDate(form.createdAt)}</TableCell>
              <TableCell>{formatDate(form.updatedAt)}</TableCell>
              <TableCell className="flex gap-2">
                <CompactToolTip component={<FilePenLine />} title="Edit" />
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
