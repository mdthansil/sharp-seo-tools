import { Link } from "@remix-run/react";
import {
  RiLineChartLine,
  RiHashtag,
  RiText,
  RiSettings3Line,
  RiLockPasswordLine,
  RiAtLine,
  RiLandscapeLine,
  RiRepeat2Line,
  RiArrowDownSLine,
  RiLoginCircleLine,
  RiMessage3Line,
} from "react-icons/ri";
export default function Header() {
  return (
    <>
      <div className='header px-4 bg-white h-20 flex items-center'>
        <div className='mx-auto max-w-7xl w-full'>
          <div className='grid grid-cols-5'>
            <div className='flex items-center justify-start'>
              {/* <button className='px-4 py-1.5 rounded-full border text-sm text-primary border-primary flex items-center space-x-2 hover:bg-primary hover:text-gray-100 font-medium'>
                <RiMessage3Line />
                <span>Feature Request</span>
              </button> */}
            </div>
            <div className='flex justify-center items-center col-span-3'>
              <Link to={"/"}>
                <img
                  src='/images/logo.svg'
                  alt='Sharp SEO Tools'
                  className='block max-h-10'
                />
              </Link>
            </div>
            <div className='flex items-center justify-end'>
              {/* <button className='px-4 py-1.5 rounded-full border text-sm text-primary border-primary flex items-center space-x-2 hover:bg-primary hover:text-gray-100 font-medium'>
                <RiLoginCircleLine />
                <span>LogIn&nbsp;/&nbsp;SignUp</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className='nav-menu bg-primary h-12 flex items-center justify-center'>
        <ul className='flex space-x-5 tracking-wide text-white text-sm h-full items-center'>
          <li className='has-child-menu'>
            <a href='#' className='flex items-center space-x-2'>
              <RiLineChartLine />
              <span>SEO</span>
              <RiArrowDownSLine />
            </a>
            <ul className='child-menu'>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className='has-child-menu'>
            <a href={"#"} className='flex items-center space-x-2'>
              <RiHashtag />
              <span>Cryptography</span>
              <RiArrowDownSLine />
            </a>
            <ul className='child-menu'>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className='flex items-center space-x-2'>
                  <RiHashtag />
                  <span>Cryptography</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiText />
              <span>Text Tools</span>
              <RiArrowDownSLine />
            </Link>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiSettings3Line />
              <span>Utility</span>
              <RiArrowDownSLine />
            </Link>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiLockPasswordLine />
              <span>Password</span>
              <RiArrowDownSLine />
            </Link>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiAtLine />
              <span>Email</span>
              <RiArrowDownSLine />
            </Link>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiLandscapeLine />
              <span>Image</span>
              <RiArrowDownSLine />
            </Link>
          </li>
          <li>
            <Link to={"/"} className='flex items-center space-x-2'>
              <RiRepeat2Line />
              <span>Converters</span>
              <RiArrowDownSLine />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
