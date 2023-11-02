import { Github, Menu, Undo2 } from "lucide-react";
import Link from "next/link";
import MenuContent from "./MenuContent";
import ThemeChanger from "./ThemeChanger";

function Navbar() {
  return (
    <>
      <div className="navbar fixed left-0 top-0 z-[21] bg-opacity-[0.95] bg-base-100 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-sm">
        <div className="navbar-start">
          <Link
            href="https://github.com/Smootw12"
            className="btn btn-ghost normal-case text-xl repeat-animation hidden xl:inline-flex"
          >
            <Github />
          </Link>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-square btn-ghost xl:hidden">
              <Menu />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[30] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <MenuContent />
            </ul>
          </div>
        </div>
        <div className="navbar-end space-x-4">
          <ThemeChanger />

          <Link href="/" className="btn btn-primary hidden xl:inline-flex">
            Torna alla home!
          </Link>
          <Link
            href="/"
            className="btn btn-ghost normal-case inline-flex xl:hidden"
          >
            <Undo2 />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;

//
