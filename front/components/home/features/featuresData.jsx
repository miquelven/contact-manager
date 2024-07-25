import { FilePlus2, FilePenLine, Filter, Download } from "lucide-react";

const featuresData = [
  {
    id: 0,
    title: "Adicione",
    description: "Adicione novos contatos de forma rápida e fácil.",
    icon: <FilePlus2 className="w-12 h-12" />,
  },
  {
    id: 1,
    title: "Edite",
    description:
      "Edite as informações dos seus contatos sempre que necessário.",
    icon: <FilePenLine className="w-12 h-12" />,
  },
  {
    id: 2,
    title: "Baixe",
    description: "Baixe sua lista de contatos para uso offline.",
    icon: <Download className="w-12 h-12" />,
  },
  {
    id: 3,
    title: "Filtre",
    description: "Filtre contatos para encontrar exatamente o que precisa.",
    icon: <Filter className="w-12 h-12" />,
  },
];

export default featuresData;
