"use client";

import Button from "@/components/common/clients/button";
import Input from "@/components/common/clients/input";
import SocialLogin from "@/components/app/create-account/clients/social-login";
import { useFormState } from "react-dom";
import {
  type ActionState,
  smsLogin,
} from "@/components/app/sms/servers/sms-actions";

const initialState: ActionState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispetch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispetch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            type="number"
            name="token"
            placeholder="Verification code"
            errors={state?.error?.formErrors}
            autoComplete="off"
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            type="number"
            name="phone_number"
            placeholder="Phone number"
            required
            errors={state?.error?.formErrors}
            autoComplete="off"
          />
        )}
        <Button type="submit">
          {state.token ? "Verify Token" : "Send Verification SMS"}
        </Button>
      </form>
      <SocialLogin />
    </div>
  );
}
