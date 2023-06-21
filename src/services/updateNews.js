const Parser = require('rss-parser');
const cron = require('node-cron');

const News = require('../models/news');
const Site = require('../models/site');

let updateNews = async () => {
  const sites = await getSites();
  await getNews(sites);
};

let getSites = async () => {
  try {
    const sites = await Site.find({});
    return sites;
  } catch (e) {
    console.log(e);
  }
};

let getNews = async (sites) => {
  await News.deleteMany({});
  console.log('Cleared old news');

  let parser = new Parser();

  for(let i in sites) {
    let feed = await parser.parseURL(sites[i].url);
    let objNews = [];

    for(let j in feed) {
      let news = feed[j];

      for(let k in news) {
        objNews[k] = {
          title: news[k].title,
          url: news[k].link,
          date: news[k].pubDate,
          content: news[k].content,
        }; 
      }

      break;
    }

    const news = new News({
      siteId: sites[i]._id,
      data: objNews,
    });

    await news.save();
  }
};

cron.schedule('0 23 */2 * *', () => {
  updateNews();
  console.log('News updated!');
});