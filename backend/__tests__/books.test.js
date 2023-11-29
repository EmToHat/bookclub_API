// __tests__/routes/books.test.js

const request = require("supertest");
const express = require("express");
const booksController = require("../controllers/books");
const booksRouter = require("../routes/books");

const app = express();

jest.mock("../controllers/books", () => ({
  getAllBooks: jest.fn(),
  findBookById: jest.fn(),
  findBookByTitle: jest.fn(),
  findBookByAuthor: jest.fn(),
  addBook: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
}));

app.use("/books", booksRouter);

describe("Books routes", () => {
  // Test for the "get all books" route
  describe("GET /books", () => {
    it("should get all books", async () => {
      booksController.getAllBooks.mockResolvedValueOnce([
        { id: 1, title: "Book 1" },
        { id: 2, title: "Book 2" },
      ]);

      const response = await request(app).get("/books");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, title: "Book 1" },
        { id: 2, title: "Book 2" },
      ]);
    });
  });

  // Test for the "get a book by ID" route
  describe("GET /books/:id", () => {
    it("should get a book by ID", async () => {
      booksController.findBookById.mockResolvedValueOnce({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });

      const response = await request(app).get("/books/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });
    });
  });

  // Test for the "get a book by title" route
  describe("GET /books/title/:title", () => {
    it("should get a book by title", async () => {
      booksController.findBookByTitle.mockResolvedValueOnce({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });

      const response = await request(app).get("/books/title/Sample%20Book");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });
    });
  });

  // Test for the "get a book by author" route
  describe("GET /books/author/:author", () => {
    it("should get a book by author", async () => {
      booksController.findBookByAuthor.mockResolvedValueOnce({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });

      const response = await request(app).get("/books/author/John%20Doe");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Sample Book",
        author: "John Doe",
      });
    });
  });

  // Test for the "add a book" route
  describe("POST /books", () => {
    it("should add a new book", async () => {
      const newBook = {
        title: "New Book",
        author: "Jane Doe",
      };

      booksController.addBook.mockResolvedValueOnce({
        id: 3,
        title: "New Book",
        author: "Jane Doe",
      });

      const response = await request(app).post("/books").send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 3,
        title: "New Book",
        author: "Jane Doe",
      });
    });
  });

  // Test for the "update a book" route
  describe("PUT /books/:id", () => {
    it("should update a book by ID", async () => {
      const updatedBook = {
        title: "Updated Book",
        author: "Updated Author",
      };

      booksController.updateBook.mockResolvedValueOnce({
        id: 1,
        title: "Updated Book",
        author: "Updated Author",
      });

      const response = await request(app).put("/books/1").send(updatedBook);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Updated Book",
        author: "Updated Author",
      });
    });
  });

  // Test for the "delete a book" route
  describe("DELETE /books/:id", () => {
    it("should delete a book by ID", async () => {
      booksController.deleteBook.mockResolvedValueOnce({
        id: 1,
        title: "Deleted Book",
        author: "Deleted Author",
      });

      const response = await request(app).delete("/books/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Deleted Book",
        author: "Deleted Author",
      });
    });
  });
});
