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
import { deleteFormByID, getFormsByUserID } from "@/app/actions/formActions";

const DeleteAlertDialog = ({ deleteAlertDialogRef }: { deleteAlertDialogRef: any }) => {
  const [formRecoilState, setFormRecoilState] = useRecoilState(formAtom);

  const handleDelete = () => {
    deleteFormByID(formRecoilState.deleteFormId)
      .then((data) => {
        getFormsByUserID().then((data: any) => {
          setFormRecoilState((prev) => ({ ...prev, forms: data.data.forms }));
        });
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
          <AlertDialogCancel onClick={() => setFormRecoilState((prev) => ({ ...prev, deleteFormId: "" }))}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
