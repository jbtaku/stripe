import { z } from "zod";

export const formSchema = z.object({
  firstNameKana: z.string().min(1, "*必須項目です"),
  lastNameKana: z.string().min(1, "*必須項目です"),
  firstNameKanji: z.string().min(1, "*必須項目です"),
  lastNameKanji: z.string().min(1, "*必須項目です"),
  dob: z.date({ required_error: "*必須項目です" }),
  email: z
    .string()
    .min(1, "*必須項目です")
    .email("メールアドレスの形式が正しくありません"),
  phone: z
    .string()
    .min(1, "*必須項目です")
    .regex(/[0-9]/, "半角数字で入力してください"),
  addrZip: z.string().min(1, "*必須項目です"),
  addrKanaLine2: z.string().optional(),
  addrKanaLine1: z.string().min(1, "*必須項目です"),
  addrKanaTown: z.string().min(1, "*必須項目です"),
  addrKanaCity: z.string().min(1, "*必須項目です"),
  addrKanaState: z.string().min(1, "*必須項目です"),
  addrKanjiLine2: z.string().optional(),
  addrKanjiLine1: z.string().min(1, "*必須項目です"),
  addrKanjiTown: z.string().min(1, "*必須項目です"),
  addrKanjiCity: z.string().min(1, "*必須項目です"),
  addrKanjiState: z.string().min(1, "*必須項目です"),
  verifyDocFront: z.instanceof(File).optional().refine((file) => file, "*必須項目です"),
  verifyDocBack: z.instanceof(File).optional().refine((file) => file, "*必須項目です"),
  accountNumber: z.string().min(1, "*必須項目です"),
  bankCode: z.string().min(1, "*必須項目です"),
  branchCode: z.string().min(1, "*必須項目です"),
  accountHolderName: z.string().min(1, "*必須項目です"),
});

export type FormFields = z.infer<typeof formSchema>;
