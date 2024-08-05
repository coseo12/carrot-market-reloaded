"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log("??", prevState, formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    errors: ["wrong password", "password too short"],
  };
};
