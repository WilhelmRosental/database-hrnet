import { DataTable } from "./components/DataTable";
import { mockData } from "./mocks/mockData";
import styled from "styled-components";
import { IEmployee } from "./types";

const DatatableContainer = styled.div`
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

const Entries = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EntriesFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
`;

const BtnPrevNext = styled.button`
  cursor: pointer;
  border: none;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnPage = styled.button`
  cursor: pointer;
  padding: 6px 12px;
  border: 1.5px solid #12002b;
  border-radius: 6px;
`;

function App() {
  const customColumnOrder = [
    "firstName",
    "lastName",
    "startDate",
    "department",
    "dateOfBirth",
    "street",
    "city",
    "state",
    "zipCode",
  ];
  const customColumnTitle = [
    "First Name",
    "Last Name",
    "Start Date",
    "Department",
    "Date of Birth",
    "Street",
    "City",
    "State",
    "Zip Code",
  ];

  return (
    <DatatableContainer>
      <DataTable<IEmployee>
        data={mockData.data}
        title="Current Employees"
        columnOrder={customColumnOrder}
        columnTitle={customColumnTitle}
        styleDataTable={DatatableContainer}
        styleToolsBar={ToolsBar}
        styleTableContainer={TableContainer}
        styleTable={Table}
        styleThead={TableHeader}
        styleTbody={TableData}
        styleTr={TableRow}
        entries={true}
        styleEntries={Entries}
        styleEntriesFooter={EntriesFooter}
        stylePrevNext={BtnPrevNext}
        stylePage={BtnPage}
        sort={true}
        searchBar={true}
      />
    </DatatableContainer>
  );
}

export default App;
