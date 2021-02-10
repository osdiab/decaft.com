import { css } from "@emotion/react";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/ReadonlyRecord";

function makeVerticalStackCss(sizePx: number) {
  return css`
    display: flex;
    flex-direction: column;
    > *:not(:last-child) {
      margin-bottom: ${sizePx}px;
    }
  `;
}

function makeHorizontalStackCss(sizePx: number) {
  return css`
    display: flex;
    > *:not(:last-child) {
      margin-right: ${sizePx}px;
    }
  `;
}

const spacingPx = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
  xxl: 48,
} as const;

export const verticalStackCss = pipe(spacingPx, map(makeVerticalStackCss));
export const horizontalStackCss = pipe(spacingPx, map(makeHorizontalStackCss));
