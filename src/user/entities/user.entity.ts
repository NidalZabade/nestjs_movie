import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { History } from '../../history/entities/history.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  address: string;

  @Column({ unique: true, nullable: false })
  mobile: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  subscribed: boolean;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ nullable: false })
  role: number;

  @OneToMany(() => History, (history) => history.user)
  histories: History[];
}
