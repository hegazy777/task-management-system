import { Pagination as PaginationComponent } from "react-bootstrap";

export default function Pagination({
  arrayOfPages,
  currentPage,
  changeCurrentPage,
}: {
  arrayOfPages: number[];
  currentPage: number;
  changeCurrentPage: (value: number | ((prev: number) => number)) => void;
}) {
  return (
    <PaginationComponent>
      <PaginationComponent.Prev
        onClick={() =>
          changeCurrentPage((prev: number) => (prev === 1 ? prev : prev - 1))
        }
        active={currentPage !== 1}
      />
      {arrayOfPages?.map((pageNumber) => (
        <li
          className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
          key={pageNumber}
        >
          <a
            className="page-link"
            onClick={() => changeCurrentPage(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <PaginationComponent.Prev
        onClick={() =>
          changeCurrentPage((prev: number) =>
            prev === arrayOfPages.length ? prev : prev + 1
          )
        }
        active={currentPage !== arrayOfPages.length}
      />
    </PaginationComponent>
  );
}
