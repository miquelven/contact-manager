import { auth } from "@/auth";
import About from "@/components/home/about/about";
import Banner from "@/components/home/banner/banner";
import Contact from "@/components/home/contact/contact";
import Features from "@/components/home/features/features";
import Footer from "@/components/home/footer/footer";
import Header from "@/components/home/header/header";
import TableContainer from "@/components/home/table/table-container";
import ToTopButton from "@/components/home/totopbutton/totopbutton";

export default async function ContactPage() {
  const session = await auth();

  return (
    <>
      <Header user={session.user} />
      <Banner />
      <About />
      <TableContainer id={session.user.id} />
      <Features />
      <Contact />
      <ToTopButton />
      <Footer />
    </>
  );
}
