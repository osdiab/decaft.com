import { SignUp } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import { DefaultLayout } from "src/components/layout/Default";
import { pageSectionCss } from "src/styles/pageSection";
import { verticalStackCss } from "src/styles/spacing";

const signUpFormCss = css`
  .cl-sign-up {
    background: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .cl-auth-form-header {
    display: none !important;
  }
`;

const SignUpPage: NextPage = () => {
  return (
    <DefaultLayout mainCss={[verticalStackCss.l, pageSectionCss]}>
      <h1>Sign up for Decaft</h1>
      <div css={signUpFormCss}>
        <SignUp routing="path" path="/sign-up" signInURL="/log-in" />
      </div>
    </DefaultLayout>
  );
};
export default SignUpPage;
