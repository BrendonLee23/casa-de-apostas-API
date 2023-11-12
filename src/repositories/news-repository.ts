import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type AlterNewsData = CreateNewsData;

export function getAllNews() {
  return prisma.news.findMany();
}

export function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}

export async function create(newsData: CreateNewsData) {
  // validate with news with specific text already exists
  const newsWithTitle = await prisma.news.findFirst({
    where: { title: newsData.title }
  });

  if (newsWithTitle) {
    throw {
      name: "Conflict",
      message: `News with title ${newsData.title} already exist`
    }
  }

  return prisma.news.create({
    data: newsData
  });
}

export async function update(id: number, news: AlterNewsData) {
  // validate with news with specific text already exists
  const newsWithTitle = await prisma.news.findFirst({
    where: { title: news.title }
  });

  if (newsWithTitle) {
    throw {
      name: "Conflict",
      message: `News with title ${news.title} already exist`
    }
  }

  return prisma.news.update({
    where: { id },
    data: news
  })
}

export async function remove(id: number) {
  const news = await getNewsById(id);

  if (news) {
    return null;
  }

  return prisma.news.delete({
    where: { id }
  })
}