import { UserProfile } from "@clerk/clerk-react";
import { NextPage } from "next";
import { DefaultLayout } from "src/components/layout/Default";

const SignUpPage: NextPage = () => {
  return (
    <DefaultLayout>
      <UserProfile />
    </DefaultLayout>
  );
};
export default SignUpPage;
