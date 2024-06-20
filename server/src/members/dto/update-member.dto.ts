import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateMemberDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
    @IsEmail({}, { message: 'Not a valid email' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;

    @ApiProperty({ example: true, description: 'Like status' })
    @IsBoolean({ message: 'Like must be a boolean value' })
    @IsNotEmpty({ message: 'Like status is required' })
    like: boolean;
}
