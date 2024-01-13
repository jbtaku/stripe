"use server"

import { FormFields } from "./page"

export const testAction = async (FormData: FormFields) => {
    console.log(FormData.image)
    console.log(FormData.test)
}