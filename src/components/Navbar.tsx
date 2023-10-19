"use client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  if (pathname !== "/studio") {
    return (
      <>
        <div className="navbar fixed left-0 top-0 z-[9]">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl hidden xl:inline-flex">
              Daniele Di Pinto
            </a>
          </div>
          <div className="navbar-end">
            <Link href="/" className="btn hidden xl:inline-flex">
              Vedi i post!
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
}

export default Navbar;
