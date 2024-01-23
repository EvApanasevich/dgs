import { authConfig } from "../../../configs/auth";
import { Logo } from "./logo/Logo";
import { NavProfile } from "./nav_profile/NavProfile";
import { Navigation } from "./navigation/Navigation";
///////////////////////////////////////
// import { getServerSession } from "next-auth/next";
//////////////////////////////////////

export async function Navbar() {
  // const session = await getServerSession(authConfig);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-gray-300">
            <Logo />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Navigation />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 text-white">
              {/* <NavProfile /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
