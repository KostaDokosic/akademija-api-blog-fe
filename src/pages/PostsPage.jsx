import { CardHeader, Container, Row } from "react-bootstrap";
import Post from "../components/Post";
import usePosts from "../hooks/usePosts";
import Pagination from "../components/Pagination";
import useQuery from "../hooks/useQuery";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function PostsPage() {
  const query = useQuery();
  const { posts, metadata } = usePosts(query.get("page"));

  const { user } = useContext(UserContext);

  return (
    <Container>
      <CardHeader>{user.name}</CardHeader>
      <Row>
        {posts?.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              created_at={post.created_at}
              image={post.image}
            />
          );
        })}
      </Row>
      <Pagination
        perPage={metadata.perPage}
        total={metadata.total}
        count={metadata.count}
      />
    </Container>
  );
}
