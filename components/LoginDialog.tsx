"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoginPayload } from "@/lib/types";
import { loginUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/app/recoil/atom/userAtom";

const LoginDialog = () => {
  const router = useRouter();
  const [_, setUserState] = useRecoilState(userAtom);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: LoginPayload = {
      email: "",
      password: "",
    };
    for (let [key, value] of formData.entries()) payload[key as keyof LoginPayload] = value as string;
    loginUser(payload)
      .then((data: any) => {
        setUserState(data.data);
        console.log(data.data, "ashmeet");
        setIsOpen(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
              <Input name="email" placeholder="Email" />
              <Input name="password" placeholder="Password" />
              <Button>Login</Button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginDialog;
