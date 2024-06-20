import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {AuthUserDto} from "./dto/auth-user.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() authDto: AuthUserDto): Promise<any> {
        try {
            const { token } = await this.authService.login(authDto);
            return { success: true, token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @ApiOperation({ summary: 'User register' })
    @ApiResponse({ status: 200, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @UsePipes(ValidationPipe)
    @Post('user-registration')
    async create(@Body() userDto: CreateUserDto): Promise<any> {
        try {
            const token = await this.authService.registration(userDto);
            return { success: true, token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
