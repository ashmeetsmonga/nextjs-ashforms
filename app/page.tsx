import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold tracking-tight text-center w-1/2 capitalize">Easier and quicker way to build forms</h1>
      <p className="mt-4 text-gray-500 text-lg">Simple form builder. Publish your form in less than 5 mins</p>
      <Link href="/forms">
        <Button className="mt-4">Create Form</Button>
      </Link>
      <div className="flex justify-center mt-16">
        <Image alt="hero image form" height={1000} width={1000} src={"/home-image.png"} className="shadow-2xl" />
      </div>
      <div className="mt-16">
        <p className="text-2xl font-semibold py-3 border-b-2">Ashforms with simple features</p>
        <ul className="space-y-4 mt-4">
          <li className="text-gray-500">1. Quick form creation in under 1 minute</li>
          <li className="text-gray-500">2. Easy publication and viewing of responses with charts</li>
          <li className="text-gray-500">3. Data exports to excel file</li>
          <li className="text-gray-500">4. Support for short answer, multiple choice & single choice questions</li>
        </ul>
      </div>
    </div>
  );
}
