import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { AuctionsModule } from './auctions/auctions.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { NftsModule } from './nfts/nfts.module';
import { HomeController } from './home/home.controller';
import { HomeModule } from './home/home.module';
import { HomeService } from './home/home.service';
import { CartsModule } from './carts/carts.module';
import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { WalletModule } from './wallet/wallet.module';
import { RolesModule } from './roles/roles.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RankService } from './rank/rank.service';
import { EventsModule } from './events/events.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { StudioController } from './studio/studio.controller';
import { StudioModule } from './studio/studio.module';
import { StudioService } from './studio/studio.service';
import { ImagesModule } from './images/images.module';
import { AdminModule } from './admin/admin.module';
import { CombineModule } from './combine/combine.module';
import { AuctionsGateway } from './auctions/auctions.gateway';
import { BizModule } from './biz/biz.module';
import { RankModule } from './rank/rank.module';
import { NoticesModule } from './notices/notices.module';
import { FaqsModule } from './faqs/faqs.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BooksModule,
    NotesModule,
    AuctionsModule,
    UsersModule,
    AuthModule,
    NftsModule,
    HomeModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    WalletModule,
    RolesModule,
    ScheduleModule.forRoot(),
    EventsModule,
    StudioModule,
    ImagesModule,
    AdminModule,
    CombineModule,
    BizModule,
    RankModule,
    NoticesModule,
    FaqsModule,
    PrismaModule,
  ],
  controllers: [
    AppController,
    BooksController,
    NotesController,
    HomeController,
    CartsController,
    OrdersController,
    StudioController,
  ],
  providers: [
    AppService,
    BooksService,
    NotesService,
    AuthService,
    UsersService,
    HomeService,
    CartsService,
    RankService,
    OrdersService,
    StudioService,
    AuctionsGateway,
    PrismaService,
  ],
  exports: [PaymentsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
