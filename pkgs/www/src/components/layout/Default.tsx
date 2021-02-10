import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { css, Interpolation } from "@emotion/react";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { pageSectionCss } from "src/styles/pageSection";
import { horizontalStackCss } from "src/styles/spacing";
import { Link } from "src/components/Link";

const logoCss = css`
  font-weight: 700;
  font-size: 1.2rem;
`;

const navListCss = css`
  list-style-type: none;
  display: flex;
`;

interface DefaultLayoutBaseProps {
  mainCss?: Interpolation<unknown>;
}
type DefaultLayoutProps = PropsWithChildren<DefaultLayoutBaseProps>;

export function DefaultLayout(props: DefaultLayoutProps): JSX.Element {
  return (
    <div>
      <Head>
        <title>Decaft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        css={[horizontalStackCss.l, { alignItems: "center" }, pageSectionCss]}
      >
        <Link href="/">
          <span css={logoCss}>Decaft</span>
        </Link>

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
                <UserButton userProfileURL="/me" signInURL="/log-in" />
              </li>
            </SignedIn>
          </ul>
        </nav>
      </header>

      <main css={props.mainCss}>{props.children}</main>
    </div>
  );
}
