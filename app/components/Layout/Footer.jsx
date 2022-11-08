import { Link } from "@remix-run/react";

const year = new Date().getFullYear();
export default function Footer() {
  return (
    <div className="bg-primary mt-16 text-white">
      <div className="text-center border-b border-gray-500/20 py-5 text-sm tracking-wide">
        <ul className="footer-nav">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>About Us</Link>
          </li>
          <li>
            <Link to={"/"}>Contact Us</Link>
          </li>
          <li>
            <Link to={"/"}>Privacy</Link>
          </li>
          <li>
            <Link to={"/"}>Terms of Service</Link>
          </li>
        </ul>
      </div>
      <div className="text-center py-3 text-sm tracking-wide">
        <p>
          &copy; {year == "2022" ? `2022` : `2022 - ${year}`} Sharp Seo Tools | built with ♥ by <a href="https://thansil.com" target="_blank">Muhammed Thansil</a>
        </p>
      </div>
    </div>
  );
}
