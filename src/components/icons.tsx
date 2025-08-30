import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-hidden="true"
      {...props}
      className={cn("h-8 w-auto", props.className)}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M188.4 46.2a16 16 0 0 0-13.8-8.2H81.4a16 16 0 0 0-13.8 8.2L24.8 120.4a16 16 0 0 0 0 15.2l42.8 74.2a16 16 0 0 0 13.8 8.2h93.2a16 16 0 0 0 13.8-8.2l42.8-74.2a16 16 0 0 0 0-15.2Z"
        opacity=".2"
      />
      <path
        fill="currentColor"
        d="M188.4 38a16 16 0 0 0-13.8-8H81.4a16 16 0 0 0-13.8 8L24.8 112.4a16 16 0 0 0 0 15.2l42.8 74.2a16 16 0 0 0 13.8 8h93.2a16 16 0 0 0 13.8-8l42.8-74.2a16 16 0 0 0 0-15.2Zm-1.6 14.8L144 128l42.8 74.2-42.8 74.2H81.4L38.6 201.2 81.4 128 38.6 52.8h93.2ZM81.4 46h93.2l-46.6 80.8L81.4 46Zm0 164h93.2L128 129.2 81.4 210Z"
      />
    </svg>
  );
}
