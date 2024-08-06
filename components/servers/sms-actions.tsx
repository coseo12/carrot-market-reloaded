"use server";

import { redirect } from "next/navigation";
import { typeToFlattenedError, z } from "zod";
import validator from "validator";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

export interface ActionState {
  token: boolean;
  error?: typeToFlattenedError<string, string>;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone_number");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
        error: undefined,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
