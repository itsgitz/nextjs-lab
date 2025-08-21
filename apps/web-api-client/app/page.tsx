import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <div className="py-3">
        <h1 className="text-3xl font-semibold">
          The Next.js Lab - Consuming API in Next.js
        </h1>
      </div>
      <ul>
        <li>
          <Link href={`/posts/swr`}>Posts (Axios + SWR)</Link>
        </li>
      </ul>
    </div>
  );
}
