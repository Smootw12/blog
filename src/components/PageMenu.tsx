import Link from "next/link";
import MenuContent from "./MenuContent";

async function Menu() {
  return (
    <div className="fixed w-[224px] mt-[200px] ml-12 -mr-[200px] mx-auto hidden xl:inline-block">
      <div className="mb-8 px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-block hover:opacity-80">
            <h1 className="font-title text-base-content text-xl font-extrabold">
              Blog Scolastico
            </h1>
          </Link>{" "}
          <div className="tooltip tooltip-right" data-tip="RSS">
            <a target="_blank" className="hover:text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z"></path>
                <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </a>
          </div>
        </div>{" "}
        <p className="text-base-content/60 text-xs italic">
          Updates, ideas and resources
        </p>
      </div>{" "}
      <ul className="menu menu-horizontal lg:menu-vertical lg:w-56">
        <MenuContent />
      </ul>
    </div>
  );
}

export default Menu;
