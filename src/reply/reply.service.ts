import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateReplyInWodInput, CreateReplyInWodOutput } from "./dtos/create-reply-in-wod.dto";
import { DeleteReplyInWodInput, DeleteReplyInWodOutput } from "./dtos/delete-reply-in-wod.dto";
import { EditReplyInWodInput, EditReplyInWodOutput } from "./dtos/edit-reply-in-wod.dto";
import { Reply } from "./entities/reply.entity";



@Injectable()
export class ReplyService {
    constructor(
        @InjectRepository(Reply)
            private readonly replies:Repository<Reply>,
        @InjectRepository(Comment)
            private readonly comments:Repository<Comment>,
    ) {}

    async createReplyInWod(
        authUser:User,
        createReplyInput:CreateReplyInWodInput
    ):Promise<CreateReplyInWodOutput> {
        try {
            const comment = await this.comments.findOne(createReplyInput.commentId);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            await this.replies.save( this.replies.create({...createReplyInput, owner:authUser, comment}) );
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async editReplyInWod(
        authUser:User,
        editReplyInWodInput:EditReplyInWodInput
    ):Promise<EditReplyInWodOutput> {
        try {
            const reply = await this.replies.findOne(editReplyInWodInput.replyId);
            if(!reply) {
                return {
                    ok:false,
                    error:"Reply not found."
                }
            }
            if(reply.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.replies.save([{ id:editReplyInWodInput.replyId, ...editReplyInWodInput }]);
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async deleteReplyInWod(
        authUser:User,
        deleteReplyInWodInput:DeleteReplyInWodInput
    ):Promise<DeleteReplyInWodOutput> {
        try {
            const reply = await this.replies.findOne(deleteReplyInWodInput.id);
            if(!reply) {
                return {
                    ok:false,
                    error:"Reply not found."
                }
            }
            if(reply.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.replies.delete(deleteReplyInWodInput.id);
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

}