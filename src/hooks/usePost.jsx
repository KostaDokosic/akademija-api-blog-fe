import { useEffect, useState } from "react";
import PostService from "../services/posts.service";

export default function usePost(id) {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const post = await PostService.getSingle(id);
      if (post) setPost(post);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  }

  return {
    post,
  };
}
