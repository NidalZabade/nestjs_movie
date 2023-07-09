import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('histories')
export class History {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  movie_id: number;

  @Column()
  watching_time: number;

  @Column()
  is_completed: boolean;

  @Column()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.histories)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.histories)
  movie: Movie;
}
