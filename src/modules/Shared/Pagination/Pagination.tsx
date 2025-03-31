import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";
import {
  Button,
  Form,
  // Pagination as PaginationComponent,
  Stack,
} from "react-bootstrap";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
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
      {
        length: Math.floor(
          totalNumberOfRecords < 100 ? 1 : totalNumberOfRecords / 100
        ),
      },
      (_, i) => (i + 1) * 10
    );

  const Styles =
    totalNumberOfRecords < 10
      ? {
          width: "35px",
          backgroundImage: "none",
          paddingRight: "10px",
        }
      : { width: "70px" };

  return (
    <Stack direction="horizontal" gap={3} className="justify-content-end p-3">
      <Stack direction="horizontal" gap={3}>
        <div>Showing </div>
        <Form.Select
          disabled={totalNumberOfRecords < 10}
          style={Styles}
          value={pageSize}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPageSize(Number(e.target.value))
          }
        >
          {totalNumberOfRecords < 10 ? (
            <option value={totalNumberOfRecords}>{totalNumberOfRecords}</option>
          ) : (
            getPageSizes(totalNumberOfRecords).map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))
          )}
        </Form.Select>
        <div>{`of ${totalNumberOfRecords} Results`}</div>
      </Stack>
      <div>
        Page {currentPage} of {totalNumberOfPages}
      </div>

      <Button
        style={{ backgroundColor: "transparent" }}
        className="border-0 p-2 text-black"
        disabled={currentPage === 1}
        onClick={() =>
          changeCurrentPage((prev: number) => (prev === 1 ? prev : prev - 1))
        }
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button
        style={{ backgroundColor: "transparent" }}
        className="border-0 p-2 text-black"
        disabled={currentPage === totalNumberOfPages}
        onClick={() =>
          changeCurrentPage((prev: number) =>
            prev === totalNumberOfPages ? prev : prev + 1
          )
        }
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </Stack>
  );
}
