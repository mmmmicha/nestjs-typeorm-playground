import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<Cats>

@Schema()
export class Cats {
    @Prop({
        type: String,
        required: false
    })
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;
}

export const CatsSchema = SchemaFactory.createForClass(Cats);