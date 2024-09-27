import React, { useEffect } from "react";
import "./App.css";

function App() {
  // name, email, phone number
  const handleShowClinicosForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bodyPartScan: string,
  ) => {
    e.preventDefault();
    const procedureEvent = new CustomEvent("procedure-update", {
      detail: { bodyPartScan },
    });
    window.dispatchEvent(procedureEvent);
    const modal = document.getElementById("scan-modal-k28vew83vj");
    if (modal) modal.style.display = "block";
  };

  useEffect(() => {
    window.addEventListener("message", (ev) => {
      console.log(ev.data);
    });
  }, []);

  return (
    <div className="App">
      <button onClick={(e) => handleShowClinicosForm(e, "BODY")}>
        Open Body Scan
      </button>
      <button onClick={(e) => handleShowClinicosForm(e, "TORSO")}>
        Open Torso Scan
      </button>
    </div>
  );
}

export default App;
