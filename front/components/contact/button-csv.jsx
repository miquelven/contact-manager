"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import ImportModal from "./import-modal";

export default function ButtonCsv() {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validFileTypes = ["text/csv", "application/vnd.ms-excel"];

      if (!validFileTypes.includes(fileType)) {
        setError("Por favor, faça o upload de um arquivo CSV.");
        return;
      }

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
          setError(null);
        },
        error: (err) => {
          setError(err.message);
        },
      });
    }
  };

  const handleDownloadCSV = () => {
    fetch("/api/download-csv")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "dados.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className="csv-importer">
      {/* <ImportModal
        buttonText="Adicionar"
        title="Adicionar Contato"
        label="Adicione as informações sobre o contato."
        onclick={handleClick}
      /> */}
      <Button>
        Importar <Download className="h-4 w-4 ml-3" />
      </Button>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {error && <p className="error">{error}</p>}
      {csvData.length > 0 && (
        <div className="csv-data">
          <h3>Dados do CSV:</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleDownloadCSV}>Baixar CSV de Exemplo</button>
    </div>
  );
}
