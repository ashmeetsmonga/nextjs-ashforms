"use client";

import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";

const CookieWatcherProvider = () => {
  const cookieRef = useRef<NodeJS.Timeout | null>(null);
  const [_, setUserRecoilState] = useRecoilState(userAtom);

  useEffect(() => {
    if (cookieRef.current) clearInterval(cookieRef.current);
    cookieRef.current = setInterval(() => {
      const cookies = document.cookie;
      if (!cookies.includes("token")) setUserRecoilState({ name: "", email: "", id: "", showDialog: true });
    }, 250);
  }, []);

  return <></>;
};

export default CookieWatcherProvider;
