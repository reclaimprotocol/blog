import { sortPosts } from "@/lib/utils";
import { Post, posts } from "#site/content";
import { MainPostItem, PostItem } from "@/components/post-item";

const GetPosts = ({
  slicefrom = 0,
  sliceto,
  small,
}: {
  slicefrom?: number;
  sliceto?: number;
  small?: boolean;
}) => {
  const getPosts = (): Post[] => {
    const sortedPosts = sortPosts(posts);
    if (sliceto !== undefined && slicefrom < sliceto) {
      return sortedPosts.slice(slicefrom, sliceto);
    }
    return sortedPosts;
  };

  const displayedPosts = getPosts();

  if (small) {
    return (
      <>
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => <PostItem key={post.slug} {...post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </>
    );
  }

  return (
    <>
      {displayedPosts.length > 0 ? (
        displayedPosts.map((post) => <MainPostItem key={post.slug} {...post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
};

export default GetPosts;
