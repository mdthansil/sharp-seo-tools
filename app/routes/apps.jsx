import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Layout/Sidebar";
export default function Apps() {
  return (
    <>
      <div className='grid grid-cols-4 gap-5 mx-auto max-w-7xl'>
        <div className='col-span-3'>
          <Outlet />
        </div>
        <div className='mt-6'>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
