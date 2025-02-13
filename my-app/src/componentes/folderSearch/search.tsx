import React from "react";
import '../folderSearch/styleSearch.css'

function Search (props) {
    const { search } = props;
    return (
        <form className="d-flex search" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
    )
};

export default Search;