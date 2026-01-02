import {
  Controller,
  Get,
  Param,
  // Post,
  // Req,
  // UploadedFile,
  // UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // localhost:3000/users
  getUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.userService.getUsers();
  }

  @Get('/:userId')
  // localhost:3000/users/3000
  getUser(@Param('userId') userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.userService.getUser({
      userId,
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('avatar'))
  // @Post()
  // // eslint-disable-next-line @typescript-eslint/require-await
  // async updateUser(
  //   @Req() requestWithUser: RequestWithUser,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   console.log({ file });
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //   const submittedFile = fileSchema.parse(file);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //   return this.userService.updateUser({
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //     userId: requestWithUser.user.userId,
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     submittedFile,
  //   });
  // }
}
