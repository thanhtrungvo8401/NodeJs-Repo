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

articleSchema.pre("save", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    };

    if (!this._id) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    } else {
        this.updatedAt = new Date();
    }

    next();
});

export const Article = mongoose.model('Article', articleSchema);