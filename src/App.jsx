import React from "react";
import { generateCard } from "./components/Utils";
import "./styles.css";

const Number = ({ value = null }) => (
  <div
    style={{
      height: 30,
      border: "1px solid black",
      width: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: value ? "" : "blue"
    }}
  >
    {value}
  </div>
);

const Carton = ({ rows = [[]] }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(9, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
      height: 100,
      width: 300
    }}
  >
    {rows.map(column =>
      column.map((number, index) => <Number key={index} value={number} />)
    )}
  </div>
);

function App() {
  const [card, setCard] = React.useState([[]]);
  const generate = () => {
    const n = generateCard(1);
    setCard(n);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <>
    <h1 className="card-title">Bingo App</h1>
    <button className="card-btn" onClick={generate}>Generar</button>
    {card.map((numbers, i) => (
      <div className="card-aling">
        <Carton  key={i} rows={numbers || []} />
        <hr />
      </div>
    ))}
  </>
  )
}

export default App;