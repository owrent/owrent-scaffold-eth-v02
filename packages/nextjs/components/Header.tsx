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
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
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
 * Civic Auth Button Component
 *
 * Two implementation options are provided:
 *
 * OPTION 1 (Current): Custom implementation using useUser hook
 * - Provides full control over styling and layout
 * - Displays "Connect Wallet" button for unauthenticated users
 * - Shows user info with wallet address and sign-out button for authenticated users
 * - Uses DaisyUI classes for consistent styling with the rest of the app
 *
 * OPTION 2 (Alternative): Pre-built UserButton component
 * - Quick and easy to implement
 * - Comes with built-in styling and functionality
 * - Less customization but faster to deploy
 *
 * To use Option 2, replace the CivicAuthButton component below with:
 * export const CivicAuthButton = () => <UserButton />;
 *
 * Or directly in the Header component, replace:
 * <CivicAuthButton />
 * with:
 * <UserButton />
 */
export const CivicAuthButton = () => {
  const { user, signIn, signOut } = useUser();

  // OPTION 1: Custom implementation (current)
  if (user) {
    // Authenticated state: show user info and sign-out button
    const walletAddress = user.walletAddress as string | undefined;

    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          {user.name && <span className="text-sm font-medium hidden sm:block">{user.name}</span>}
          {walletAddress && (
            <span className="text-xs opacity-70 font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          )}
        </div>
        <button type="button" onClick={() => signOut()} className="btn btn-sm btn-ghost hover:btn-secondary">
          Sign Out
        </button>
      </div>
    );
  }

  // Unauthenticated state: show connect wallet button
  return (
    <button type="button" onClick={() => signIn()} className="btn btn-sm btn-primary">
      Connect Wallet
    </button>
  );

  // OPTION 2: Pre-built UserButton (alternative - uncomment to use)
  // return <UserButton />;
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
    <div className="header-glass navbar min-h-0 shrink-0 justify-between px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent" aria-label="Open navigation menu">
            <Bars3Icon className="h-5 w-5" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-100 rounded-box w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
          </ul>
        </details>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end grow mr-4 flex items-center gap-2">
        <CivicAuthButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </div>
  );
};
