import { chromium } from "playwright-chromium";
import { writeFile } from "fs/promises";
import { join } from "path";
import { URL } from "url";
import { partition } from "fp-ts/Array";
import { pipe } from "fp-ts/function";

/**
 * Hostnames without leading www of large coffee stores, not craft stuff
 */
const MASS_MARKET_HOSTNAMES = new Set([
  "doutor.co.jp",
  "starbucks.co.jp",
  "tullys.co.jp",
  "kaldi.co.jp",
  "keycoffee.co.jp",
  "yanaka-coffeeten.com",
  "kohikan.jp",
]);

function normalizedHostnameForUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/(?:www\.)?/, "");
  } catch (err: unknown) {
    console.warn(`Found invalid URL: ${url}`);
    return null;
  }
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://mamenavi.info/tokyo/");
  const results = (
    await Promise.all(
      (await page.$$(".rnk1item >> tr")).map(async (elem) => ({
        title: await (await elem.$(".ttitle"))?.textContent(),
        websiteUrl: (
          await Promise.all(
            (await elem.$$(".ttitle ~ a")).map(
              async (linkElem) => await linkElem.textContent()
            )
          )
        ).find((url) => url?.startsWith("http") && url),
      }))
    )
  ).map((result) => ({
    ...result,
    normalizedHostname: result.websiteUrl
      ? normalizedHostnameForUrl(result.websiteUrl)
      : null,
  }));

  const missingTitleRemoved = results.filter((r) => Boolean(r.title));
  if (missingTitleRemoved.length !== results.length) {
    console.info(
      `${
        results.length - missingTitleRemoved.length
      } entries were missing a title`
    );
  }
  const websiteCounts: Record<string, number> = {};
  for (const { normalizedHostname } of results) {
    if (!normalizedHostname) {
      continue;
    }
    websiteCounts[normalizedHostname] =
      (websiteCounts[normalizedHostname] || 0) + 1;
  }

  const popularWebsiteCountsSorted = Object.entries(websiteCounts)
    .filter(([, count]) => count > 3)
    .sort((a, b) => b[1] - a[1])
    .map(([url, count]) => ({ url, count }));

  const { left: remainingResults, right: massMarketResults } = pipe(
    missingTitleRemoved,
    partition((r) =>
      r.normalizedHostname
        ? MASS_MARKET_HOSTNAMES.has(r.normalizedHostname)
        : false
    )
  );

  await writeFile(
    join(__dirname, "..", "output.json"),
    JSON.stringify(
      {
        popularWebsiteCountsSorted,
        massMarketResults,
        remainingResults,
      },
      null,
      2
    )
  );

  await browser.close();
}

main().then(() => {
  console.log("done");
});
