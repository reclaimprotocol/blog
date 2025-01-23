import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: post.img ? siteConfig.url + post.img : "",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.img ? siteConfig.url + post.img : ""],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    notFound();
  }

  const img = post.img ? post.img : "/images/notfound.png";

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2 text-center">{post.title}</h1>
      <div className="text-center">
        <div>{post.author}</div>
        <div>{formatDate(post.date)}</div>
      </div>
      <img
        src={'/blog' + img}
        alt={post.title}
        className="rounded"
        width={1920}
        height={1080}
      />
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
      </div>
      <MDXContent code={post.body} />
    </article>
  );
}
