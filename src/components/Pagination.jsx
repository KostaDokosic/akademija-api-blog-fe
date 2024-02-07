import React from "react";
import { Link } from "react-router-dom";
import useQuery from "../hooks/useQuery";

export default function Pagination({ total, count, perPage }) {
  const query = useQuery();

  const getTotalPages = () => Math.ceil(total / perPage);
  function renderButtons() {
    const elements = [];
    for (let i = 1; i <= getTotalPages(); i++) {
      elements.push(
        <li className="page-item" key={i}>
          <Link className="page-link" to={`/posts/?page=${i}`}>
            {i}
          </Link>
        </li>
      );
    }
    return elements;
  }

  const next = () => {
    let nextPage = Number(query.get("page")) + 1;
    if (nextPage > getTotalPages()) nextPage--;
    return `/posts/?page=${nextPage}`;
  };
  const prev = () => {
    let nextPage = Number(query.get("page")) - 1;
    if (nextPage <= 0) nextPage = 1;
    return `/posts/?page=${nextPage}`;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" to={prev()}>
            Previous
          </Link>
        </li>
        {renderButtons()}
        <li className="page-item">
          <Link className="page-link" to={next()}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
