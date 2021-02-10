import React from "react";
import { SignedIn, SignIn } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import { Link } from "src/components/Link";
import { Redirect } from "src/components/Redirect";
import { pageSectionCss } from "src/styles/pageSection";
import { verticalStackCss } from "src/styles/spacing";

const logInFormCss = css`
  .cl-sign-in {
    background: none;
    padding: 0 !important;
  }
  .cl-auth-form-header {
    display: none !important;
  }
`;

const LogInPage: NextPage = () => {
  return (
    <div css={[verticalStackCss.l, pageSectionCss]}>
      <SignedIn>
        <Redirect to="/" />
      </SignedIn>
      <h1>Log into Decaft</h1>
      <p>
        <span>Don&rsquo;t have an account?</span>{" "}
        <Link href="/sign-up">Sign up instead</Link>
      </p>
      <div css={logInFormCss}>
        <SignIn routing="path" path="/log-in" />
      </div>
    </div>
  );
};
export default LogInPage;
