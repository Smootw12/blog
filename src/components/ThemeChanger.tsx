"use client";

import { themes, defaultTheme } from "@/lib/themes";
import ThemeItem from "./ThemeItem";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

type Props = {};

function ThemeChanger({}: Props) {
  const cookies = useCookies();

  const [theme, setTheme] = useState<(typeof themes)[number]>(
    cookies.get("theme") || defaultTheme
  );

  return (
    <div title="Change Theme" className="dropdown dropdown-end ">
      <div tabIndex={0} className="btn normal-case btn-ghost">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-current md:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>{" "}
        <span className="hidden font-normal md:inline">Theme</span>{" "}
        <svg
          width="12px"
          height="12px"
          className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>{" "}
      <div className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-16">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {themes.map((themeItem) => (
            <ThemeItem
              changeTheme={(themeItem: (typeof themes)[number]) => {
                document
                  .querySelector("html")!
                  .setAttribute("data-theme", themeItem);
                setTheme(themeItem);
                cookies.set("theme", themeItem);
              }}
              theme={themeItem}
              key={themeItem}
              active={themeItem === theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeChanger;
