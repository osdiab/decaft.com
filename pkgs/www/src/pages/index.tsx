import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import Head from "next/head";
import { Link } from "src/components/Link";
import { pageSectionCss } from "src/styles/pageSection";
import { horizontalStackCss, verticalStackCss } from "src/styles/spacing";

const logoCss = css`
  font-weight: 700;
  font-size: 1.2rem;
`;

const navListCss = css`
  list-style-type: none;
  display: flex;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Decaft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        css={[horizontalStackCss.l, { alignItems: "center" }, pageSectionCss]}
      >
        <span css={logoCss}>Decaft</span>

        <nav>
          <ul
            css={[navListCss, horizontalStackCss.m, { alignItems: "center" }]}
          >
            <SignedOut>
              <li>
                <Link href="/log-in">Log in</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign up</Link>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </SignedIn>
          </ul>
        </nav>
      </header>

      <main css={[pageSectionCss, verticalStackCss.m]}>
        <h1>Your decaffeinated coffee companion</h1>
        <p>Coming soon!</p>
      </main>
    </div>
  );
};

export default Home;
