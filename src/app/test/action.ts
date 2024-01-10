"use server"

import prisma from "@/lib/prisma/prisma"

export const testAction = async (a:any) => {
    const test = await prisma.user.findMany()
    console.log(test)
    console.log(a)
}