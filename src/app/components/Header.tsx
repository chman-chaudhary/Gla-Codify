import Link from "next/link";
import { SignInButton } from "./SignInButton";

export const Header = () => {
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50">
      <div className="w-[90vw] mx-auto mt-3 py-2 px-4 space-y-2 border-[1px] border-gray-400/25 backdrop-blur-sm rounded-lg">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-3xl font-bold cursor-pointer">
              <span className="text-primary">GLA</span> Codify
            </span>
          </Link>
          <SignInButton />
        </div>
      </div>
    </div>
  );
};
