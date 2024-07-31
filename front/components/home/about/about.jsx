import Image from "next/image";
import bg from "../../../public/about.svg";
import peoplebg from "../../../public/peoplebg.svg";
import Container from "../container";

export default function About() {
  return (
    <section className="my-40 scroll-mt-24" id="about">
      <Container>
        <div className="flex relative max-lg:flex-col">
          <div className="w-2/4 max-lg:w-full">
            <div className="flex flex-col gap-3 items-center">
              <span className="text-lg font-semibold text-blue-600 max-sm:text-sm ">
                Sobre
              </span>
              <h3 className="text-5xl font-bold text-center max-sm:text-3xl">
                Gerencie contatos com facilidade
              </h3>
              <p className="font-light mt-10 text-center px-10 leading-8 max-lg:p-0 max-sm:text-sm max-sm:leading-7">
                No GC, facilitamos o gerenciamento de seus contatos com uma
                plataforma simples e poderosa. Adicione, edite, importe e
                exporte contatos com facilidade, e encontre rapidamente o que
                precisa com nossas ferramentas de filtragem e pesquisa. Nosso
                objetivo é tornar a organização de contatos uma tarefa fácil e
                eficiente.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[300px]">
            <Image
              src={bg}
              className="w-[650px] absolute -top-32 right-0 h-[650px] max-xl:w-[480px] max-lg:top-0 max-xl:h-[480px] max-lg:left-0 max-lg:translate-x-[50%] max-lg:w-[380px] max-lg:h-[380px] max-sm:w-[320px] max-sm:h-[320px] max-sm:translate-x-0 "
              alt="Background color about"
            />
            <Image
              src={peoplebg}
              className="w-[650px] absolute -top-32 right-0 h-[650px] max-xl:w-[480px] max-lg:top-0 max-xl:h-[480px] max-lg:left-0 max-lg:translate-x-[50%] max-lg:w-[380px] max-lg:h-[380px] max-sm:w-[320px] max-sm:h-[320px] max-sm:translate-x-0"
              alt="Background color about people"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
