import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate, getRandomTailwindColor } from "@/lib/utils";
import { Tag } from "./tag";
import Image from "next/image";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  img?: string;
  author?: string;
  date: string;
  tagCheck?: boolean;
  tags?: Array<string>;
}

export function MainPostItem({
  slug,
  title,
  description,
  img = "/images/notfound.png",
  date,
  author,
  tagCheck = true,
  tags,
}: PostItemProps) {
  return (
    <div className="group cursor-pointer glass rounded-[2px] p-4">
      <div className="overflow-hidden rounded-[2px] bg-black/5 transition-all hover:scale-[1.02]">
        <Link className="relative block aspect-video" href={slug}>
          <img
            alt="Thumbnail"
            fetchPriority="high"
            decoding="async"
            data-nimg="fill"
            className="object-cover transition-all"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent",
            }}
            sizes="(max-width: 768px) 30vw, 33vw"
            src={img}
          />
        </Link>
      </div>
      <div className="">
        <div className="flex gap-3">
          {tagCheck &&
            tags &&
            tags.map((tag) => {
              return <Tag key={tag} tag={tag} />;
            })}
        </div>
        <div className={!tagCheck ? "mt-4" : ""}>
          <h2 className="text-lg font-medium font-mono tracking-tight mt-4">
            <Link href={slug}>
              <span className="post-title-link bg-[length:0px_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px] group-hover:bg-[length:100%_2px]">
                {title}
              </span>
            </Link>
          </h2>
          <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <Link href={slug}>
              <div className="flex items-center gap-3">
                <span className="truncate text-sm">{author}</span>
              </div>
            </Link>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time className="truncate text-sm">{formatDate(date)}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostItem({
  slug,
  title,
  description,
  img = "/images/notfound.png",
  date,
  author,
  tagCheck = true,
  tags,
}: PostItemProps) {
  return (

    <div className="group cursor-pointer glass rounded-[2px] p-4">
      <div className="overflow-hidden rounded-[2px] bg-black/5 transition-all hover:scale-[1.02]">
        <Link className="relative block aspect-square" href={slug}>
          <img
            alt="Thumbnail"
            decoding="async"
            data-nimg="fill"
            className="object-cover transition-all"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent",
            }}
            sizes="(max-width: 768px) 30vw, 33vw"
            src={img}
          />
        </Link>
      </div>
      <div className="">
        <div className="flex gap-3">
          {tagCheck &&
            tags &&
            tags.map((tag) => {
              return <Tag key={tag} tag={tag} />;
            })}
        </div>
        <div className={!tagCheck ? "mt-4" : ""}>
          <h2 className="text-lg font-medium font-mono tracking-tight mt-2 line-clamp-1">
            <Link href={slug}>
              <span className="post-title-link bg-[length:0px_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px] group-hover:bg-[length:100%_2px]">
                {title}
              </span>
            </Link>
          </h2>
          <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <Link href={slug}>
              <div className="flex items-center gap-3">
                <span className="truncate text-sm">{author}</span>
              </div>
            </Link>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time
              className="truncate text-sm"
              dateTime="2022-10-21T06:05:00.000Z"
            >
              {formatDate(date)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
