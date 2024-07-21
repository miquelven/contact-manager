"use client";

import { BeatLoader } from "react-spinners";

import CardWrapper from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { useRouter } from "next/navigation";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function NewVerificationForm() {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleClick = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);

        if (data.success) {
          router.push("/auth/login");
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error, router]);

  useEffect(() => {
    handleClick();
  }, [handleClick]);

  return (
    <CardWrapper
      headerTitle="Verificação"
      headerLabel="Confirme sua verificação"
      backButtonLabel="Voltar ao login"
      backButtonHref="/auth/login"
      isLoading={isPending}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {success == "" && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
