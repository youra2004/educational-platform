"use client";

import { getStudyNoteById } from "@/api/study-notes";
import { IStudyNote } from "@/types/study-notes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StudyNote = () => {
  const params = useParams<{ id: string }>();

  const [note, setNote] = useState<IStudyNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNoteHandler = async () => {
      const { data } = await getStudyNoteById(params.id);

      setNote(data.data);
      setIsLoading(false);
    };

    getNoteHandler();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary px-24 py-10 md:px-32 lg:px-40">
      {!isLoading && (
        <div className="flex w-1/2 flex-col rounded-lg">
          <div className="rounded-t-lg bg-secondary p-4">
            <h1 className="text-3xl font-bold text-white">{note?.title}</h1>
          </div>
          <div className="rounded-b-lg bg-white p-4">
            <div
              className="prose max-w-none [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-red-600 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-gray-100"
              dangerouslySetInnerHTML={{ __html: note?.content || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyNote;
