import FormsTable from "@/components/FormsTable/FormsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//Shows a list of forms user created along with button to create form
const FormsPage = () => {
  return (
    <div>
      <Link href={`forms/${crypto.randomUUID()}`}>
        <Button>Create New Form</Button>
      </Link>
      <FormsTable />
    </div>
  );
};

export default FormsPage;
