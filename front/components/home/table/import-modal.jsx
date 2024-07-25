import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { Download } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { addContact } from "@/lib/fetchData";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";

const ImportModal = ({ onclick, userId }) => {
  const [_, startTransition] = useTransition();

  const input = useRef(null);

  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileUpload = (event) => {
    setError(null);
    setSuccess(null);

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

  const resetWarning = () => {
    setError(null);
    setSuccess(null);
  };

  const onSubmit = () => {
    if (input.current.value == "") {
      setError("Selecione um arquivo");
      return;
    }

    const { email, phone, name, status } = csvData[0];
    setError("");

    startTransition(() => {
      addContact(email, phone, name, userId, status).then((data) => {
        if (data) {
          if (data.success) {
            setSuccess(data.success);
          } else {
            setError(data.erro);
          }
        }
      });
    });

    onclick();
  };

  return (
    <Dialog onOpenChange={resetWarning}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-[116px] flex items-center bg-black text-white `}
        >
          Importar <Download className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Importar</DialogTitle>
          <DialogDescription>
            Selecione o arquivo CSV para salvar o novo contato
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          accept=".csv"
          ref={input}
          onChange={handleFileUpload}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <DialogFooter>
          <Button onClick={onSubmit} className="block">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
