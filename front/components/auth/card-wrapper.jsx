import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header";
import BackButton from "./back-button";
import Loading from "../ui/loading";

export default function CardWrapper({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  isLoading,
}) {
  return (
    <Card className=" w-[300px] shadow-md sm:w-[400px]">
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      {isLoading && <Loading />}
    </Card>
  );
}
