import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/images/logo.svg";

import styles from "./Header.module.css";

export type HeaderProps = {
  onSearchTextChanged: (searchValue: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ onSearchTextChanged }) => (
  <div className={styles.main}>
    <img src={logo} alt={"Logo"} />
    <SearchBar onSearch={onSearchTextChanged} className={styles.searchBar} />
  </div>
);
