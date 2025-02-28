import { NextResponse } from "next/server";

export const setSession = (response: NextResponse, access_token: string) => {
  try {
    response.cookies.set("session", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return response.ok;
  } catch (err) {
    throw new Error(`Unable to set cookies ${err}`);
  }
};
