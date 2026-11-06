"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const cookie of allCookies) {
    cookieStore.set(cookie.name, "", {
      expires: new Date(0),
      path: "/",
    });
  }

  redirect("/login");
}
