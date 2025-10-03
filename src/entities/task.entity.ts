import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity()
export class Task {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  progress: "To Do" | "In Progress" | "Done";

  constructor(
    title?: string,
    description?: string,
    progress?: "To Do" | "In Progress" | "Done"
  ) {
    this.title = title || "";
    this.description = description || "";
    this.progress = progress || "To Do";
  }
}
