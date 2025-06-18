import { Task } from "@/types/Task";

let tasks: Task[] = [
  { id: 1, title: "Add Task 1", completed: false },
  { id: 2, title: "Edit Task 1", completed: true },
  { id: 3, title: "Add Task 2", completed: true },
  { id: 4, title: "Edit Task 2", completed: true },
  { id: 5, title: "Remove Task 1", completed: true },
];

let idCounter = 3;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTasks(): Promise<Task[]> {
  await delay(300);

  return [...tasks];
}

export async function addTask(title: string): Promise<Task> {
  await delay(300);

  const newTask: Task = { id: idCounter++, title, completed: false };

  tasks.push(newTask);

  return newTask;
}

export async function deleteTask(id: number): Promise<void> {
  await delay(300);

  tasks = tasks.filter((t) => t.id !== id);
}

export async function toggleTaskStatus(id: number): Promise<Task> {
  await delay(300);

  const task = tasks.find((t) => t.id === id);

  if (!task) throw new Error("Task not found");

  task.completed = !task.completed;

  return { ...task };
}
