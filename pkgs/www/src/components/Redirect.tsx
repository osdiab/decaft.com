import { useRouter } from "next/router";
import { useEffect } from "react";

export function Redirect(props: { to: string }): null {
  const router = useRouter();
  useEffect(() => {
    router.replace(props.to);
  }, []);

  return null;
}
