import mongoose, { InferSchemaType, Schema } from 'mongoose';

const schema = new Schema({
    image: String
});

type Image = InferSchemaType<typeof schema>;

export const ImageModel = mongoose.model('Image', schema);