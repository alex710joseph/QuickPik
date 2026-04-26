import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import "../pages/css/MatrixGrid.css";

function MatrixGrid({ rows, columns, cells, onChange, disabled }) {
  function toggle(r, c) {
    if (disabled) return;
    const updated = cells.map((row) => [...row]);
    updated[r][c] = !updated[r][c];
    onChange(updated);
  }

  return (
    <div className="table-responsive">
      <Table bordered responsive className="text-center align-middle">
        <thead className="custom-color">
          <tr>
            <th
              className="fw-bold"
              style={{
                minWidth: "120px",
                background: "#F2E6D8",
                color: "#554F4F",
                borderColor: "#554F4F",
              }}
            ></th>
            {columns.map((col, c) => (
              <th
                key={c}
                className="fw-bold"
                style={{
                  minWidth: "100px",
                  background: "#F2E6D8",
                  color: "#554F4F",
                  borderColor: "#554F4F",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              <td
                className="fw-bold text-start"
                style={{
                  minWidth: "120px",
                  background: "#F2E6D8",
                  color: "#554F4F",
                  borderColor: "#554F4F",
                }}
              >
                {row}
              </td>
              {columns.map((_, c) => (
                <td
                  key={c}
                  onClick={() => toggle(r, c)}
                  style={{
                    cursor: disabled ? "default" : "pointer",
                    background: cells[r][c] ? "#554F4F" : "",
                    padding: "0.75rem",
                    minWidth: "100px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cells[r][c]}
                    onChange={() => toggle(r, c)}
                    disabled={disabled}
                    className="form-check-input"
                    style={{
                      pointerEvents: "none",
                      cursor: disabled ? "default" : "pointer",
                    }}
                    aria-label={`${rows[r]}-${columns[c]}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

MatrixGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

MatrixGrid.defaultProps = {
  disabled: false,
};

export default MatrixGrid;
