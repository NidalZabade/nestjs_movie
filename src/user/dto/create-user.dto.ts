export class CreateUserDto {
  id: number;
  name: string;
  address: string;
  mobile: string;
  email: string;
  username: string;
  password: string;
  subscribed: boolean;
  deleted_at: Date;
}
