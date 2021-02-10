import { SignIn } from "@clerk/clerk-react";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return <SignIn routing="path" path="/sign-in" />;
};
export default SignInPage;
