"use client";

import Button from "@/components/clients/button";
import Input from "@/components/clients/input";
import SocialLogin from "@/components/clients/social-login";
import { createAccount } from "@/components/servers/sign-actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";

export default function CreateAccount() {
  const [state, dispetch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispetch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
          autoComplete="off"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
          autoComplete="off"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          autoComplete="off"
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirm_password}
          autoComplete="off"
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Button type="submit">Create Account</Button>
        <SocialLogin />
      </form>
    </div>
  );
}
