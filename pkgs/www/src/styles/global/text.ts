import { css } from "@emotion/react";
import { mediaQueries } from "src/styles/mediaQueries";
import { palette } from "src/styles/palette";

const boldCss = css`
  font-weight: 700;
`;

export const globalTextStyles = css`
  p,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  h1 {
    font-size: 3rem;
    @media (max-width: ${mediaQueries.sizes.phoneLarge}) {
      font-size: 1.8rem;
    }

    ${boldCss};
  }

  h2 {
    font-size: 1.5 rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }

  h1,
  h2 {
    line-height: 1.25;
  }

  h3 {
    ${boldCss};
  }

  h4,
  h5,
  h6 {
    color: ${palette.secondaryText};
  }
`;

export const compositionTextCss = css`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }
  }
`;
