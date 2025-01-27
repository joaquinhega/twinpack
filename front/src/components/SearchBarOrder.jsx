// Barra de busqueda junto boton de filtros
import { useState } from "react";
import FiltrosModal from "./filtrosModal"; 

const SearchBarOrder = ({ onSubmit, onApplyFilters, onSearchClientsOrProviders }) => {
    const [showFiltrosModal, setShowFiltrosModal] = useState(false);

    const handleOpenFiltrosModal = () => {  
        setShowFiltrosModal(true);
    };

    const handleCloseFiltrosModal = () => {   
        setShowFiltrosModal(false);
    };

    const handleApplyFilters = (estado, categorias) => {
        onApplyFilters(estado, categorias); 
        handleCloseFiltrosModal();
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        onSearchClientsOrProviders(searchValue);
    };

    return (
        <div className="searchbar">
            <form className="searchbar_form" onSubmit={onSubmit}>
                <div>
                    <input 
                        className="searchbar_form_input" 
                        name="search" 
                        type="text" 
                        autoComplete="off" 
                        placeholder={`Buscar Cliente o Proveedor`} 
                        onChange={handleSearch} 
                    />
                    <button type="button" className="searchbar_form_submit" onClick={handleOpenFiltrosModal}>
                        Filtros
                    </button>
                </div>
            </form>
            {showFiltrosModal && <FiltrosModal onClose={handleCloseFiltrosModal} onApplyFilters={handleApplyFilters} />}
        </div>
    );
};

export default SearchBarOrder;