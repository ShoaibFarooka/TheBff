"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Profile from "./user/Profile";
// import profilePhoto from "@/assets/Photo.png";
// import Dashboard from "../../app/(admin_only)/admin/page";
// import logo from '@/assets/logo.png'

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const Profile = dynamic(() => import("./user/Profile"), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 rounded-full bg-gray-500/50 animate-pulse"></div>
  ),
});

const pagesWithAuth = ["/", "/profile", "/dashboard", "/programs", "/checkout", "/cart", "/direct-client-registration"];

const AuthProfile = ({
  authBtn = true,
  profileBtn = true,
}: {
  authBtn?: boolean;
  profileBtn?: boolean;
}) => {
  const pathname = usePathname();
  const authStatus = useAuth((s) => s.status);
  const user = useAuth((s) => s.user);

  return (
    <>
      {profileBtn &&
        authStatus === "authenticated" &&
        <div className="flex gap-2">
          <Profile userdata={user} />
        </div>
        // pagesWithAuth.includes(pathname) && (
        // )
      }
      {
        // authBtn &&
        // pagesWithAuth.includes(pathname) &&
        authStatus !== "loading" &&
        authStatus === "unauthenticated" && (
          <Link href="/login">
            <button className="hidden md:flex rounded px-2 py-1 text-y border-2 border-transparent bg-y/10 hover:shadow-y/10 shadow-xl hover:bg-y/20 hover:border-[#FED25B]">
              Login / Signup
            </button>
          </Link>
        )}
      {/* {authBtn && !pagesWithAuth.includes(pathname) && (
        <Link href="/login">
          <button className="hidden md:flex rounded px-2 py-1 text-y border-2 border-transparent bg-y/10 hover:shadow-y/10 shadow-xl hover:bg-y/25 hover:border-[#FED25B] hover:scale-[1.05]">
            Login / Signup
          </button>
        </Link>
      )} */}
    </>
  );
};

function Header(props?: any) {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const pathname = usePathname();
  const authenticate = useAuth((s) => s.authenticate);

  useEffect(() => {
    if (pagesWithAuth.includes(pathname) && authenticate) {
      authenticate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, authenticate]);

  return (
    <nav
      className="fixed top-0 left-0 bg-transparent backdrop-blur w-screen px-5 py-2 z-20"
    >
      <div className="text-white flex justify-between items-center mx-auto md:max-w-5xl">
        <Logo />

        {/* menu */}
        <ul className="hidden md:flex font-semibold max-w-max ml-auto space-x-4 mr-4">
          <Link href="/">
            <li className="hover:bg-y/10 hover:text-y px-4 py-1.5 rounded mx-0">
              Home
            </li>
          </Link>
          <Link href="/programs">
            <li className="hover:bg-y/10 hover:text-y px-4 py-1.5 rounded mx-0">
              Programs
            </li>
          </Link>
          <Link href="/programs#pricing">
            <li className="hover:bg-y/10 hover:text-y px-4 py-1.5 rounded mx-0">
              Pricing
            </li>
          </Link>
          <Link href="/blog">
            <li className="hover:bg-y/10 hover:text-y px-4 py-1.5 rounded mx-0">
              Blogs
            </li>
          </Link>

          <li>
            {/* Disabled in alpha preview - 1 */}
            <AuthProfile />
          </li>
        </ul>

        {/* Hamburger */}
        <div onClick={handleClick} className="md:hidden z-10 center space-x-4">
          {/* {authStatus === "authenticated" ? <Profile userdata={{}} /> : null} */}
          <AuthProfile authBtn={false} />
          {!nav ? <FaBars /> : <FaTimes />}
        </div>

        {/* Mobile menu */}
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center"
          }
        >
          <Link href="/" className="py-6 text-2xl">
            Home
          </Link>
          <Link href="/programs" className="py-6 text-2xl">
            Programs
          </Link>
          <Link href="/programs#pricing" className="py-6 text-2xl">
            Pricing
          </Link>
          <Link href="/blog" className="py-6 text-2xl">
            Blogs
          </Link>
          {/* Disabled in alpha preview - 1 */}
          <li>
            <AuthProfile profileBtn={false} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
