import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types';

function Heatmap({ rows, columns, matrix, total }) {
  const max = Math.max(...matrix.flat(), 1);

  function cellColor(count) {
    if (count === 0) return "#ebedf0";
    const intensity = count / max;
    if (intensity < 0.25) return "#9be9a8";
    if (intensity < 0.5) return "#45c968";
    if (intensity < 0.75) return "#309f4e";
    return "#038b2e";
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-muted mb-2">
          Total responses: <strong>{total}</strong>
        </p>
      </div>
      <div className="table-responsive">
        <Table bordered responsive className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th className="fw-bold" style={{ minWidth: "120px" }}></th>
              {columns.map((col, c) => (
                <th key={c} className="fw-bold" style={{ minWidth: "100px" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                <td className="fw-bold text-start" style={{ minWidth: "120px" }}>
                  {row}
                </td>
                {columns.map((_, c) => (
                  <td
                    key={c}
                    style={{
                      background: cellColor(matrix[r][c]),
                      padding: "0.75rem",
                      minWidth: "100px",
                    }}
                  >
                    <span
                      style={{
                        color: matrix[r][c] / max > 0.5 ? "#fff" : "#000",
                        fontWeight: "500",
                        fontSize: "0.95rem",
                      }}
                    >
                      {matrix[r][c]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

Heatmap.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  total: PropTypes.number.isRequired,
};

export default Heatmap;
