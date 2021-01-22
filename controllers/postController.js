const postService = require("../services/postService");
const Validator = require("fastest-validator");
const models = require("../models");

const Op = models.Sequelize.Op;

const { getPagination, getPagingData } = require("../utils/pagination");

class PostController {
  async save(req, res) {
    const post = {
      description: req.body.description,
      userId: req.body.userId,
    };

    const schema = {
      description: { type: "string", optional: false, max: "500" },
      userId: { type: "number", optional: false },
    };

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    try {
      const response = await postService.save(post);
      return res.status(201).json({
        message: "Post created successfully",
        post: response,
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
      const response = await postService.show(id);
      if (response) {
        return res.status(200).json(response);
      }
      return res.status(404).json({
        message: "Post not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }

  async index(req, res) {

    // postService.findAll()
    //   .then((result) => {
    //     return res.status(200).json(result);
    //   })
    //   .catch((error) => {
    //     return res.status(500).json({
    //       message: "Something went wrong!",
    //       error
    //     });
    //   });

    try {
      const response = await postService.findAll();
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
    const updatedPost = {
      description: req.body.description,
    };

    const userId = req.body.userId;

    const schema = {
      description: { type: "string", optional: false, max: "500" },
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }
    try {
      const [response] = await postService.update(updatedPost, { id, userId });
      if (response) {
        return res.status(200).json({
          message: "Post updated successfully",
          post: updatedPost,
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
    const userId = req.body.userId;

    const updatedPost = {
      deletedAt: new Date(),
    };
    try {
      const [response] = await postService.update(updatedPost, { id, userId });

      if (response) {
        return res.status(200).json({
          message: "Post deleted successfully",
          post: updatedPost,
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

  
  async findAllPaginated(req, res) {
    
  const { page, size, description } = req.query;
  const condition = description ? { description: { [Op.like]: `%${description}%` } } : {};
  const { limit, offset } = getPagination(page, size);

    try {
      const response = await postService.findAllPaginated(condition, limit, offset);
      const paginated = getPagingData(response, page, limit);
      return res.status(200).json(paginated);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }
}

module.exports = new PostController();
