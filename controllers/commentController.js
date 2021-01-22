const commentService = require("../services/commentService");
const Validator = require("fastest-validator");
const postService = require("../services/postService");

class CommentController {
    async save(req, res) {
        const comment = {
            comment: req.body.comment,
            postId: req.body.postId,
            userId: req.body.userId,
        };

        const schema = {
            comment: { type: "string", optional: false, max: "500" },
            postId: { type: "number", optional: false },
            userId: { type: "number", optional: false },
        };

        const v = new Validator();
        const validationResponse = v.validate(comment, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse,
            });
        }

        try {

            const post = await postService.show(comment.postId);
            if (post) {
                const response = await commentService.save(comment);
                return res.status(201).json({
                    message: "Comment created successfully",
                    comment: response,
                });
            }
            res.status(404).json({
                message: "Post not found",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
                error,
            });
        }
    }

    async show(req, res) {
        const id = req.params.id;

        try {
            const response = await commentService.show(id);
            if (response) {
                return res.status(200).json(response);
            }

            return res.status(404).json({
                message: "Comment not found",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong!",
                error,
            });
        }
    }

    async index(req, res) {
        try {
            const response = await commentService.findAll();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong!",
                error,
            });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const updatedComment = {
            comment: req.body.comment,
        };

        const userId = req.params.userId;

        const schema = {
            comment: { type: "string", optional: false, max: "500" },
        };

        const v = new Validator();
        const validationResponse = v.validate(updatedComment, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse,
            });
        }
        try {
            const [response] = await commentService.update(updatedComment, {
                id,
                userId,
            });
            if (response) {
                return res.status(200).json({
                    message: "Comment updated successfully",
                    comment: updatedComment,
                    response,
                });
            }
            return res.status(200).json({
                message: "Could not update",
                response,
            });
        } catch (error) {
            return res.status(200).json({
                message: "Something went wrong",
                error,
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const userId = req.params.userId;

        const updatedComment = {
            deletedAt: new Date(),
        };
        try {
            const [response] = await commentService.update(updatedComment, {
                id,
                userId,
            });

            if (response) {
                return res.status(200).json({
                    message: "Comment deleted successfully",
                    comment: updatedComment,
                    response,
                });
            }
            return res.status(200).json({
                message: "Could not delete",
                response,
            });
        } catch (error) {
            return res.status(200).json({
                message: "Something went wrong",
                error,
            });
        }
    }
}

module.exports = new CommentController();
