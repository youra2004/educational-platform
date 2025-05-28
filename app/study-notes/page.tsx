"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../components";
import { useRouter } from "next/navigation";
import { getStudyNotes } from "@/api/study-notes";
import { IStudyNote } from "@/types/study-notes";
import { useTranslations } from "next-intl";

const StudyNotes = () => {
  const router = useRouter();
  const t = useTranslations();

  const [notes, setNotes] = useState<IStudyNote[]>([]);

  const redirectToNote = (id: string) => {
    router.push(`/study-notes/${id}`);
  };

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await getStudyNotes();

      setNotes(data.data);
    };

    getCourses();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-primary px-24 py-10 md:px-32 lg:px-40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-secondary">
          {t("study_notes")}
        </h1>
        <span className="text-grey">
          {t("your_collection_of_learning_materials")}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((course) => (
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

              <Button onClick={() => redirectToNote(course.documentId)}>
                {t("visit")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyNotes;
