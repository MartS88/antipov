import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Member} from "./member-model";
import {UpdateMemberDto} from "./dto/update-member.dto";

@Injectable()
export class MembersService {
    constructor(
        @InjectModel(Member)
        private readonly memberRepository: typeof Member,
    ) {}

    async getAllMembers(): Promise<Member[]> {
        try {
            return await this.memberRepository.findAll();
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching albums');
        }
    }
    async getMember(email: string): Promise<Member> {
        const member = await this.memberRepository.findOne({ where: { email } });
        if (!member) {
            throw new NotFoundException('Member not found');
        }
        return member;
    }

    async updateLike(memberDto: UpdateMemberDto): Promise<Member> {
        const member = await this.getMember(memberDto.email);
        if (member) {
            member.like = memberDto.like;
            await member.save();
            return member;
        } else {
            throw new NotFoundException('Member not found');
        }
    }

}
