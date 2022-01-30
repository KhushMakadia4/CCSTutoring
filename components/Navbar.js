import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export default function Navbar() {
  const Nav = styled.nav`
    background: #fff;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
  `;

  const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
      color: #15cdfc;
    }
  `;

  const Bars = styled(FaBars)`
    display: none;
    color: #fff;
    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 75%);
      font-size: 1.8rem;
      cursor: pointer;
    }
  `;

  const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  `;

  const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  `;

  const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
    }
  `;

  return (
    // <div className="flex bg-glass shadow-inner h-16 content-center">
    //   <div className="flex items-center gap-4 hover:bg-emerald-300 hover:text-xl">
    //     <h1 className="flex text-center">HI</h1>
    //     <h2>hola</h2>
    //   </div>
    // </div>

    // <div className="flex justify-between bg-gray-900 h-16 z-10 p-[calc((100vw-100-px)/2)]">
    //   <div className="flex bg-zinc-100 items-center py-4 h-full cursor-pointer active:bg-red-700">
    //     <Link href="/about">
    //       <Image src="/chslogo.png" layout="fill" />
    //     </Link>
    //   </div>
    // </div>

    <>
      <Nav>
        <NavLink href="/">
          <img src="/chslogo.png" alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink href="/about" activeStyle>
            About
          </NavLink>
          <NavLink href="/services" activeStyle>
            Services
          </NavLink>
          <NavLink href="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink href="/sign-up" activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink href='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink href="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}
