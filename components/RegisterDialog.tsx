"use client";

import React, { useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RegisterPayload } from "@/lib/types";
import { registerUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

const RegisterDialog = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: RegisterPayload = {
      name: "",
      email: "",
      password: "",
    };
    for (let [key, value] of formData.entries()) payload[key as keyof RegisterPayload] = value as string;
    registerUser(payload)
      .then((data) => {
        console.log(data);
        router.push("/forms");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <Input name="name" placeholder="Name" />
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" />
          <Button>Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
