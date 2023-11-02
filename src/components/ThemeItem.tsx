"use client";
import { themes } from "@/lib/themes";

type Props = {
  active: boolean;
  theme: (typeof themes)[number];
  changeTheme: (theme: string) => void;
};

function ThemeItem({ changeTheme, theme, active }: Props) {
  return (
    <button
      className="outline-base-content overflow-hidden rounded-lg text-left"
      onClick={() => changeTheme(theme)}
    >
      <span
        data-theme={theme}
        className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
      >
        <span className="grid grid-cols-5 grid-rows-3">
          <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={"h-3 w-3 shrink-0" + (!active && " invisible")}
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </svg>{" "}
            <span className="flex-grow text-sm">{theme}</span>{" "}
            <span
              className="flex h-full flex-shrink-0 flex-wrap gap-1"
              data-svelte-h="svelte-dkjulf"
            >
              <span className="bg-primary w-2 rounded"></span>{" "}
              <span className="bg-secondary w-2 rounded"></span>{" "}
              <span className="bg-accent w-2 rounded"></span>{" "}
              <span className="bg-neutral w-2 rounded"></span>{" "}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

export default ThemeItem;
