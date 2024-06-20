import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";


export class AuthUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'Value must be string'})
    @IsNotEmpty()
    @IsEmail({}, {message: 'Not correct email'})
    readonly email: string;

    @ApiProperty({example: 'Signed message', description: 'Signature from MetaMask'})
    @IsString({message: 'wallet must be string'})
    @IsNotEmpty()
    password: string;

}
