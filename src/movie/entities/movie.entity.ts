import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  release_year: number;

  @Column()
  director_id: number;

  @Column()
  duration: number;

  @Column()
  stream_start_date: Date;

  @Column()
  stream_end_date: Date;

  @Column()
  deleted_at: Date;
}
