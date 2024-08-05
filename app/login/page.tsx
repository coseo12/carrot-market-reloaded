"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Login() {
  const [state, action] = useFormState(handleForm, {
    errors: [],
  });
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Log In with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={state.errors ?? []}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          errors={state.errors ?? []}
        />
        <FormBtn type="submit">LogIn</FormBtn>
      </form>
      <SocialLogin />
    </div>
  );
}
