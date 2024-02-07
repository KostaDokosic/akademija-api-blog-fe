import { useEffect, useState } from "react";
import PostService from "../services/posts.service";

export default function usePosts(page = 1) {
  const [posts, setPosts] = useState([]);
  const [metadata, setMetadata] = useState({ total: 0, count: 0, perPage: 8 });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  async function fetchPosts() {
    try {
      const { data, metadata } = await PostService.getAll(page);
      setPosts(data);
      if (metadata) setMetadata(metadata);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  }

  return {
    posts,
    setPosts,
    metadata,
    setMetadata,
  };
}
