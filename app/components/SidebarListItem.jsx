import { Link } from "@remix-run/react";

export default function SidebarListItem({ label, path, isNew = false }) {
  return (
    <Link
      to={path}
      className="w-full border-b border-red-500 before:content-[''] before:bg-[url('/images/angle_arrow_right.svg')] before:bg-[length:15px_15px] before:text-red-600 before:w-[15px] before:h-[15px] before:bg-no-repeat before:mr-2">
      <div className='flex justify-between w-full'>
        <span className='text-sm'>{label}</span>
        {isNew ? (
          <span className='text-xs text-white bg-red-500 rounded-full self-center px-2 py-0.5 tracking-wide'>
            New
          </span>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
