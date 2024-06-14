"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { FilePenLine, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { getFormsByUserID } from "@/app/actions/formActions";

const FormsTable = () => {
  const [formData, setFormData] = useState<any>([]);

  useEffect(() => {
    getFormsByUserID()
      .then((data: any) => {
        setFormData(data.data.forms);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
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
            <TableCell>{form.createdAt}</TableCell>
            <TableCell>{form.updatedAt}</TableCell>
            <TableCell className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`forms/${form.id}`}>
                      <FilePenLine />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`forms/dummy`}>
                      <Trash2 />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FormsTable;
