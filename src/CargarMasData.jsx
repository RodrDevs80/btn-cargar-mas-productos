/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const CargarMasData = ({ url }) => {
  const [productos, setProductos] = useState([]);
  const [currentSkip, setCurrentSkip] = useState(0); //cambiar el skip para cargar mas
  const [loading, setLoading] = useState(false);
  const [currentError, setCurretError] = useState(null);
  const [disbleButton, setDisableButton] = useState(false);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${url}?limit=20&skip=${currentSkip === 0 ? 0 : currentSkip * 20}`
      );
      const data = await response.json();
      if (data && data.products && data.products.length) {
        setProductos((prevData) => [...prevData, ...data.products]); //la primera carga mas las demás, a medida que se cargan con el skip
        setLoading(false);
      }
    } catch (error) {
      setCurretError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
    if (productos.length === 100) {
      setDisableButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSkip]);
  if (loading) {
    return (
      <h2 className="load-text">
        Cargando...
        <img
          className="loading"
          src="./src/assets/img/cargar.svg"
          alt="loading"
        />
      </h2>
    );
  }
  if (currentError != null) {
    return <h2 className="mostrar-error">Se a producido un ERROR 🚨!!!</h2>;
  }

  return (
    <div className="container">
      <div className="product-container">
        {productos && productos.length !== 0
          ? productos.map((producto, index) => (
              <div className="product" key={index}>
                <img src={producto.thumbnail} alt={producto.title} />
                <h4>{producto.title}</h4>
                <p>${producto.price}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button
          onClick={() => setCurrentSkip(currentSkip + 1)}
          className={
            disbleButton ? "btn-cargar-mas desactivado" : "btn-cargar-mas"
          }
          disabled={disbleButton}
        >
          {disbleButton ? "Deshabilitado" : " Cargar Mas Productos"}
        </button>
      </div>
      <h4 style={{ textAlign: "center" }}>
        {disbleButton ? "Se cargaron 100 productos" : null}
      </h4>
    </div>
  );
};
