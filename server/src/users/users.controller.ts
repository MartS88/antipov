import {
    Controller,

} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiTags} from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    //
    // @ApiOperation({summary: 'User register'})
    // @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    // @Post('user-registration')
    // async create(@Body() userDto: CreateUserDto): Promise<any> {
    //     try {
    //         const user = await this.usersService.createUser(userDto);
    //         return {success: true, user};
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         return {success: false, error: error.message};
    //     }
    // }
    //

}