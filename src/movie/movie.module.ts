import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { HistoryMiddleware } from 'src/middlewares/history.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('AppModule');
    consumer.apply(HistoryMiddleware).forRoutes('movie');
  }
}
