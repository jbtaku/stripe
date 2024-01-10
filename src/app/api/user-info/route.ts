import prisma from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession();
  const id = session?.user.id;
  if (session) {
    const userInfo = await prisma.user.findFirst({ where: { id } });
    return NextResponse.json(userInfo);
  } else {
    return NextResponse.json(null);
  }
};
