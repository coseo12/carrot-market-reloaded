import Link from "next/link";
import Image from "next/image";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import GithubSvg from "@/assets/github-mark.svg";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500"></div>
      <div className="flex flex-col gap-4">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <Image src={GithubSvg} alt="Github" width={24} height={24} />
          </span>
          <span>Continue with Github</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
