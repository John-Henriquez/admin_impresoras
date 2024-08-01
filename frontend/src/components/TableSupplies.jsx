import React from 'react';

const TableSupplies = ({ columns, data }) => {
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
                    <td key={columns.accessor}>
                      {row[columns.accessor]} 
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
export default TableSupplies;
