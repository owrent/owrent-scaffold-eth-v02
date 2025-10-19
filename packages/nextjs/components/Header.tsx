"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@civic/auth-web3/react";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
// import { useUser, UserButton } from "@civic/auth-web3/react";
import { FaucetButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
  {
    label: "FHEVM Example",
    href: "/fhevm",
  },
  {
    label: "AI Chat",
    href: "/ai-chat",
    icon: <ChatBubbleLeftRightIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href} role="none">
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col transition-all duration-150`}
              aria-current={isActive ? "page" : undefined}
              role="menuitem"
            >
              {icon && <span aria-hidden="true">{icon}</span>}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Civic Auth Button Component with Glassmorphism Design
 *
 * Updated to use the new design system with glassmorphism effects.
 * - Displays "Connect Wallet" button for unauthenticated users
 * - Shows user info with wallet address and sign-out button for authenticated users
 * - Uses glassmorphism effects and proper button variants
 * - Fully accessible with keyboard navigation and ARIA labels
 */
export const CivicAuthButton = () => {
  const { user, signIn, signOut } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  // Authenticated state: show user info with dropdown
  if (user) {
    const walletAddress = user.walletAddress as string | undefined;

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-hover transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`User menu${user.name ? ` for ${user.name}` : ""}`}
          aria-expanded={isDropdownOpen ? "true" : "false"}
          aria-haspopup="true"
          aria-controls="user-menu-dropdown"
          id="user-menu-button"
        >
          <div className="flex flex-col items-end">
            {user.name && <span className="text-sm font-medium hidden sm:block">{user.name}</span>}
            {walletAddress && (
              <span className="text-xs opacity-70 font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            )}
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Glassmorphism Dropdown */}
        {isDropdownOpen && (
          <div
            id="user-menu-dropdown"
            className="absolute right-0 mt-2 w-56 glass-card rounded-2xl shadow-lg z-50 overflow-hidden animate-slide-down"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <div className="p-4 border-b border-base-300/20" role="presentation">
              <div className="flex flex-col space-y-1">
                {user.name && <span className="text-sm font-semibold">{user.name}</span>}
                {user.email && <span className="text-xs opacity-70">{user.email}</span>}
                {walletAddress && <span className="text-xs font-mono opacity-70 break-all">{walletAddress}</span>}
              </div>
            </div>
            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-base-200/50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Unauthenticated state: show connect wallet button with glassmorphism
  return (
    <button
      type="button"
      onClick={() => signIn()}
      className="btn btn-sm btn-primary shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label="Connect wallet to sign in"
    >
      Connect Wallet
    </button>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  return (
    <header className="header-glass navbar min-h-0 shrink-0 justify-between px-0 sm:px-2" role="banner">
      <nav className="navbar-start w-auto lg:w-1/2" aria-label="Main navigation">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary
            className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Open navigation menu"
          >
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 glass-card rounded-2xl shadow-lg w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
            role="menu"
          >
            <HeaderMenuLinks />
          </ul>
        </details>
        <Link
          href="/"
          passHref
          className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          aria-label="Scaffold-ETH home"
        >
          <div className="flex relative w-10 h-10">
            <Image alt="Scaffold-ETH logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2 list-none" role="menubar">
          <HeaderMenuLinks />
        </ul>
      </nav>
      <div className="navbar-end grow mr-4 flex items-center gap-2">
        <CivicAuthButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </header>
  );
};
