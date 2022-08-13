import mongoose from "mongoose";
import slugify from "slugify";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: [10, "{VALUE} letters were too long"]
    },
    description: String,
    markdown: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: Date,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

articleSchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    };

    this.updatedAt = new Date();

    next();
});

export const ArticleModel = mongoose.model('Article', articleSchema);