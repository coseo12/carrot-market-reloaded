"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/constants";
import { z } from "zod";

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })
      .min(USERNAME_MIN_LENGTH, "Username must be at least 3 characters")
      .max(USERNAME_MAX_LENGTH, "Username must be at most 10 characters")
      .toLowerCase()
      .trim()
      .transform((username) => {
        return `🥕${username}🥕`;
      }),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Password must be at least 4 characters")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Confirm Password must be at least 4 characters"
      ),
  })
  .refine(checkPassword, {
    message: "password does not match",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
