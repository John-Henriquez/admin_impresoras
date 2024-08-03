import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';

const TablePrints = ({ columns, data, onDelete, onEdit}) => {
    const totalRows = 7;
    const numEmptyRows = totalRows - (data.length > 0 ? data.length : 1);

  return (
    <table id="users">
      <thead>
        <tr>
          {columns.map((columns) => (
            <th key={columns.accessor}>{columns.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="no-data">
              No se encontraron resultados.
            </td>
          </tr>
        ) : (
            data.map((row, index) => (
                <tr key={index}>
                    {columns.map((columns) => (
                      <td key={columns.a}>
                          {columns.accessor === 'Acción' ? (
                          <>
                            <img 
                              src={updateIcon} 
                              alt="Editar" 
                              style={{ marginRight: '10px', cursor: 'pointer', width: '24px', height: '24px' }}
                              onClick={() => onEdit(row)}
                            />
                              <img 
                                src={deleteIcon} 
                                alt="Eliminar" 
                                style={{ cursor: 'pointer', width: '24px', height: '24px' }} 
                                onClick={() => onDelete(row)}
                              />
                          </>
                          ) : (
                            row[columns.accessor]
                          )}
                      </td>
                      ))}
                  </tr>
            ))
        )}
          {Array.from({ length: numEmptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="empty-row">
              {columns.map((columns) => (
                <td key={`${columns.accessor}-empty-${index}`}></td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TablePrints;