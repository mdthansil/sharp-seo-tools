import { Link } from "@remix-run/react";

export default function AppIconCard({ label, icon, path, isNew = false }) {
  return (
    <div className='border border-gray-300 rounded-md bg-white h-14 flex items-center px-2'>
      <Link to={path} className='w-full'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-3'>
            <span className='flex items-center justify-center h-10 w-10 bg-primary/20 rounded-md text-xl'>
              {icon}
            </span>
            <span className='font-medium text-sm text-gray-700'>{label}</span>
          </div>
          {isNew ? (
            <span className='text-xs text-white bg-red-500 rounded-full self-center px-2 py-0.5 tracking-wide'>
              New
            </span>
          ) : (
            ""
          )}
        </div>
      </Link>
    </div>
  );
}
