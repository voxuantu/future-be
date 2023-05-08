/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  ERROR_COMMENT_NOT_FOUND,
  ERROR_CREATE_COMMENT,
  ERROR_DELETE_COMMENT,
} from "../constances/comment-res-message";
import { HttpStatus } from "../constances/enum";
import { CreateCommentDTO } from "../dto/request";
import { CommentResDTO } from "../dto/response/comment.dto";
import Comment from "../models/comment";
import Product from "../models/product";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";

export class CommentService {
  static async createComment(dto: CreateCommentDTO, userId: string) {
    try {
      const newComment = new Comment({
        content: dto.content,
        rate: dto.rate,
        user: userId,
      });

      await newComment.save();

      const resComment = await Comment.findById(newComment._id)
        .select("content rate createdAt user")
        .populate("user", "name avatar");

      await Product.findByIdAndUpdate(dto.productId, {
        $push: { comments: newComment._id },
      });
      return handlerResSuccess(
        CREATE_COMMENT_SUCCESS,
        resComment as CommentResDTO
      );
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_CREATE_COMMENT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async delete(productId: string, commentId: string, userId: string) {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return handleResFailure(ERROR_COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      if (userId == comment.user.toString()) {
        comment.deleteOne({ _id: commentId });
        await Product.findByIdAndUpdate(productId, {
          $pull: { comments: commentId },
        });
      }

      return handlerResSuccess(DELETE_COMMENT_SUCCESS, commentId);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_DELETE_COMMENT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }
}
