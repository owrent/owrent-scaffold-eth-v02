import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="min-h-0 py-5 px-1 mb-11 lg:mb-0" role="contentinfo">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto" role="group" aria-label="Network tools">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div
                  className="btn btn-primary btn-sm font-normal gap-1 cursor-auto"
                  role="status"
                  aria-label={`Current price: $${nativeCurrencyPrice.toFixed(2)}`}
                >
                  <CurrencyDollarIcon className="h-4 w-4" aria-hidden="true" />
                  <span aria-hidden="true">{nativeCurrencyPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link
                  href="/blockexplorer"
                  passHref
                  className="btn btn-primary btn-sm font-normal gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Open block explorer"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <nav aria-label="Footer navigation">
          <ul className="flex justify-center items-center gap-2 text-sm w-full list-none">
            <li>
              <a
                href="https://github.com/scaffold-eth/se-2"
                target="_blank"
                rel="noopener noreferrer"
                className="link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                aria-label="Fork Scaffold-ETH on GitHub (opens in new tab)"
              >
                Fork me
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" aria-hidden="true" /> at
              </p>
              <a
                className="flex justify-center items-center gap-1 link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit BuidlGuidl website (opens in new tab)"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" aria-hidden="true" />
                <span>BuidlGuidl</span>
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <a
                href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
                target="_blank"
                rel="noopener noreferrer"
                className="link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                aria-label="Get support on Telegram (opens in new tab)"
              >
                Support
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
