import { Card, CardContent } from "../../ui/card";
import TableData from "./data-table";

export default function TableContainer({ id }) {
  return (
    <section
      id="table"
      className="min-h-[600px] scroll-mt-24 h-[600px] w-[1200px] mx-auto mt-96"
    >
      <div className="w-full text-center flex flex-col gap-3">
        <span className="text-lg font-semibold text-blue-600">Tabela</span>
        <h3 className="text-5xl font-bold text-center">Tabela de Contatos</h3>
      </div>
      <Card className="w-[300px] mt-14 shadow-md sm:w-full  ">
        <CardContent>
          <TableData id={id || null} />
        </CardContent>
      </Card>
    </section>
  );
}
