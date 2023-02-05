import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../img/icon-search.svg";

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    navigate(`/user/${searchTerm}`);
  };

  return (
    <form className="search" onSubmit={handleSubmit} data-testid="search">
      <input
        className="search__input"
        type="search"
        name="username"
        id="search__input"
        placeholder="Username"
        required
        onChange={handleChange}
      />

      <button type="submit" title="submit search" className="search__submit">
        <img className="search__icon" src={SearchIcon} alt="search icon" />
      </button>
    </form>
  );
};

export default Search;
