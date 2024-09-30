"use server";

import prisma from "@/db";

const getLeaderBoard = async () => {
  const leaderboard = await prisma.user.findMany({
    orderBy: {
      points: "desc",
    },
    select: {
      id: true,
      name: true,
      points: true,
      image: true,
      email: true,
    },
  });
  return leaderboard;
};

export default getLeaderBoard;
