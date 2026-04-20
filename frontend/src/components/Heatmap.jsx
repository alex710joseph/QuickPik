import Table from "react-bootstrap/Table";
import "./Heatmap.css";

export default function Heatmap({ rows, columns, matrix, total }) {
  const max = Math.max(...matrix.flat(), 1);

  function getIntensity(count) {
    if (count === 0) return 0;
    const intensity = count / max;

    if (intensity < 0.25) return 1;
    if (intensity < 0.5) return 2;
    if (intensity < 0.75) return 3;
    return 4;
  }

  return (
    <>
      <p className="text-muted mb-2">
        Total responses: <strong>{total}</strong>
      </p>

      <Table bordered responsive className="text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th></th>
            {columns.map((col, c) => (
              <th key={c}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              <td className="fw-semibold text-start">{row}</td>

              {columns.map((_, c) => {
                const value = matrix[r][c];
                const level = getIntensity(value);

                return (
                  <td key={c} className={`heatmap-cell level-${level}`}>
                    <span
                      className={
                        level >= 3 ? "heatmap-text light" : "heatmap-text"
                      }
                    >
                      {value}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
