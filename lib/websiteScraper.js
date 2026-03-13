import axios from "axios"
import cheerio from "cheerio"

export async function scrapeWebsite(url){

  const res = await axios.get(url)

  const $ = cheerio.load(res.data)

  const text = $("body").text()

  return text.slice(0,5000)

}