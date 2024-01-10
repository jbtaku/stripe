"use client";

import React from "react";
import { testAction } from "./action";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import DropZoneField from "@/components/custom-ui/DropZoneField";

function page() {
  const formSchema = z.object({
    test: z.string().min(1, "必須項目です。"),
    image: z
      .instanceof(File)
      .optional()
      .refine((file) => file, "*必須項目です"),
  });
  type FormFields = z.infer<typeof formSchema>
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { test: "" },
  });
  const onSubmit = async(data: FormFields) => {
    await testAction(data)
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>
              <Input type="text" {...field} />
              <FormMessage/>
            </FormItem>
          )}
        />
        <DropZoneField
          label="test"
          name="image"
          control={form.control}
          setValue={form.setValue}
        />
        <button type="submit">button</button>
      </form>
    </Form>
  );
}

export default page;
