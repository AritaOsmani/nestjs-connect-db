import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Book extends Document {
    @Prop({ required: true })
    title: String

    @Prop({ required: true })
    author: String

    @Prop()
    pages: number

    @Prop([String])
    genres: string[]

    @Prop([{ name: String, body: String }])
    reviews: [{
        name: String
        body: String
    }]

}

export const BookSchema = SchemaFactory.createForClass(Book)