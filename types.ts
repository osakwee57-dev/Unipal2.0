export type University = string;

export type Course = string;

export enum Level {
  L100 = "100 Level",
  L200 = "200 Level",
  L300 = "300 Level",
  L400 = "400 Level",
  L500 = "500 Level / Final Year"
}

export interface User {
  id: string;
  name: string;
  email: string;
  university?: University;
  course?: Course;
  level?: Level;
  hasCompletedOnboarding: boolean;
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  description: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'Textbook' | 'Past Question' | 'Handout';
  author: string;
  course: Course;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  score: number;
  total: number;
}