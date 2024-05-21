import { Request, Response } from "express"
import shortId from "shortid"
import { config } from "../config/Constants"
import { URLModel } from "../database/model/URL"

export class UrlController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originUrl } = req.body //recebe url pela requisição
    const url = await URLModel.findOne({ originUrl }) //consulta no banco se já existe esta url
    if (url) {
      res.json(url)
      return
    }
    const hash = shortId.generate() //gera a hash
    const shortURL = `${config.API_URL}/${hash}` //monta a url encurtada
    const newURL = await URLModel.create({ hash, shortURL, originUrl }) //criar um novo registro no banco
    res.json({ newURL })
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params
    const url = await URLModel.findOne({ hash })
    if (url) {
      res.redirect(url.originUrl)
      return
    }

    res.status(400).json({ error: "URL not found" })
  }
}
