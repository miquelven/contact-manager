import Image from "next/image";
import bg from "../../../public/about.svg";
import peoplebg from "../../../public/peoplebg.svg";
import Container from "../container";

export default function About() {
  return (
    <section className="my-40 scroll-mt-24" id="about">
      <Container>
        <div className="flex relative">
          <div className="w-2/4">
            <div className="flex flex-col gap-3 items-center">
              <span className="text-lg font-semibold text-blue-600">Sobre</span>
              <h3 className="text-5xl font-bold text-center">
                Gerencie contatos com facilidade
              </h3>
              <p className="font-ligth mt-10 text-center px-10 leading-8">
                No GC, facilitamos o gerenciamento de seus contatos com uma
                plataforma simples e poderosa. Adicione, edite, importe e
                exporte contatos com facilidade, e encontre rapidamente o que
                precisa com nossas ferramentas de filtragem e pesquisa. Nosso
                objetivo é tornar a organização de contatos uma tarefa fácil e
                eficiente.
              </p>
            </div>
          </div>
          <Image
            src={bg}
            className="w-[650px] absolute -top-32 right-0 h-[650px] "
            alt="Background color about"
          />
          <Image
            src={peoplebg}
            className="w-[650px] absolute -top-32 right-0 h-[650px] "
            alt="Background color about people"
          />
        </div>
      </Container>
    </section>
  );
}
