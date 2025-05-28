"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./Button";
import { ICourseQuiz } from "../types/courses";
import { getQuizById, submitQuiz } from "../api/quiz";
import { IAnswers } from "../types/quiz";
import { useTranslations } from "next-intl";

interface QuizModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  quiz: ICourseQuiz;
  finishQuizHandler: () => void;
}

interface QuizQuestion {
  question: string;
  questionId: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export default function QuizModal({
  isOpen,
  setIsOpen,
  quiz,
  finishQuizHandler,
}: QuizModalProps) {
  const t = useTranslations();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<IAnswers[]>([]);

  const current = questions[currentQuestion];

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentQuestion < questions.length - 1) {
      setAnswers((prev) => [
        ...prev,
        { questionId: current?.questionId, selectedOption },
      ]);
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setCompleted(true);
      submitQuiz({
        quizId: quiz.id,
        answers: [
          ...answers,
          { questionId: current?.questionId, selectedOption },
        ],
      });
      finishQuizHandler();
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const { data } = await getQuizById(quiz?.documentId);

        const rawQuestions = data?.data?.questions || [];

        const mappedQuestions: QuizQuestion[] = rawQuestions.map((q) => ({
          question: q.question,
          questionId: q.documentId,
          options: q.options.map((opt) => ({
            text: opt.option,
            isCorrect: Boolean(opt.isCorrect),
          })),
        }));

        setQuestions(mappedQuestions);
      } catch (error) {
        console.error("Failed to load quiz", error);
      } finally {
        setLoading(false);
      }
    };

    if (quiz?.documentId) {
      fetchQuiz();
    }
  }, [quiz?.documentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-xl">
        {loading ? (
          <div className="p-6 text-center">{t("loading_quiz")}</div>
        ) : !questions.length ? (
          <div className="p-6 text-center">{t("no_questions_found")}</div>
        ) : !completed ? (
          <>
            <div className="flex items-center justify-between rounded-t-xl bg-secondary px-6 py-3 text-white">
              <h2 className="text-xl font-semibold">
                {t("check_your_knowledge")}
              </h2>
              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <div className="flex flex-col gap-1 bg-gray-100 px-8 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {t("question_of", {
                    current: currentQuestion + 1,
                    total: questions.length,
                  })}
                </p>
              </div>

              <div className="relative h-2 w-full rounded bg-gray-300">
                <div
                  className="absolute left-0 h-2 rounded bg-secondary"
                  style={{
                    width: (currentQuestion / questions.length) * 100 + "%",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 px-8 py-6">
              <h3 className="text-lg font-medium">{current.question}</h3>

              <div className="space-y-3">
                {current.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex cursor-pointer items-center rounded-lg border p-2 ${
                      selectedOption === option.text
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option.text}
                      checked={selectedOption === option.text}
                      onChange={() => setSelectedOption(option.text)}
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex rounded-b bg-gray-100 px-6 py-4">
              <Button
                className="w-full"
                onClick={handleNext}
                disabled={!selectedOption}
              >
                {currentQuestion + 1 == questions.length
                  ? t("submit")
                  : t("next")}
              </Button>
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <h2 className="mb-4 text-xl font-semibold">
              {t("quiz_completed")}
            </h2>
            <Button onClick={() => setIsOpen(false)}>{t("close")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
