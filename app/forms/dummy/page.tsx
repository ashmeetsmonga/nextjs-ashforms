"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 1 characters",
  }),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Can't leave it as empty question" }),
        placeholder: z.string(),
      })
    )
    .optional(),
});

const InputForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", data);
  };

  const { fields, append } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  return (
    <div className="m-24">
      <Form {...form}>
        {" "}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Type Form Title" className="text-3xl py-8 border-0 font-bold" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              append({ placeholder: "", text: "" });
              console.log(fields);
            }}
          >
            Add Question
          </Button>
          <div>
            {fields.map((field, idx) => (
              <div className="flex flex-col gap-4 mt-6 last:mb-6" key={field.id}>
                <FormField
                  control={form.control}
                  name={`questions.${idx}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Type a question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`questions.${idx}.placeholder`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Type placholder text" className="text-muted-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <Button type="submit" size="sm">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InputForm;
