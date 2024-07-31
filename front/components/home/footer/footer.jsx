import Container from "../container";

export default function Footer() {
  return (
    <footer className="mt-40 py-5 border-t-2">
      <Container>
        <p className="text-center text-light max-sm:text-sm">
          Desenvolvido por{" "}
          <span className="font-medium text-blue-800">Miquelven</span>
        </p>
      </Container>
    </footer>
  );
}
