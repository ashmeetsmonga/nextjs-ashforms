"use client";

import React, { FC, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

interface QuestionCommandProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewQuestion: (type: string) => void;
}

const QuestionCommand: FC<QuestionCommandProps> = ({ open, setOpen, addNewQuestion }) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Select the type of question or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => {
              addNewQuestion("text");
              setOpen(false);
            }}
          >
            Text Question
          </CommandItem>
          <CommandItem
            onSelect={() => {
              addNewQuestion("radio");
              setOpen(false);
            }}
          >
            Multipe Choice Question
          </CommandItem>
          <CommandItem
            onSelect={() => {
              addNewQuestion("checkbox");
              setOpen(false);
            }}
          >
            Checkbox Question
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default QuestionCommand;
