import Header from "../../auth/header";
import { Card, CardContent, CardHeader } from "../../ui/card";
import DataTableDemo from "@/components/contact/data-table";

export default function TableContainer({ id }) {
  return (
    <div className="min-h-[600px] h-[600px] w-[1200px] mx-auto mt-10">
      <Card className="w-[300px] shadow-md sm:w-full py-10 ">
        <CardHeader>
          <Header title="Tabela de Contatos" />
        </CardHeader>
        <CardContent>{id && <DataTableDemo id={id} />}</CardContent>
      </Card>
    </div>
  );
}
