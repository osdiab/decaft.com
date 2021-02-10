import { useClerk } from "@clerk/clerk-react";
import { NextPage } from "next";
import { DefaultLayout } from "src/components/layout/Default";
import { pageSectionCss } from "src/styles/pageSection";
import { verticalStackCss } from "src/styles/spacing";

const Home: NextPage = () => {
  return (
    <DefaultLayout mainCss={[pageSectionCss, verticalStackCss.m]}>
      <h1>Your decaffeinated coffee companion</h1>
      <p>Coming soon!</p>
    </DefaultLayout>
  );
};

export default Home;
