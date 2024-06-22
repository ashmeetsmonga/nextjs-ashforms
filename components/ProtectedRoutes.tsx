"use client";

import { userAtom } from "@/app/recoil/atom/userAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LoginDialog from "./LoginRegisterDialog";

const ProtectedRoutes = ({ children, isValidToken, userData }: { children: React.ReactNode; isValidToken: boolean; userData: any }) => {
  const [userRecoilState, setUserRecoilState] = useRecoilState(userAtom);

  useEffect(() => {
    if (!isValidToken) setUserRecoilState({ ...userRecoilState, showDialog: true });
    else {
      setUserRecoilState({ id: userData?.id, email: userData?.email, name: "", showDialog: false });
    }
  }, []);

  return (
    <>
      <LoginDialog />
      {children}
    </>
  );
};

export default ProtectedRoutes;
