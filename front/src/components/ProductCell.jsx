// Informacion de las celdas en AnimatedModal. NO SE USA

import { useState} from "react";
const ProductCell = ({
    description,
    quantity,
    price,
    number,
    categoria_nombre,
    observations
}) => {
    const [ setShow] = useState(false);
    return (
            <tr className="product" onClick={() => setShow(true)}>
                <td data-title="Categoria" className="product_proveedor">{categoria_nombre}</td>
                <td data-title="Descripción" className="product_laboratorio">{description}</td>
                <td data-title="Cantidad" className="product_proveedor">{number}</td>
                <td data-title="Cantidad" className="product_proveedor">{quantity}</td>
                <td data-title="Precio" className="product_proveedor">{price}</td>
                <td data-title="Monto" className="product_proveedor">{Math.round(quantity * price * 100) / 100}</td>
                <td data-title="Precio" className="product_proveedor">{observations}</td>
            </tr>
    );
};

export default ProductCell;
