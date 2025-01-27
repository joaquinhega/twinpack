/* Sustituido por newQuotation y addProduct

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

const CartCheckout = () => {
    const { user } = useContext(UserContext);
    const [categoryForm, setCategoryForm] = useState([]);
    const [inputQuantity, setInputQuantity] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputNumber, setInputNumber] = useState("");
    const [inputObservations, setInputObservations] = useState("");
    const [files, setFiles] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const history = useHistory();

    const traerCategorias = () => {
        axios
            .post("http://localhost/pruebaTwinpack/php/buscar_categorias.php")
            .then((res) => {
                setCategoryForm(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        traerCategorias();
    }, []);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const addItemToOrder = () => {
        if (!inputQuantity || !inputDescription || !inputDate || !inputCode || !inputNumber) {
            toast.error("Por favor, complete todos los campos antes de agregar un ítem.");
            return;
        }
        const newItem = {
            quantity: inputQuantity,
            description: inputDescription,
            date: inputDate,
            code: inputCode,
            number: inputNumber,
        };
        setOrderItems([...orderItems, newItem]);
        setInputQuantity("");
        setInputDescription("");
        setInputDate("");
        setInputCode("");
        setInputNumber("");
    };

    const handleSubmit = () => {
        // Implementar la lógica para enviar la solicitud completa
        toast.success("Solicitud enviada con éxito.");
        history.push("/dashboard");
    };

    const handleCancel = () => {
        history.push("/dashboard");
    };

    return (
        <section>
            <div className="container">
                <h2>Nueva Solicitud</h2>
                <form>
                    <div>
                        <label>Categoría:</label>
                        <select class="row_input" value={inputCategory} onChange={(e) => setInputCategory(e.target.value)}>
                            <option value="">Seleccione una categoría</option>
                            {categoryForm.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.categoria}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Observaciones:</label>
                        <textarea
                            value={inputObservations}
                            onChange={(e) => setInputObservations(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Subir archivo:</label>
                        <input type="file" accept=".pdf,.svg" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            value={inputQuantity}
                            onChange={(e) => setInputQuantity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={inputDescription}
                            onChange={(e) => setInputDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Código:</label>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Número:</label>
                        <input
                            type="number"
                            value={inputNumber}
                            onChange={(e) => setInputNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="button" onClick={addItemToOrder}>
                            Agregar nuevo producto
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={handleSubmit}>
                            Terminar
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
                <h3>Items agregados</h3>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Código</th>
                            <th>Número</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                <td>{item.date}</td>
                                <td>{item.code}</td>
                                <td>{item.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CartCheckout;*/