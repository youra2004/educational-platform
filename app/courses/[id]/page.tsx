"use client";

import { getCourseById, startCourse } from "@/api/courses";
import { ICourse, ICourseQuiz } from "@/types/courses";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Loader } from "@/components";
import avatarPlaceholder from "@/public/images/avatar_placeholder.jpeg";
import QuizModal from "@/components/QuizModal";
import { useTranslations } from "next-intl";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function CourseDetailPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams<{ id: string }>();
  const t = useTranslations();

  const actionHandler = async () => {
    if (course?.status === "in-progress") {
      setIsQuizOpen(true);
      return;
    }

    if (course) {
      await startCourse(params.id);
      setCourse((prev) => {
        if (prev) {
          return { ...prev, status: "in-progress" };
        }
        return prev;
      });
    }
  };

  const finishQuizHandler = () => {
    setCourse((prev) => {
      if (prev) {
        return { ...prev, status: "completed" };
      }
      return prev;
    });
  };

  useEffect(() => {
    const getCourse = async () => {
      setIsLoading(true);
      const { data } = await getCourseById(params.id);

      setCourse(data.data);
      setIsLoading(false);
    };

    getCourse();
  }, []);

  return (
    <div className="flex w-full items-center justify-center bg-primary py-24">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
        {!isLoading && (
          <>
            <div className="relative aspect-video bg-black">
              {course?.status !== "not-started" ? (
                <ReactPlayer
                  url={course?.video}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute left-0 top-0"
                />
              ) : (
                <Image
                  src={course?.cover ?? ""}
                  alt="course"
                  fill
                  className="absolute left-0 top-0"
                />
              )}
            </div>

            <div className="p-6">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {course?.title}
              </h2>
              <p className="mb-4 text-gray-700">{course?.description}</p>

              <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full"
                    src={course?.tutor.avatar ?? avatarPlaceholder.src}
                    width={48}
                    height={48}
                    alt="tutor"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">
                      {course?.tutor.username}
                    </span>
                    <span>{t("course_teacher")}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {course?.status !== "completed" && (
                    <Button
                      variant="primary"
                      className="flex items-center gap-2"
                      onClick={actionHandler}
                    >
                      <i className="fas fa-play" />
                      <span className="font-medium">
                        {course?.status === "in-progress"
                          ? t("ready_for_quiz")
                          : t("start_course")}
                      </span>
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <i className="fas fa-share-alt" />
                    <span className="font-medium text-gray-500">
                      {t("share_course")}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {isLoading && (
          <div className="py-32">
            <Loader />
          </div>
        )}

        {isQuizOpen && (
          <QuizModal
            isOpen={isQuizOpen}
            setIsOpen={setIsQuizOpen}
            quiz={course?.quiz as ICourseQuiz}
            finishQuizHandler={finishQuizHandler}
          />
        )}
      </div>
    </div>
  );
}
