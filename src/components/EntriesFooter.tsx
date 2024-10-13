import { useEffect, useState } from "react";
import styled from "styled-components";

interface IEntriesFooter {
  entries: string;
  page: number;
  total: number;
  onChangePage: (value: number) => void;
}

const EntriesFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;

  p {
    margin: 0;
    font-style: italic;
  }
`;

const NavButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  padding: 6px 12px;
  border: 1.5px solid #12002b;
  border-radius: 6px;
  background-color: ${(props) => (props.isActive ? "#dfdfdf" : "transparent")};
`;

export default function EntriesFooter({
  entries,
  page,
  total,
  onChangePage,
}: Readonly<IEntriesFooter>) {
  // States
  const [startEntries, setStartEntries] = useState<number>();
  const [endEntries, setEndEntries] = useState<number>();
  const [totalEntries, setTotalEntries] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();

  useEffect(() => {
    const startIndex = (page - 1) * Number(entries);
    const endIndex = startIndex + Number(entries);
    const totalPage =
      Number(entries) !== 0 ? Math.ceil(total / Number(entries)) : 0;
    setStartEntries(startIndex + 1);
    setEndEntries(endIndex);
    setTotalEntries(total);
    setCurrentPage(page);
    setTotalPages(totalPage);
  }, [page, entries, total]);

  const changePage = (value: number) => {
    const calcPage = page + value;
    let newPage;
    if (totalPages !== undefined) {
      if (calcPage <= 0) {
        newPage = 1;
      } else if (calcPage >= totalPages) {
        newPage = totalPages;
      } else {
        newPage = calcPage;
      }

      onChangePage(newPage);
    } else {
      return console.log("totalPages est undefined");
    }
  };

  return (
    <EntriesFooterContainer>
      <p>{`Showing ${startEntries} to ${endEntries} of ${totalEntries} entries`}</p>
      <div>
        {currentPage === 1 ? (
          <p>Previous</p>
        ) : (
          <NavButton onClick={() => changePage(-1)}>Previous</NavButton>
        )}
        {totalPages === undefined || currentPage === undefined
          ? ""
          : Array(totalPages)
              .fill(null)
              .map((_, index) => {
                const page = index + 1;
                if (page === currentPage) {
                  return (
                    <PageButton
                      key={index}
                      isActive={true}
                      onClick={() => onChangePage(page)}
                    >
                      {page}
                    </PageButton>
                  );
                } else if (page > currentPage + 1 || page < currentPage - 1) {
                  return null;
                } else {
                  return (
                    <PageButton
                      key={index}
                      isActive={false}
                      onClick={() => onChangePage(page)}
                    >
                      {page}
                    </PageButton>
                  );
                }
              })}
        {currentPage === totalPages ? (
          <p>Next</p>
        ) : (
          <NavButton onClick={() => changePage(+1)}>Next</NavButton>
        )}
      </div>
    </EntriesFooterContainer>
  );
}
