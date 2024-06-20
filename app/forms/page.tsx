import FormsTable from "@/components/FormsTable/FormsTable";
import LoginDialog from "@/components/LoginRegisterDialog";
import { Button } from "@/components/ui/button";
import { isValidToken } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//Shows a list of forms user created along with button to create form
const FormsPage = async () => {
  // const token = cookies().get("token")?.value;
  // const isUserLoggedIn = await isValidToken(token as string);
  return (
    <>
      {/* {!isUserLoggedIn && <LoginDialog />} */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1000px] space-y-8">
          <Link className="self-start" href={`forms/create`}>
            <Button>Create New Form</Button>
          </Link>
          <FormsTable />
        </div>
      </div>
    </>
  );
};

export default FormsPage;
