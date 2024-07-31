import { Card, CardContent } from "@/components/ui/card";
import Container from "../container";
import featuresData from "./featuresData";

export default function Features() {
  return (
    <section
      id="features"
      className="w-full -scroll-mt-20 bg-blue-800  text-white py-32 my-40"
    >
      <Container>
        <h3 className="text-5xl font-bold text-center max-sm:text-3xl">
          Algumas Funcionalidades Disponíveis
        </h3>
        <p className="text-lg text-light text-center px-60 text-white/80 mt-5 max-lg:mt-10 max-lg:px-3 max-sm:text-sm">
          Gerencie seus contatos com facilidade e eficiência. Adicione, edite,
          baixe e filtre seus contatos para manter tudo organizado e acessível.
        </p>
        <ul className="grid grid-cols-4  gap-10 my-28 max-lg:grid-cols-2 max-sm:gap-6 max-[380px]:grid-cols-1">
          {featuresData.map((feature) => (
            <li key={feature.id}>
              <Card className="max-lg:py-5">
                <CardContent className="flex flex-col gap-8 justify-center items-center h-72 rounded-lg hover:bg-black/20 max-sm:h-[170px]">
                  <div className="flex flex-col justify-center items-center gap-10 max-lg:gap-5 max-sm:gap-2">
                    <h6 className="text-3xl font-semibold max-sm:text-xl">
                      {feature.title}
                    </h6>
                    <span className="font-light text-center max-lg:text-sm max-sm:text-xs">
                      {feature.description}
                    </span>
                  </div>
                  <span>{feature.icon}</span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
