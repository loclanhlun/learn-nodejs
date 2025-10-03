import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string | null;

  constructor(
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    refreshToken?: string | null
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.username = username || "";
    this.password = password || "";
    this.refreshToken = refreshToken || null;
  }
}
