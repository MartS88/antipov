import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {MembersService} from "./members.service";
import {MembersController} from "./members.controller";
import {Member} from "./member-model";

@Module({
    imports: [SequelizeModule.forFeature([
        Member])],
    providers: [MembersService],
    controllers: [MembersController],
    exports: [MembersService]
})
export class MembersModule {
}
