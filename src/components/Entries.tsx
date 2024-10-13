import { ChangeEvent } from "react";
import styled from "styled-components";

interface IEntriesProps {
  onEntriesChange: (value: string) => void;
}

const EntriesLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const EntriesSelect = styled.select`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

export default function Entries({ onEntriesChange }: Readonly<IEntriesProps>) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onEntriesChange(e.target.value);
  };

  return (
    <EntriesLabel id="table-entries">
      Show{" "}
      <EntriesSelect
        name="table-entries"
        aria-controls="main-table"
        onChange={handleChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </EntriesSelect>{" "}
      entries
    </EntriesLabel>
  );
}
