import axios, { AxiosResponse } from "axios";
import { Book } from "../types/types";

export const API_BASE_URL = "http://localhost:3001";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response: AxiosResponse<Book[]> = await axios.get(
      `${API_BASE_URL}/books`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const updateBk = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response: AxiosResponse<Book> = await axios.put(
      `${API_BASE_URL}/books/${bookId}`,
      updatedBook
    );
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response: AxiosResponse<Book> = await axios.post(
      `${API_BASE_URL}/books`,
      book
    );
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const deleteBk = async (bookId: any): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/books/${bookId}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
