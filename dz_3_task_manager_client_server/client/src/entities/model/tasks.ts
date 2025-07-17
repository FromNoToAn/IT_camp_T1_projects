export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";
export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export const categories: Category[] = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
];
export const statuses: Status[] = ["To Do", "In Progress", "Done"];
export const priorities: Priority[] = ["Low", "Medium", "High"];

export type Task = {
  id: number;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  createdAt: string;
};

export interface Filters{
  category: Category | "All";
  status: Status | "All";
  priority: Priority | "All";
  createdFrom?: string;
  sortBy?: "createdAt" | "title" | "priority";
  sortOrder?: "asc" | "desc";
}

export const defaultFilters: Filters = {
  category: "All",
  status: "All",
  priority: "All",
  createdFrom: '',
  sortBy: "createdAt",
  sortOrder: "asc",
};

// export const tasks: Task[] = [
//   {
//     id: 1,
//     title: "Починить это приложение",
//     description: "Проблемы с роутером",
//     category: "Bug",
//     status: "Done",
//     priority: "High",
//     createdAt: "2025-07-15T10:00:00.000Z",
//   },
//   {
//     id: 2,
//     title: "Реализовать добавление задач",
//     category: "Documentation",
//     status: "To Do",
//     priority: "Low",
//     createdAt: "2025-07-10T14:30:00.000Z",
//   },
//   {
//     id: 3,
//     title: "Добавить фильтр",
//     category: "Documentation",
//     status: "Done",
//     priority: "Medium",
//     createdAt: "2025-07-12T09:15:00.000Z",
//   },
//   {
//     id: 4,
//     title: "Адаптировать дизайн",
//     description: "ПК и телефон",
//     category: "Feature",
//     status: "In Progress",
//     priority: "Medium",
//     createdAt: "2025-07-14T18:45:00.000Z",
//   },
// ];
