import GetPosts from "@/components/blocks/GetPosts";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container>
        <main className="flex flex-col">
          <div className="grid grid-flow-cols md:grid-cols-2 gap-10">
            <GetPosts sliceto={2} />
          </div>
          <ul className="grid grid-flow-cols md:grid-cols-2 lg:grid-cols-3 gap-10 py-8">
            <GetPosts slicefrom={2} sliceto={8} small={true} />
          </ul>
          <div className="flex justify-center">
            <Button variant="outline">
              <Link href="./posts">View all posts</Link>
            </Button>
          </div>
        </main>
      </Container>
    </>
  );
}
