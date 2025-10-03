export interface Task {
  title: string;
  description: string;
  progress: "To Do" | "In Progress" | "Done";
}
