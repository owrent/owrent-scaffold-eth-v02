"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <main className="flex items-center flex-col grow pt-10">
      <section className="px-5" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading" className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
        </h1>
        <div className="flex justify-center items-center space-x-2 flex-col">
          <p className="my-2 font-medium" id="connected-address-label">
            Connected Address:
          </p>
          <div aria-labelledby="connected-address-label">
            <Address address={connectedAddress} />
          </div>
        </div>

        <p className="text-center text-lg">
          Get started by editing{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            packages/nextjs/app/page.tsx
          </code>
        </p>
        <p className="text-center text-lg">
          Edit your smart contract{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            YourContract.sol
          </code>{" "}
          in{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            packages/hardhat/contracts
          </code>
        </p>
      </section>

      <section className="grow bg-base-300 w-full mt-16 px-8 py-12" aria-label="Quick start features">
        <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
          <article className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <BugAntIcon className="h-12 w-12 fill-secondary mb-4" aria-hidden="true" />
            <p>
              Tinker with your smart contract using the{" "}
              <Link
                href="/debug"
                passHref
                className="link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                Debug Contracts
              </Link>{" "}
              tab.
            </p>
          </article>
          <article className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-12 w-12 fill-secondary mb-4" aria-hidden="true" />
            <p>
              Explore your local transactions with the{" "}
              <Link
                href="/blockexplorer"
                passHref
                className="link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                Block Explorer
              </Link>{" "}
              tab.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
