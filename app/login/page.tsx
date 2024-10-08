"use client";

import Button from "@/components/common/clients/button";
import Input from "@/components/common/clients/input";
import SocialLogin from "@/components/app/login/clients/social-login";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { login } from "@/components/app/login/servers/login-actions";

export default function Login() {
  const [state, dispetch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Log In with email and password</h2>
      </div>
      <form action={dispetch} className="flex flex-col gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password}
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="off"
        />
        <Button type="submit">LogIn</Button>
      </form>
      <SocialLogin />
    </div>
  );
}
