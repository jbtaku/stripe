"use server"

import { stripe } from "@/lib/stripe/stripe";
import { FormFields } from "../types/formSchema";

export const createAccount = async (props: FormFields) => {
  try {
    const phone = "+81" + props.phone.slice(1);
    const front = await stripe.files.create({
      file: {
        data: "",//readFileSync("public/images/common/dummy.jpg"),
        name: "test.jpg",
        type: "image/*",
      },
      purpose: "identity_document",
    });
    const back = await stripe.files.create({
      file: {
        data: "",//readFileSync("public/images/common/logo.png"),
        name: "test.jpg",
        type: "image/*",
      },
      purpose: "identity_document",
    });
    const account = await stripe.accounts.create({
      type: "custom",
      country: "JP",
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        mcc: "5815",
        url: "https://www.aivo.co.jp/",
        product_description: "商品の説明です",
      },
      individual: {
        first_name_kana: props.firstNameKana,
        last_name_kana: props.lastNameKana,
        first_name_kanji: props.firstNameKanji,
        last_name_kanji: props.lastNameKanji,
        dob: { year: 2000, month: 1, day: 1 },
        address_kana: {
          line2: props.addrKanaLine2,
          line1: props.addrKanaLine1,
          postal_code: props.addrZip,
          city: props.addrKanaCity,
          town: props.addrKanaCity,
          state: props.addrKanaState,
        },
        address_kanji: {
          line2: props.addrKanjiLine2,
          line1: props.addrKanjiLine1,
          postal_code: props.addrZip,
          city: props.addrKanjiCity,
          town: props.addrKanjiCity,
          state: props.addrKanjiState,
        },
        email: props.email,
        phone: phone,
        verification: {
          document: {
            front: front.id,
            back: back.id,
          },
        },
      },
      external_account: {
        object: "bank_account",
        account_number: "0001234",
        routing_number: "1100000", //銀行コード+支店コード
        account_holder_name: props.accountHolderName,
        currency: "jpy",
        country: "JP",
      },
      tos_acceptance: { date: Math.floor(Date.now() / 1000), ip: "8.8.8.8" },
    });
    //prisma accountId を　dbに紐付け
  } catch (e) {
    console.log(e);
  }
};
