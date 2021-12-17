import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllNoticeOutput } from "./dtos/all-notice.dto";
import { CreateNoticeInput, CreateNoticeOutput } from "./dtos/create-notice.dto";
import { DeleteNoticeInput, DeleteNoticeOutput } from "./dtos/delete-notice.dto";
import { EditNoticeInput, EditNoticeOutput } from "./dtos/edit-notice.dto";
import { NoticeListOutput } from "./dtos/notice-list.dto";
import { OneNoticeInput, OneNoticeOutput } from "./dtos/one-notice.dto";
import { Notice } from "./entities/notice.entity";



@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(Notice)
            private readonly notices:Repository<Notice>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
    ) {}

    async createNotice(
        authUser:User,
        createNoticeInput:CreateNoticeInput
    ):Promise<CreateNoticeOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            await this.notices.save( this.notices.create({...createNoticeInput, affiliatedBox, owner:authUser}) );
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

    async editNotice(
        authUser:User,
        editNoticeInput:EditNoticeInput
    ):Promise<EditNoticeOutput> {
        try {
            const notice = await this.notices.findOne(editNoticeInput.noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            if(notice.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.notices.save([{ id:editNoticeInput.noticeId, ...editNoticeInput }]);
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

    async deleteNotice(
        authUser:User,
        {noticeId}:DeleteNoticeInput
    ):Promise<DeleteNoticeOutput> {
        try {
            const notice = await this.notices.findOne(noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            if(notice.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.notices.delete(noticeId);
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

    async noticeList(
        authUser:User,
        first?:number,
        after?:number
    ): Promise<NoticeListOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            
            
            const notices = await this.notices.find({relations:["owner"], where: {affiliatedBox}, order:{createdAt:"DESC"}});
            
            if(!notices.length) return { ok:true, edges:[] }
            
            const firstNotice = first || 5;
            const afterNotice = after || 0;
            const index = notices.findIndex((notice) => notice.id === afterNotice);
            const offset = index + 1;

            const noticeListResult = notices.slice(offset, offset + firstNotice);
            const lastNoticeListResult = noticeListResult[noticeListResult.length - 1];
            
            return {
                ok:true,
                pageInfo: {
                    endCursor: lastNoticeListResult.id,
                    hasNextPage: offset + firstNotice < notices.length,
                },
                edges: noticeListResult.map((notice) => ({
                    cursor: notice.id,
                    node: notice,
                }))
            }
            
            
        } catch (error) {
            return {
                ok:false,
                error:'WodList not found'
            }
        }
    }

    async allNotices(
        authUser:User
    ):Promise<AllNoticeOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            // const [notices, countNotice] = await this.notices.findAndCount({relations:["owner"], where: {affiliatedBox}});
            const notices = await this.notices.find({relations:["owner"], where: {affiliatedBox}, order:{createdAt:"DESC"}});
            if(!notices) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            return {
                ok:true,
                notices
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async findNoticeById({noticeId}: OneNoticeInput): Promise<OneNoticeOutput> {
        try {
            const notice = await this.notices.findOne(noticeId
                , { relations: ['comments', 'owner'], }
            );
            if(!notice) {
                return {
                    ok:false,
                    error:'Notice not found',
                };
            }
            return {
                ok: true,
                notice,
            };
        } catch (error) {
            return {
                ok: false,
                error:'Could not find notice',
            }
        }
    }
}
