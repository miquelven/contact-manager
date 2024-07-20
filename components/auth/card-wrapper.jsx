import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header";
import BackButton from "./back-button";

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}) {
  return (
    <Card className="w-[400px] shadow-md ">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
