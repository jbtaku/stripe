"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { ClassName } from "@/types/common";
import { FormFields, formSchema } from "../types/formSchema";
import { createAccount } from "../actions/createAccount";
import DropZoneField from "@/components/custom-ui/DropZoneField";

function CreateAccountForm({ className }: ClassName) {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstNameKanji: "a",
      lastNameKanji: "a",
      firstNameKana: "a",
      lastNameKana: "a",
      email: "a",
      phone: "08012345678",
      addrZip: "a",
      addrKanjiState: "a",
      addrKanaState: "a",
      addrKanjiCity: "a",
      addrKanaCity: "a",
      addrKanjiTown: "a",
      addrKanaTown: "a",
      addrKanjiLine1: "a",
      addrKanaLine1: "a",
      addrKanjiLine2: "a",
      addrKanaLine2: "a",
      accountNumber: "a",
      bankCode: "a",
      branchCode: "a",
      accountHolderName: "a",
    },
  });

  const onSubmit = async (data: FormFields) => {
    const createAccountWithFormData = createAccount.bind(null, data);
    await createAccountWithFormData();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${className} mx-auto w-4/5 min-w-[320px] space-y-6 [&_input]:h-8 [&_input]:!mt-1
        text-xl 3xs:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:border-b-4 [&_h3]:border-green-500
        [&_h3]:inline-block [&_h3]:mt-6 [&_h3]:mb-4`}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="lastNameKanji"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">姓</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="firstNameKanji"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastNameKana"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">せい</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="firstNameKana"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">めい</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="dob"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">生年月日</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="block w-full">
                    <Button
                      variant={"outline"}
                      className="text-left font-normal px-3 flex input-area aria-expanded:bg-sky-300/20 aria-expanded:border-green-600"
                    >
                      {field.value
                        ? format(field.value, "PPP(E)", { locale: ja })
                        : ""}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    locale={ja}
                    captionLayout="dropdown-buttons"
                    fromYear={1920}
                    toYear={new Date().getFullYear()}
                    defaultMonth={new Date(2000, 0)}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">電話番号</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <DropZoneField
            label="本人確認書類（表面）"
            name="verifyDocFront"
            control={form.control}
            setValue={form.setValue}
          />
          <DropZoneField
            label="本人確認書類（裏面）"
            name="verifyDocBack"
            control={form.control}
            setValue={form.setValue}
          />
        </div>
        <div
          className="[&>h4]:text-lg [&>h4]:font-semibold [&>h4]:border-l-8
        [&>h4]:pl-1 [&>h4]:border-blue-400 [&>h4]:mt-6
        [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-x-4 [&>div]:!mt-3"
        >
          <h3>住所</h3>
          <h4 className="!mt-2">郵便番号</h4>
          <div>
            <FormField
              name="addrZip"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h4>都道府県</h4>
          <div>
            <FormField
              name="addrKanjiState"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">漢字</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="addrKanaState"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">かな</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h4>市区町村</h4>
          <div>
            <FormField
              name="addrKanjiCity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">漢字</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="addrKanaCity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">かな</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h4>町域、丁目など</h4>
          <div>
            <FormField
              name="addrKanjiTown"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">漢字</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="addrKanaTown"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">かな</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h4>番地</h4>
          <div>
            <FormField
              name="addrKanjiLine1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">漢字</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="addrKanaLine1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">かな</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h4>建物名・部屋番号</h4>
          <div>
            <FormField
              name="addrKanjiLine2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">漢字</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="addrKanaLine2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">かな</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <h3>口座情報</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            name="bankCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">銀行コード</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="branchCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">支店コード</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="accountNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">口座番号</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="accountHolderName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">口座名義</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center mt-4">
          <Button type="submit" className="text-lg px-8 py-5">
            申請する
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateAccountForm;
