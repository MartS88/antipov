import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user-model';
import {AuthUserDto} from "./dto/auth-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(authDto: AuthUserDto) {
        const user = await this.validateUser(authDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const existingUser = await this.userService.getUserByEmail(userDto.email);

        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const newUser = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(newUser);
    }

    private async generateToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return { token: this.jwtService.sign(payload) };
    }

    private async validateUser(authDto: AuthUserDto) {
        const user = await this.userService.getUserByEmail(authDto.email);

        if (!user) {
            throw new ConflictException("User with this email doesn't exist");
        }

        const passwordEquals = await bcrypt.compare(authDto.password, user.password);
        if (passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect password' });
    }
}
