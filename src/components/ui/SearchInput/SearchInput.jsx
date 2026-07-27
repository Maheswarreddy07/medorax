import { Search } from "lucide-react";
import Input from "../Input";

export default function SearchInput(props) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      leftIcon={<Search size={18} />}
      {...props}
    />
  );
}