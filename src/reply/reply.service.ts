import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateReplyInNoticeInput, CreateReplyInNoticeOutput } from "./dtos/create-reply-in-notice.dto";
import { DeleteReplyInNoticeInput, DeleteReplyInNoticeOutput } from "./dtos/delete-reply-in-notice.dto";
import { EditReplyInNoticeInput, EditReplyInNoticeOutput } from "./dtos/edit-reply-in-notice.dto";
import { AllRepliesInNoticeInput, AllRepliesInNoticeOutput } from "./dtos/replies-in-notice.dto";
import { Reply } from "./entities/reply.entity";



@Injectable()
export class ReplyService {
    constructor(
        @InjectRepository(Reply)
            private readonly replies:Repository<Reply>,
        @InjectRepository(Comment)
            private readonly comments:Repository<Comment>,
    ) {}

    async createReplyInNotice(
        authUser:User,
        createReplyInput:CreateReplyInNoticeInput
    ):Promise<CreateReplyInNoticeOutput> {
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

    async editReplyInNotice(
        authUser:User,
        editReplyInNoticeInput:EditReplyInNoticeInput
    ):Promise<EditReplyInNoticeOutput> {
        try {
            const reply = await this.replies.findOne(editReplyInNoticeInput.replyId);
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
            await this.replies.save([{ id:editReplyInNoticeInput.replyId, ...editReplyInNoticeInput }]);
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

    async deleteReplyInNotice(
        authUser:User,
        deleteReplyInNoticeInput:DeleteReplyInNoticeInput
    ):Promise<DeleteReplyInNoticeOutput> {
        try {
            const reply = await this.replies.findOne(deleteReplyInNoticeInput.id);
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
            await this.replies.delete(deleteReplyInNoticeInput.id);
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

    async repliesInNotice(
        allRepliesInNoticeInput:AllRepliesInNoticeInput
    ):Promise<AllRepliesInNoticeOutput> {
        try {
            const comment = await this.comments.findOne(allRepliesInNoticeInput.commentId);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            const replies = await this.replies.find({relations:["comment", "owner"], where: {comment}, order:{createdAt:"DESC"}});
            return {
                ok:true,
                replies
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

}