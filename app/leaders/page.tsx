"use client";

import React, { useEffect, useState } from "react";
import { getLeaders } from "@/api/leaders";
import { ILeaders } from "@/types/leaders";
import { useTranslations } from "next-intl";

const LeaderboardTable = () => {
  const t = useTranslations();

  const [leaders, setLeaders] = useState<ILeaders[]>([]);

  const getMedal = (index: number) => {
    const medalColors = ["text-yellow-400", "text-gray-400", "text-orange-400"];
    if (index < 3) {
      return (
        <i
          className={`fas fa-medal ${medalColors[index]} text-lg`}
          title={`${index + 1} place`}
        ></i>
      );
    }
    return <span>{index + 1}</span>;
  };

  useEffect(() => {
    const getLeadersHandler = async () => {
      const { data } = await getLeaders();

      setLeaders(data);
    };

    getLeadersHandler();
  }, []);

  return (
    <div className="flex w-full items-center justify-center bg-primary py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md">
        <div className="rounded-t-xl bg-gradient-to-b from-blue-800 to-blue-500 px-6 py-4 text-white">
          <h2 className="text-2xl font-bold">{t("leaderboard")}</h2>
          <p className="text-sm opacity-80">{t("top_ten")}</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3">{t("place")}</th>
              <th className="px-6 py-3">{t("name")}</th>
              <th className="px-6 py-3">{t("email")}</th>
              <th className="px-6 py-3">{t("points")}</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {leaders?.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{getMedal(index)}</td>
                <td className="px-6 py-4 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4 font-bold text-blue-900">
                  {user.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
