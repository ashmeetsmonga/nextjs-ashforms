"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { formAtom } from "@/app/recoil/atom/formAtom";
import { deleteFormByID } from "@/app/actions/formActions";

const DeleteAlertDialog = ({ deleteAlertDialogRef }: { deleteAlertDialogRef: any }) => {
  const [fd, setFd] = useRecoilState(formAtom);

  const handleDelete = () => {
    deleteFormByID(fd.deleteFormId)
      .then((data) => {
        setFd((prev) => ({ ...prev, deleteFormId: "" }));
      })
      .catch((e) => console.log(e));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={deleteAlertDialogRef}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete this form and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setFd((prev) => ({ ...prev, deleteFormId: "" }))}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
