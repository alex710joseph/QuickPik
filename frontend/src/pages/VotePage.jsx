import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Container, Button, Alert, Badge } from "react-bootstrap";
import MatrixGrid from "../components/MatrixGrid";

export default function VotePage({ pollId, navigate }) {
  const [poll, setPoll] = useState(null);
  const [cells, setCells] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [msgVariant, setMsgVariant] = useState("success");

  useEffect(() => {
    Promise.all([
      fetch(`/api/polls/${pollId}`).then((r) => r.json()),
      fetch(`/api/submissions/mine/${pollId}`).then((r) => r.json()),
    ]).then(([pollData, existingSub]) => {
      setPoll(pollData);
      const empty = Array.from({ length: pollData.rows.length }, () =>
        Array(pollData.columns.length).fill(false),
      );
      if (existingSub?.selected_cells) {
        setCells(existingSub.selected_cells);
        setSubmitted(true);
      } else {
        setCells(empty);
      }
    });
  }, [pollId]);

  async function handleSubmit() {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ poll_id: pollId, selected_cells: cells }),
    });
    const data = await res.json();
    if (res.ok) {
      setSubmitted(true);
      setMsgVariant("success");
      setMessage(
        submitted ? "Your response has been updated!" : "Response submitted!",
      );
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMsgVariant("danger");
      setMessage(data.error);
    }
  }

  if (!poll) return <Container className="p-4">Loading...</Container>;

  const isClosed = poll.status === "closed";

  return (
    <Container className="py-4">
      <div className="mb-4">
        <Button
          variant="link"
          className="ps-0 mb-3 text-decoration-none"
          onClick={() => navigate("home")}
        >
          ← Back to Home
        </Button>

        <div className="d-flex align-items-center gap-3 mb-2">
          <h2 className="mb-0 fw-bold">{poll.title}</h2>
          <Badge bg={isClosed ? "secondary" : "success"} className="fs-6">
            {poll.status}
          </Badge>
        </div>

        {poll.description && <p className="text-muted fs-6">{poll.description}</p>}
      </div>

      {isClosed && (
        <Alert variant="secondary" className="mb-4">
          This poll is closed. You can view your response below.
        </Alert>
      )}
      {submitted && !isClosed && (
        <Alert variant="info" className="py-3 mb-4">
          You've already voted. You can update your selections and resubmit.
        </Alert>
      )}
      {message && (
        <Alert variant={msgVariant} className="py-3 mb-4">
          {message}
        </Alert>
      )}

      <div className="mb-4">
        <h4 className="fw-bold mb-3">Select Your Preferences</h4>
        <p className="text-muted mb-3">Click cells to select your preferred combinations:</p>
        <MatrixGrid
          rows={poll.rows}
          columns={poll.columns}
          cells={cells}
          onChange={setCells}
          disabled={isClosed}
        />
      </div>

      {!isClosed && (
        <Button variant="primary" size="lg" className="w-100" onClick={handleSubmit}>
          {submitted ? "Update Response" : "Submit Response"}
        </Button>
      )}
    </Container>
  );
}

VotePage.propTypes = {
  pollId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
