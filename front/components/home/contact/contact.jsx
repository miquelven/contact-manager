"use client";

import Image from "next/image";
import Container from "../container";
import FormContact from "./form-contact";
import contact from "../../../public/contact.svg";

export default function Contact() {
  return (
    <section className="mt-52 mb-60" id="contact">
      <Container>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-4">
            <span className="text-lg font-semibold text-blue-600">Contato</span>
            <h3 className="text-5xl font-bold text-center">
              Entre em Contato Conosco
            </h3>
          </div>
          <div className="w-full h-full relative flex justify-center gap-32 mt-24 items-center ">
            <Image src={contact} className="h-[450px]" alt="Contact Image" />
            <FormContact />
          </div>
        </div>
      </Container>
    </section>
  );
}
