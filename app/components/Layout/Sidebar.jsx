import Search from "~/components/Search";
import SidebarListItem from "~/components/SidebarListItem";

export default function Sidebar() {
  return (
    <div>
      <div>
        <div>
          <h2 className="font-medium text-md">Search Products</h2>
          <div className="mt-2">
            <Search />
          </div>
        </div>
        <div className="mt-5">
          <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
            Ads
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-medium text-md">New Products</h2>
          <div className="mt-2 bg-white shadow-sm rounded-md overflow-hidden">
            <ul className="sidebar-list">
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" isNew />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" isNew />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5">
          <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
            Ads
          </div>
        </div>
        {/* <div className="mt-5">
          <h2 className="font-medium text-md">Poupular Products</h2>
          <div className="mt-2 bg-white shadow-sm rounded-md overflow-hidden">
            <ul className="sidebar-list">
              <li>
                <SidebarListItem path="/" label="Meta Validator" isNew />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" />
              </li>
              <li>
                <SidebarListItem path="/" label="Meta Validator" isNew />
              </li>
            </ul>
          </div>
        </div> */}
        {/* <div className="mt-5">
          <div className="w-full rounded-md bg-white h-[250px] flex items-center justify-center">
            Ads
          </div>
        </div> */}
      </div>
    </div>
  );
}
