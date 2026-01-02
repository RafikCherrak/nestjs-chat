import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        avatarFileKey: true,
      },
    });

    //   const usersWithAvatar = await Promise.all(
    //     users.map(async (user) => {
    //       let avatarUrl = '';
    //       if (user.avatarFileKey) {
    //         avatarUrl = await this.awsS3Service.getFileUrl({
    //           fileKey: user.avatarFileKey,
    //         });
    //       }
    //       return { ...user, avatarUrl };
    //     }),
    //   );

    //   return usersWithAvatar;
    return users;
  }

  async getUser({ userId }: { userId: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        avatarFileKey: true,
        stripeAccountId: true,
      },
    });
    // let avatarUrl = '';
    // if (user.avatarFileKey) {
    //   avatarUrl = await this.awsS3Service.getFileUrl({
    //     fileKey: user.avatarFileKey,
    //   });
    // }
    // let canReceiveMoney = false;
    // if (user.stripeAccountId) {
    //   const stripeAccountData = await this.stripe.getStripeAccount({
    //     stripeAccountId: user.stripeAccountId,
    //   });
    //   canReceiveMoney = stripeAccountData.canReceiveMoney;
    // }
    // return { ...user, avatarUrl, canReceiveMoney };
    return user;
  }
}
