"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import img from "@/public/images/sign-in.png";
import { Button, Input } from "@/components";
import { FormEventHandler, useState } from "react";
import { signIn } from "@/api/auth";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/stores/user-store";

const SignIn = () => {
  const router = useRouter();
  const t = useTranslations();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const trySignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const user = await signIn({ identifier: email, password });

    setUser(user);
    router.push("/courses");
  };

  return (
    <div className="flex h-dvh gap-24 p-8">
      <div className="flex w-1/2 flex-col items-center justify-center gap-8 rounded-2xl bg-primary px-12">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-bold">{t("learn_at_yours")}</h1>
          <span className="text-center text-2xl font-semibold">
            {t("explore_courses")}
          </span>
        </div>
        <div className="relative aspect-square w-3/4">
          <Image src={img} alt="sign-in logo" fill />
        </div>
        <span className="text-lg">{t("interactive_learning")}</span>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <div className="flex w-full max-w-[30rem] flex-col gap-12">
          <div>
            <h2 className="text-2xl font-bold">{t("sign_in")}</h2>
            <span>{t("unlock_quizzes")}</span>
          </div>

          <form className="flex flex-col gap-4" onSubmit={trySignIn}>
            <Input
              placeholder={t("enter_username_or_email")}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder={t("enter_password")}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">{t("sign_in")}</Button>
          </form>

          <span className="text-center text-gray-500">
            {t("dont_have_account")}{" "}
            <Link
              className="text-secondary hover:opacity-70"
              href="/auth/sign-up"
            >
              {t("create_one")}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
