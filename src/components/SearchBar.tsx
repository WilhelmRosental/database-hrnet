import { ChangeEvent } from "react";
import styled from "styled-components";

interface ISearchBarProps<T extends object> {
  data: T[];
  onChangeData: (value: T[]) => void;
}

const SearchLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

export default function SearchBar<T extends object>({
  data,
  onChangeData,
}: Readonly<ISearchBarProps<T>>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const searchResult = data.filter((element: T) =>
      Object.values(element).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    onChangeData(searchResult);
  };

  return (
    <SearchLabel>
      Search:{" "}
      <SearchInput
        type="search"
        aria-controls="main-table"
        onChange={(e) => handleChange(e)}
        placeholder="Enter search term"
      />
    </SearchLabel>
  );
}
