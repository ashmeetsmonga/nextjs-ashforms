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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoginPayload, RegisterPayload } from "@/lib/types";
import { loginUser, registerUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/app/recoil/atom/userAtom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const LoginDialog = () => {
  const router = useRouter();
  const [_, setUserState] = useRecoilState(userAtom);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="w-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <AlertDialogDescription asChild>
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Login</CardTitle>
                  <CardDescription className="pt-1">Login into your account. Create a new account if you do not have one.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <form onSubmit={handleLoginSubmit} className="flex gap-4 flex-col justify-between items-end h-full">
                    <div className="space-y-4 w-full text-black">
                      <Input name="email" placeholder="Email" />
                      <Input name="password" type="password" placeholder="Password" />
                    </div>
                    <Button className="min-w-fit px-8">Login</Button>
                  </form>
                </CardContent>
              </Card>
            </AlertDialogDescription>
          </TabsContent>
          <TabsContent value="register">
            <AlertDialogDescription asChild>
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Register</CardTitle>
                  <CardDescription className="pt-1">Create a new account. Login into your account if you already have one</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <form onSubmit={handleRegisterSubmit} className="flex gap-4 flex-col items-end justify-between h-full">
                    <div className="space-y-4 w-full text-black">
                      <Input name="name" placeholder="Name" />
                      <Input name="email" placeholder="Email" />
                      <Input name="password" placeholder="Password" />
                    </div>
                    <Button className="min-w-fit px-8">Register</Button>
                  </form>
                </CardContent>
              </Card>
            </AlertDialogDescription>
          </TabsContent>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginDialog;
