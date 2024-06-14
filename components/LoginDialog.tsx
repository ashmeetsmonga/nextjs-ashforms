"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoginPayload } from "@/lib/types";
import { loginUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

const LoginDialog = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: LoginPayload = {
      email: "",
      password: "",
    };
    for (let [key, value] of formData.entries()) payload[key as keyof LoginPayload] = value as string;
    loginUser(payload)
      .then((data) => {
        console.log(data);
        router.push("/forms");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" />
          <Button>Login</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
