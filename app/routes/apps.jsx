import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Layout/Sidebar";
export default function Apps() {
  return (
    <>
      <div className="grid grid-cols-4 gap-5 mx-auto max-w-7xl ">
        <div className="col-span-3">
          <Outlet />
          {/* <div className="grid grid-cols-3 space-x-5">
            <div className="mt-5">
              <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
                Ads
              </div>
            </div>
            <div className="mt-5">
              <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
                Ads
              </div>
            </div>
            <div className="mt-5">
              <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
                Ads
              </div>
            </div>
          </div> */}
          <div className="w-full bg-white flex items-center justify-center h-28 rounded-md mt-5">
            ads
          </div>
        </div>
        <div className="mt-6">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
