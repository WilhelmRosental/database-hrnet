import { SetStateAction, useEffect, useState } from "react";
import Entries from "../components/Entries";
import EntriesFooter from "../components/EntriesFooter";
import Sort from "../components/Sort";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import { ComponentType } from "react";

interface IDataTableProps<T extends object> {
  data: T[];
  title?: string;
  columnOrder?: string[];
  columnTitle?: string[];
  entries?: boolean;
  sort?: boolean;
  searchBar?: boolean;
  styleDataTable?: ComponentType<any>;
  styleToolsBar?: ComponentType<any>;
  styleTableContainer?: ComponentType<any>;
  styleTable?: ComponentType<any>;
  styleThead?: ComponentType<any>;
  styleTbody?: ComponentType<any>;
  styleTr?: ComponentType<any>;
  styleEntries?: ComponentType<any>;
  styleEntriesFooter?: ComponentType<any>;
  stylePrevNext?: ComponentType<any>;
  stylePage?: ComponentType<any>;
}

const DataTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ToolsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
`;

const TableContainer = styled.div`
  overflow: scroll;
  border-radius: 15px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  min-width: 700px;
  border-radius: 15px;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f1f1f1;
  }
  &:nth-child(even) {
    background-color: #fbfbfb;
  }
  &:hover {
    background-color: #dfdfdf;
  }
`;

const TableHeader = styled.th`
  padding: 12px 4px;
  font-size: 14px;
  background-color: orange;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TableData = styled.td`
  padding: 12px 4px;
  font-size: 12px;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export function DataTable<T extends object>({
  data,
  title,
  columnOrder,
  columnTitle,
  entries,
  sort,
  searchBar,
}: Readonly<IDataTableProps<T>>) {
  const [nbrEntries, setNbrEntries] = useState<string>(`${data.length}`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newData, setNewData] = useState(data);
  const [newFilterData, setNewFilterData] = useState(data);
  const [visibleData, setVisibleData] = useState(data);

  useEffect(() => {
    const startIndex = (currentPage - 1) * Number(nbrEntries);
    const endIndex = startIndex + Number(nbrEntries);
    const tableData = newData.slice(startIndex, endIndex);
    setVisibleData(tableData);
  }, [currentPage, data, nbrEntries, newData]);

  const handleEntriesChange = (newEntries: SetStateAction<string>) => {
    setNbrEntries(newEntries);
    setCurrentPage(1);
  };

  const handleChangePage = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage);
  };

  const handleFilterData = (value: SetStateAction<T[]>) => {
    setNewData(value);
  };

  const handleSearchData = (value: SetStateAction<T[]>) => {
    setNewData(value);
    setNewFilterData(value);
  };

  if (!data || data.length === 0 || data === undefined) {
    return <p>Aucune donnée à afficher.</p>;
  }

  let columns = Object.keys(data[0]);
  if (columnOrder !== undefined) {
    columns = columnOrder;
  }

  return (
    <DataTableContainer>
      {title ? <h2>{title}</h2> : null}
      <ToolsBar>
        {entries ? <Entries onEntriesChange={handleEntriesChange} /> : ""}
        {searchBar ? (
          <SearchBar<T> data={data} onChangeData={handleSearchData} />
        ) : (
          ""
        )}
      </ToolsBar>

      <TableContainer>
        <Table id="main-table">
          {columnTitle === undefined ? (
            ""
          ) : (
            <thead>
              <tr>
                {columnTitle.map((column, index) => {
                  if (sort === true) {
                    return (
                      <Sort<T>
                        key={index}
                        data={newData}
                        originData={newFilterData}
                        onChangeData={handleFilterData}
                        element={column}
                        keyIndex={index}
                        dataColumn={columns}
                      />
                    );
                  } else {
                    return <TableHeader key={index}>{column}</TableHeader>;
                  }
                })}
              </tr>
            </thead>
          )}

          <tbody>
            {visibleData.map((rowData, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableData key={colIndex}>
                    {String(rowData[column as keyof T])}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {entries ? (
        <EntriesFooter
          entries={nbrEntries}
          total={newData.length}
          page={currentPage}
          onChangePage={handleChangePage}
        />
      ) : (
        ""
      )}
    </DataTableContainer>
  );
}
