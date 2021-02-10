import { useClerk } from "@clerk/clerk-react";
import useSWR, { responseInterface } from "swr";

export function useFetchWithAuthSession<Data, Error>(
  url: string
): responseInterface<Data, Error> {
  const { session } = useClerk();
  if (!session) {
    throw new Error("Cannot useClerkSWR when there is no session.");
  }
  const sessionId = session.id;

  // The fetcher is not included as part of useSWR's cache key,
  // so we must append clerk session ID directly to the URL
  const urlWithSession = new URL(url, window.location.href);
  urlWithSession.searchParams.set("_clerk_session_id", sessionId);

  return useSWR<Data, Error>(urlWithSession.toString(), (request, options) =>
    fetch(request, { ...options, credentials: "include" }).then((r) => r.json())
  );
}
