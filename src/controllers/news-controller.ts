import { Request, Response } from "express";
import httpStatus from "http-status";

import newsService from "./../services/news-service";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response) {
  const news = await newsService.getNews();
  res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid!");
  }

  const news = await newsService.getSpecificNews(id);
  if (!news) {
    return res.status(404).send("News not found!");
  }

  res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await newsService.createNews(newsData);

  res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid!");
  }

  const newsData = req.body as AlterNewsData;
  const alteredNews = await newsService.alterNews(id, newsData);

  res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid!");
  }

  try {
    await newsService.deleteNews(id);
  } catch (e) {
    return res.status(httpStatus.NOT_FOUND).send(e);
  }

  res.sendStatus(httpStatus.OK);
}