//modal que muestra y selecciona filtros 
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FiltrosModal = ({ onClose, onApplyFilters }) => {
    const [estados, setEstados] = useState([]); 
    const [categorias, setCategorias] = useState([]); 
    const [selectedEstados, setSelectedEstados] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]); 
    const [isEstadoDropdownOpen, setIsEstadoDropdownOpen] = useState(false); 
    const [isCategoriaDropdownOpen, setIsCategoriaDropdownOpen] = useState(false); 
    const estadoDropdownRef = useRef(null);
    const categoriaDropdownRef = useRef(null);

    useEffect(() => {
        fetchEstados();
        fetchCategorias();
    }, []);

    const fetchEstados = async () => {
        try {
            const response = await axios.get("http://localhost/pruebaTwinpack/php/buscar_estados.php");
            setEstados(response.data);
        } catch (error) {
            console.error("Error fetching estados:", error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await axios.get("http://localhost/pruebaTwinpack/php/buscar_categorias.php");
            setCategorias(response.data);
        } catch (error) {
            console.error("Error fetching categorias:", error);
        }
    };

    const handleCheckboxChange = (item, type) => {
        if (type === "estado") {
            if (selectedEstados.includes(item)) {
                setSelectedEstados(selectedEstados.filter((estado) => estado !== item));
            } else {
                setSelectedEstados([...selectedEstados, item]);
            }
        } else if (type === "categoria") {
            if (selectedCategorias.includes(item)) {
                setSelectedCategorias(selectedCategorias.filter((categoria) => categoria !== item));
            } else {
                setSelectedCategorias([...selectedCategorias, item]);
            }
        }
    };

    const handleApply = () => {
        onApplyFilters(selectedEstados, selectedCategorias);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (estadoDropdownRef.current && !estadoDropdownRef.current.contains(event.target)) {
                setIsEstadoDropdownOpen(false);
            }
            if (categoriaDropdownRef.current && !categoriaDropdownRef.current.contains(event.target)) {
                setIsCategoriaDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2 className="modal-title">Filtros</h2>
                <div className="modal-section">
                    <label htmlFor="estado">Estado:</label>
                    <div className="dropdown" ref={estadoDropdownRef}>
                        <div
                            className="dropdown-selected"
                            onClick={() => {
                                setIsEstadoDropdownOpen(!isEstadoDropdownOpen);
                                setIsCategoriaDropdownOpen(false);
                            }}>
                            {selectedEstados.length > 0
                                ? selectedEstados.join(", ")
                                : "Todos los Estados"}
                        </div>
                        {isEstadoDropdownOpen && (
                            <div className="dropdown-options">
                                {estados.map((estado) => (
                                    <div key={estado.id} className="dropdown-option">
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={estado.estado}
                                                checked={selectedEstados.includes(estado.estado)}
                                                onChange={() => handleCheckboxChange(estado.estado, "estado")}
                                            />
                                            {estado.estado}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-section">
                    <label htmlFor="categoria">Categoría:</label>
                    <div className="dropdown" ref={categoriaDropdownRef}>
                        <div
                            className="dropdown-selected"
                            onClick={() => {
                                setIsCategoriaDropdownOpen(!isCategoriaDropdownOpen);
                                setIsEstadoDropdownOpen(false); 
                            }}>
                            {selectedCategorias.length > 0
                                ? selectedCategorias.join(", ")
                                : "Todas las Categorías"}
                        </div>
                        {isCategoriaDropdownOpen && (
                            <div className="dropdown-options">
                                {categorias.map((categoria) => (
                                    <div key={categoria.id} className="dropdown-option">
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={categoria.categoria}
                                                checked={selectedCategorias.includes(categoria.categoria)}
                                                onChange={() => handleCheckboxChange(categoria.categoria, "categoria")}
                                            />
                                            {categoria.categoria}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="modal-button" onClick={handleApply}>
                        Aplicar
                    </button>
                    <button className="modal-button" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltrosModal;
