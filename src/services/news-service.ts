import { AlterNewsData, CreateNewsData, create, getNewsById, remove, update, getAllNews } from "../repositories/news-repository";

async function getNews() {
  return getAllNews();
}

async function getSpecificNews(id: number) {
  return getNewsById(id);
}

async function createNews(newsData: CreateNewsData) {
  return create(newsData);
}

async function alterNews(id: number, newsData: AlterNewsData) {
  return update(id, newsData);
}

async function deleteNews(id: number) {
  return remove(id);
}

const newsService = {
  getNews,
  getSpecificNews,
  createNews,
  alterNews,
  deleteNews
}

export default newsService;