import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllCommentsInNoticeInput, AllCommentsInNoticeOutput } from "./dtos/comments-in-notice.dto";
import { CreateCommentInNoticeInput, CreateCommentInNoticeOutput } from "./dtos/create-comment-in-notice.dto";
import { DeleteCommentInNoticeInput, DeleteCommentInNoticeOutput } from "./dtos/delete-comment-in-notice.dto";
import { EditCommentInNoticeInput, EditCommentInNoticeOutput } from "./dtos/edit-comment-in-notice.dto";
import { Comment } from "./entities/comment.entity";



@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
            private readonly comments:Repository<Comment>,
        @InjectRepository(Notice)
            private readonly notices:Repository<Notice>,
    ) {}

    async createCommentInNotice(
        authUser:User,
        createCommentInNoticeInput:CreateCommentInNoticeInput
    ):Promise<CreateCommentInNoticeOutput> {
        try {
            const notice = await this.notices.findOne(createCommentInNoticeInput.noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            await this.comments.save( this.comments.create({...createCommentInNoticeInput, notice, owner:authUser}) );
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

    async editCommentInNotice(
        authUser:User,
        editCommentInNoticeInput:EditCommentInNoticeInput
    ):Promise<EditCommentInNoticeOutput> {
        try {
            const comment = await this.comments.findOne(editCommentInNoticeInput.commentId);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            if(comment.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannnot do that."
                }
            }
            await this.comments.save([{ id:editCommentInNoticeInput.commentId, ...editCommentInNoticeInput }]);
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

    async deleteCommentInNotice(
        authUser:User,
        deleteCommentInNoticeInput:DeleteCommentInNoticeInput
    ):Promise<DeleteCommentInNoticeOutput> {
        try {
            const comment = await this.comments.findOne(deleteCommentInNoticeInput.id);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            if(comment.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannnot do that."
                }
            }
            await this.comments.delete(deleteCommentInNoticeInput.id);
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

    async allCommentsInNotice(
        allCommentsInNoticeInput:AllCommentsInNoticeInput
    ):Promise<AllCommentsInNoticeOutput> {
        try {
            const notice = await this.notices.findOne(allCommentsInNoticeInput.noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            //comment는 없을 수 있으니 null도 가능
            const comments = await this.comments.find({relations:["notice", "owner"], where: {notice}});
            return {
                ok:true,
                comments
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

}