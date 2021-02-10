import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import { pageSectionCss } from "src/styles/pageSection";
import { verticalStackCss } from "src/styles/spacing";
import { DefaultLayout } from "src/components/layout/Default";

const logInFormCss = css`
  .cl-sign-in {
    background: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .cl-auth-form-header {
    display: none !important;
  }
`;

const LogInPage: NextPage = () => {
  return (
    <DefaultLayout mainCss={[verticalStackCss.l, pageSectionCss]}>
      <h1>Log into Decaft</h1>
      <div css={logInFormCss}>
        <SignIn routing="path" path="/log-in" signUpURL="/sign-up" />
      </div>
    </DefaultLayout>
  );
};
export default LogInPage;
