import { prop, getModelForClass } from "@typegoose/typegoose"

export class URL {
  @prop({ type: ()=> [String], required: true})
  public hash!: string

  @prop({ type: ()=> [String], required: true })
  public originUrl!: string

  @prop({ type: ()=> [String], required: true })
  public shortURL!: string
}

export const URLModel = getModelForClass(URL)
