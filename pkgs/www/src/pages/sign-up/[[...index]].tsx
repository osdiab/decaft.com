import { SignedIn, SignUp } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import Link from "next/link";
import { Redirect } from "src/components/Redirect";
import { pageSectionCss } from "src/styles/pageSection";
import { verticalStackCss } from "src/styles/spacing";

const signUpFormCss = css`
  .cl-sign-up {
    background: none;
    padding: 0 !important;
  }
  .cl-auth-form-header {
    display: none !important;
  }
`;

const SignUpPage: NextPage = () => {
  return (
    <div css={[verticalStackCss.l, pageSectionCss]}>
      <SignedIn>
        <Redirect to="/" />
      </SignedIn>
      <h1>Sign up for Decaft</h1>
      <p>
        <span>Already have an account?</span>{" "}
        <Link href="/log-in">Log in instead</Link>
      </p>
      <div css={signUpFormCss}>
        <SignUp routing="path" path="/sign-up" />
      </div>
    </div>
  );
};
export default SignUpPage;
