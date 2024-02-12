"use client";
import Image from "next/image";
import { User } from "@/types/types";
import { signOut } from "next-auth/react";
import { LogOut, Settings } from "lucide-react";

type Props = {
  user: User;
};

function UserMenu({ user }: Props) {
  return (
    <div className="dropdown dropdown-end h-[38px] w-[38px]">
      <label tabIndex={0} className="avatar cursor-pointer">
        <div className="w-full rounded-full">
          {user.image ? (
            <Image
              alt="user image"
              width={1000}
              height={1000}
              src={user.image}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-60"
      >
        <div className="flex flex-col w-full px-4 py-4">
          <h1 className="text-md text-lg font-bold">{user.name}</h1>
          <p className="mb-4">{user.email}</p>
          <hr />
        </div>
        <li>
          <a className="flex items-center">
            <Settings />
            Setting
          </a>
        </li>
        <li
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <a className="flex items-center">
            <LogOut />
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
