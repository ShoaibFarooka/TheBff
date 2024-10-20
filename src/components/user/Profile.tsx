"use client";

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

import { FaUser } from "react-icons/fa";
import { IoCartOutline, IoReaderOutline } from "react-icons/io5";


interface ProfileProps {
  userdata: any;
}

const Profile: React.FC<ProfileProps> = ({ userdata }) => {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    // delete token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    window.location.href = "/"; // hard refresh to clear cache
  };

  const profileText = userdata?.name
    ?.split(" ")
    ?.map((name: string) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <Sheet>
      <SheetTrigger className="">
        <div className="w-10 h-10 p-2 rounded-full bg-y/50 center select-none">
          {profileText}
        </div>
      </SheetTrigger>

      <SheetContent className="z-50 text-white bg-gradient-to-br border-transparent from-[#001B61] to-[#00154A] rounded-[2rem] shadow-xl shadow-white/40 backdrop-blur flex flex-col">
        <SheetHeader>
          <div className="flex items-center mb-5">
            <Avatar className="bg-black">
              <AvatarFallback className="bg-y/80">{profileText}</AvatarFallback>
            </Avatar>
            <div className="ml-5">
              <h1>{userdata?.name}</h1>
              <p className="text-zinc-300 text-sm">{userdata?.email}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="grow">
          {!(userdata?.role === 4 || userdata?.role === 1) && <SheetTrigger asChild>
            <Link href="/dashboard">
              <div className="flex items-center mb-2 p-2 hover:bg-gray-400/20 rounded">
                <FaUser size={30} />
                <p className="ml-5">Dashboard</p>
              </div>
            </Link>
          </SheetTrigger>}

          {/* <div className="flex items-center mb-2 p-2 hover:bg-gray-400/20 rounded">
            <TbReportAnalytics size={30} />
            <p className="ml-5">Health Reports</p>
          </div> */}

          {/* <div className="flex items-center mb-2 px-1 hover:bg-gray-400/20 rounded">
                  <Image src={squaare} alt="" className="w-10 h-10 py-1" />
                  <p className="ml-5">Queries</p>
                </div> */}

          {!(userdata?.role === 4 || userdata?.role === 1) && <SheetTrigger asChild>
            <Link href="/blogs">
              <div className="flex items-center mb-2 p-2 hover:bg-gray-400/20 rounded">
                <IoReaderOutline size={30} />
                <p className="ml-5">Blogs</p>
              </div>
            </Link>
          </SheetTrigger>}

          {!(userdata?.role === 4 || userdata?.role === 1) && <SheetTrigger asChild>
            <Link href="/cart">
              <div className="flex items-center mb-2 p-2 hover:bg-gray-400/20 rounded">
                <IoCartOutline size={30} />
                <p className="ml-5">Cart</p>
              </div>
            </Link>
          </SheetTrigger>}

          {/* <div className="flex items-center mb-2 p-2 hover:bg-gray-400/20 rounded">
            <FiGift size={30} />
            <p className="ml-5">Rewards</p>
          </div> */}
        </div>

        <SheetFooter className="w-full">
          <button
            className="px-10 py-2 rounded-md w-full bg-[#C56936] hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Profile;
