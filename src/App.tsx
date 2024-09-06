import React, { useEffect } from "react";
import "./App.css";

const aiSupportedProcedures = [
  "BBL",
  "TUMMY_TUCK",
  "BREAST_LIFT",
  "BREAST_REDUCTION",
  "BREAST_AUGMENTATION",
  "BREAST_LIFT_AND_AUGMENTATION",
];
const nonAiSupportedProceduresFace = [
  "RHINOPLASTY",
  "OTOPLASTY",
  "FOREHEAD_LIFT",
  "CHIN_SURGERY",
  "BURN_REPAIR",
  "RECONSTRUCTIVE_SURGERY",
  "SCAR_REVISION",
  "HAIR_TRANSPLANTATION",
  "LASER_TREATMENTS",
  "CHEMICAL_PEEL",
  "MICRODERMABRASION",
  "LASER_HAIR_REMOVAL",
  "BLEPHAROPLASTY",
  "RHYTIDECTOMY",
  "CHEEK_AUGMENTATION",
  "HAIR_TRANSPLANT",
  "BIOCHETOMY",
  "FACE_LIFT",
  "CHIN_IMPLANT",
];

const nonAiSupportedProceduresBody = [
  "BBL",
  "TUMMY_TUCK",
  "LIPOSUCTION",
  "RENUVION",
  "ABDOMINAL_ETCHING",
  "THIGH_LIPOSUCTION",
  "ARMS_LIPOSUCTION",
  "CHIN_LIPOSUCTION",
  "LABIAPLASTY",
  "VAGINAL_TIGHTENING",
  "VAGINAL_PRP",
];

const invalidProcedure = ["INVALID_PROCEDURE"];

const nonAiSupportedProceduresBreast = ["LIPOSUCTION"];

function App() {
  // name, email, phone number
  const handleShowClinicosForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    procedure: string,
    name: string,
    email: string,
    phone: string,
  ) => {
    e.preventDefault();
    const procedureEvent = new CustomEvent("procedure-update", {
      detail: { procedure, name, email, phone },
    });
    window.dispatchEvent(procedureEvent);
    const modal = document.getElementById("scan-modal-k28vew83vj");
    if (modal) modal.style.display = "block";
  };

  useEffect(() => {
    window.addEventListener("message", (ev) => {
      // Do something with your image data
      console.log(ev.data);
    });
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflow: "auto",
          padding: "40px",
        }}
      >
        <h1>Invalid Procedure</h1>
        {invalidProcedure.map((procedure) => (
          <button
            key={procedure}
            onClick={(e) =>
              handleShowClinicosForm(
                e,
                procedure,
                "phu",
                "phu@clinicos.ai",
                "1234567890",
              )
            }
          >
            {procedure}
          </button>
        ))}
        <h1>AI Supported Procedures</h1>
        {aiSupportedProcedures.map((procedure) => (
          // key={procedure}
          <button
            onClick={(e) =>
              handleShowClinicosForm(
                e,
                procedure,
                "full name",
                "example@exmaple.com",
                "17075552222",
              )
            }
          >
            {procedure}
          </button>
        ))}
        <h1>Face Scan Procedures</h1>
        {nonAiSupportedProceduresFace.map((procedure) => (
          <button
            key={procedure}
            onClick={(e) =>
              handleShowClinicosForm(
                e,
                procedure,
                "phu",
                "phu@clinicos.ai",
                "1234567890",
              )
            }
          >
            {procedure}
          </button>
        ))}
        <h1>Torso Scan Procedures</h1>
        {nonAiSupportedProceduresBreast.map((procedure) => (
          <button
            key={procedure}
            onClick={(e) =>
              handleShowClinicosForm(
                e,
                procedure,
                "phu",
                "phu@clinicos.ai",
                "1234567890",
              )
            }
          >
            {procedure}
          </button>
        ))}
        <h1>Body Scan Procedures</h1>
        {nonAiSupportedProceduresBody.map((procedure) => (
          <button
            key={procedure}
            onClick={(e) =>
              handleShowClinicosForm(
                e,
                procedure,
                "phu",
                "phu@clinicos.ai",
                "1234567890",
              )
            }
          >
            {procedure}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
