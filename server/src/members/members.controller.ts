import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {MembersService} from "./members.service";
import {UpdateMemberDto} from "./dto/update-member.dto";


@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {
    }

    @ApiOperation({summary: 'Get albums'})
    @ApiResponse({status: 200, description: 'Data fetched successfully'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('get')
    async fetchMembers() {
        try {
            const albums = await this.membersService.getAllMembers()
            return {success: true, albums};
        } catch (error) {
            return {success: false, error: error.message};
        }
    }

    @ApiOperation({summary: 'Get member'})
    @ApiResponse({status: 200, description: 'Data fetched successfully'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get(':email')
    async getMember(@Param('email',) email: string): Promise<any> {
        try {
            const albums = await this.membersService.getMember(email)
            return {success: true, albums};
        } catch (error) {
            return {success: false, error: error.message};
        }
    }

    @ApiOperation({ summary: 'Update member like' })
    @ApiResponse({ status: 200, description: 'Data updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @Patch('')
    async updateMemberLike(@Body() memberDto: UpdateMemberDto): Promise<any> {
        try {
            const member = await this.membersService.updateLike(memberDto);
            return { success: true, member };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }


}

