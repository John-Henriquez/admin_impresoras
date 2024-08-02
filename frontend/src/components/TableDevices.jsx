// Importamos el ícono de eliminar desde la carpeta de activos
import deleteIcon from '../assets/deleteIcon.svg';

// Componente de tabla que recibe columnas, datos y una función de eliminación como props
const Table = ({ columns, data, onDelete }) => {
    // Definimos un total de filas para la tabla
    const totalRows = 10;
    // Calculamos la cantidad de filas vacías que se necesitan para completar el total de filas
    const numEmptyRows = totalRows - (data.length > 0 ? data.length : 1);

    return (
        <table id="users">
            <thead>
                <tr>
                    {/* Mapeamos y renderizamos cada columna */}
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Si no hay datos, mostramos un mensaje de 'No se encontraron resultados' */}
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="no-data">
                            No se encontraron resultados.
                        </td>
                    </tr>
                ) : (
                    // Si hay datos, mapeamos y renderizamos cada fila con sus respectivas columnas
                    data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col}>
                                    {col === 'Acción' ? (
                                        // Si la columna es 'Acción', renderizamos el ícono de eliminar
                                        <img
                                            src={deleteIcon}
                                            alt="Eliminar"
                                            style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                                            onClick={() => onDelete(row.ID)} // Llamamos a la función onDelete con el ID del elemento
                                        />
                                    ) : (
                                        // Para las demás columnas, renderizamos el valor correspondiente
                                        row[col]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                {/* Renderizamos filas vacías según la cantidad calculada */}
                {Array.from({ length: numEmptyRows }).map((_, index) => ( // Se crea un array con la cantidad de filas vacías
                    <tr key={`empty-${index}`} className="empty-row"> {/* Se mapea el array y se renderiza una fila vacía por cada elemento */}
                        {columns.map((col) => ( // Se mapean las columnas y se renderiza una celda vacía por cada una
                            <td key={`${col}-empty-${index}`}></td> // Se asigna una clave única a cada celda
                        ))} {/* Se cierra el mapeo de las columnas */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Exportamos el componente Table como predeterminado
export default Table;
