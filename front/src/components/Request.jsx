// Gestiona busqueda, filtrado y visualizacion de Seguimiento
import React, { useState, useContext } from "react";
import { PaginationContext } from "../contexts/PaginationContext";
import SearchBarOrder from "./SearchBarOrder";
import ProductTableOrder from "./ProductTableOrder";

const Request = () => {
    const { clearPagination } = useContext(PaginationContext);
    const [input, setInput] = useState({
        search: "",
        filter: "proveedor",
    });
    const [selectedEstado, setSelectedEstado] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState([]);

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        clearPagination();
    };

    const handleApplyFilters = (estado, categoria) => {
        setSelectedEstado(estado);
        setSelectedCategoria(categoria);
    };

    const handleSearchClientsOrProviders = (searchValue) => {
        setInput({
            ...input,
            search: searchValue,
        });
    };

    return (
        <section className="store">
            <SearchBarOrder
                onSubmit={onSubmit}
                onChange={onChange}
                input={input}
                onApplyFilters={handleApplyFilters}
                onSearchClientsOrProviders={handleSearchClientsOrProviders} 
            />
            <hr />
            <ProductTableOrder
                input_search={input}
                selectedEstado={selectedEstado}
                selectedCategoria={selectedCategoria}
            />
        </section>
    );
};

export default Request;
