"use client";

import { useEffect, useState } from "react";
import { getCourseList } from "@/api/courses";
import { ICourse } from "../../types/courses";
import Image from "next/image";
import { Button, Input } from "../../components";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Courses = () => {
  const router = useRouter();
  const t = useTranslations();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const redirectToCourse = (id: number) => {
    router.push(`/courses/${id}`);
  };

  const getCourses = async (searchValue?: string) => {
    const { data } = await getCourseList(searchValue);

    setCourses(data.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCourses(searchValue);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-4 bg-primary px-24 py-10 md:px-32 lg:px-40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-secondary">
          {t("courses_list")}
        </h1>
        <span className="text-grey">{t("choose_course")}</span>

        <Input
          className="!w-[600px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("search")}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex min-w-48 flex-col rounded-xl bg-white"
          >
            <div className="relative aspect-video rounded-t-xl">
              <Image
                src={course.cover}
                alt="cover"
                fill
                className="rounded-t-xl"
              />
            </div>

            <div className="flex h-full flex-col justify-between gap-2 p-4">
              <p className="text-lg font-bold text-secondary">{course.title}</p>
              <p className="line-clamp-2 text-grey">{course.description}</p>

              <div className="flex items-center gap-4">
                <Image
                  src={course.tutor.avatar}
                  width={32}
                  height={32}
                  alt={course.tutor.username}
                />
                <span>{course.tutor.username}</span>
              </div>

              <Button onClick={() => redirectToCourse(course.id)}>
                {t("visit")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
