import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SearchInputContext = createContext();

const SearchInputProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("all-category");
  const [difficulty, setDifficulty] = useState("");
  const [servings, setServings] = useState(0);
  const [duration, setDuration] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const clearFilter = () => {
    setCategory("all-category");
    setDifficulty("");
    setServings(0);
    setDuration(0);
    setAverageRating(0);
  };

  return (
    <SearchInputContext.Provider
      value={{
        input,
        setInput,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        servings,
        setServings,
        duration,
        setDuration,
        averageRating,
        setAverageRating,
        clearFilter,
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};

SearchInputProvider.propTypes = {
  children: PropTypes.node,
};

export default SearchInputProvider;
