"use client";

import { userAtom } from "@/app/recoil/atom/userAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LoginDialog from "./LoginDialog";

const ProtectedRoutes = ({ children, isValidToken, userData }: { children: React.ReactNode; isValidToken: boolean; userData: any }) => {
  const [_, setUserRecoilState] = useRecoilState(userAtom);
  const [showLoginRegisterForm, setShowLoginRegisterForm] = useState(!isValidToken);

  useEffect(() => {
    if (!isValidToken) setShowLoginRegisterForm(true);
    else {
      setUserRecoilState({ id: userData?.id, email: userData?.email, name: "" });
    }
  }, []);

  return (
    <>
      {showLoginRegisterForm && <LoginDialog />}
      {children}
    </>
  );
};

export default ProtectedRoutes;
