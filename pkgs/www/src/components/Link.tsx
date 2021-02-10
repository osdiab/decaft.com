import * as React from "react";
import { useRouter } from "next/router";
import RouterLink, { LinkProps as RouterLinkProps } from "next/link";
import { css } from "@emotion/react";

import { format } from "url";
import { palette } from "src/styles/palette";

export enum LinkAppearance {
  HYPERLINK = "HYPERLINK",
  UNSTYLED = "UNSTYLED",
}

export interface LinkProps extends React.PropsWithChildren<RouterLinkProps> {
  appearance?: LinkAppearance;
}

const hyperlinkCss = css`
  display: inline-block; // prevents wrapping unless necessary
  color: ${palette.primary};
  transition: color 0.1s ease-in;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${palette.primaryHighlight};
  }
`;
const unstyledLinkCss = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

function logInvalidAppearance(appearance: never) {
  console.log(
    `Invalid link appearance: '${appearance}'. Rendering as hyperlink.`
  );
}

const AbsoluteLink = ({ href, appearance, children }: LinkProps) => {
  const hrefStr = format(href);

  switch (appearance) {
    default:
      logInvalidAppearance(appearance);
    // fallthrough
    case undefined: // fallthrough
    case LinkAppearance.HYPERLINK:
      return (
        <a css={hyperlinkCss} href={hrefStr}>
          {children}
        </a>
      );
    case LinkAppearance.UNSTYLED:
      return (
        <a css={unstyledLinkCss} href={hrefStr}>
          {children}
        </a>
      );
  }
};

const RelativeLink = ({ href: hrefUrl, appearance, children }: LinkProps) => {
  const router = useRouter();
  const href =
    typeof hrefUrl === "string"
      ? hrefUrl
      : [hrefUrl.pathname || router.pathname, hrefUrl.search, hrefUrl.hash]
          .filter(Boolean)
          .join("");
  switch (appearance) {
    default:
      logInvalidAppearance(appearance);
    // fallthrough
    case undefined: // fallthrough
    case LinkAppearance.HYPERLINK:
      return (
        <RouterLink href={href}>
          <a css={hyperlinkCss}>{children}</a>
        </RouterLink>
      );
    case LinkAppearance.UNSTYLED:
      return (
        <RouterLink href={href}>
          <a css={unstyledLinkCss}>{children}</a>
        </RouterLink>
      );
  }
};

function urlIsRelative(url: LinkProps["href"]): boolean {
  if (typeof url === "string") {
    return url.startsWith("/"); // for the purposes of this app, this works
  }
  return Boolean(url.host || url.hostname);
}

/**
 * A link to external content.
 */
export const Link = (props: LinkProps): JSX.Element => {
  return urlIsRelative(props.href) ? (
    <RelativeLink {...props} />
  ) : (
    <AbsoluteLink {...props} />
  );
};
