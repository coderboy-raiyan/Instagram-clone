import {
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon, MenuIcon } from "@heroicons/react/solid";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./../atoms/ModalAtom";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl items-center mx-5 xl:mx-auto">
        {/* left side */}
        <div className="relative hidden lg:inline-grid h-10 w-24 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative lg:hidden h-10 w-10 flex-shrink-0 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle side */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-2 rounded-md">
            <div className="absolute inset-y-0 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-10 text-gray-500 " />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end space-x-4">
          {session ? (
            <>
              <MenuIcon className="h-6 w-10 md:hidden cursor-pointer" />

              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                src={session?.user?.image}
                alt=""
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <>
              <HomeIcon className="navBtn" onClick={() => router.push("/")} />
              <button onClick={signIn}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
