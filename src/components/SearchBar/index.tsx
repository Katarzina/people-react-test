import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
  return (
    <Input
      style={{ width: "80%", margin: "20px auto" }}
      placeholder="Serrch..."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onSearch(e.target.value)
      }
      suffix={<SearchOutlined />}
    />
  );
};

export default SearchBar;
