import { ChangeEvent } from "react";
import {
  Form,
  Pagination as PaginationComponent,
  Stack,
} from "react-bootstrap";

export default function Pagination({
  currentPage,
  changeCurrentPage,
  totalNumberOfRecords,
  totalNumberOfPages,
  pageSize,
  setPageSize,
}: {
  currentPage: number;
  changeCurrentPage: (value: number | ((prev: number) => number)) => void;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  pageSize: number;

  setPageSize: (value: number | ((prev: number) => number)) => void;
}) {
  const getPageSizes = (totalNumberOfRecords: number) =>
    Array.from(
      { length: Math.floor(totalNumberOfRecords / 100) },
      (_, i) => (i + 1) * 10
    );
  return (
    <Stack direction="horizontal" gap={3} className="justify-content-end">
      <Stack direction="horizontal" gap={3}>
        <div>Showing </div>
        <Form.Select
          style={{ width: "70px" }}
          value={pageSize}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPageSize(Number(e.target.value))
          }
        >
          {getPageSizes(totalNumberOfRecords).map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </Form.Select>
        <div>{`of ${totalNumberOfRecords} Results`}</div>
      </Stack>
      <div>
        Page {currentPage} of {totalNumberOfPages}
      </div>

      <PaginationComponent className="my-auto">
        <PaginationComponent.Prev
          onClick={() =>
            changeCurrentPage((prev: number) => (prev === 1 ? prev : prev - 1))
          }
          active={currentPage === 1}
        />
        <PaginationComponent.Next
          onClick={() =>
            changeCurrentPage((prev: number) =>
              prev === totalNumberOfPages ? prev : prev + 1
            )
          }
          active={currentPage === totalNumberOfPages}
        />
      </PaginationComponent>
    </Stack>
  );
}
