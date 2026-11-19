import { LessonBook } from '../../types';
import { LESSONS_PART_1 } from './part1';
import { LESSONS_PART_2 } from './part2';
import { LESSONS_PART_3 } from './part3';

export const LESSON_BOOKS: LessonBook[] = [
  ...LESSONS_PART_1,
  ...LESSONS_PART_2,
  ...LESSONS_PART_3,
];

export const getLessonBookById = (id: string): LessonBook | undefined =>
  LESSON_BOOKS.find((book) => book.id === id);

export const TOTAL_LESSON_CHAPTERS = LESSON_BOOKS.reduce(
  (sum, book) => sum + book.chapters.length,
  0
);
