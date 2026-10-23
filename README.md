# Express + TypeScript Practice App

A complete Node.js & Express REST API designed for hands-on TypeScript typing practice.

## Setup & Running

- **Development server** (hot reload):
  ```bash
  npm run dev
  ```
- **Build / Typecheck**:
  ```bash
  npm run build
  ```
- **Start production build**:
  ```bash
  npm start
  ```

---

## 🎯 Exercises Overview in `app.ts`

Work your way through [app.ts](file:///d:/projects/Training%20projects/convert-express-typescript/app.ts) to replace `any` with strict TypeScript types:

1. **Exercise 1**: Union type for priority
2. **Exercise 2**: Union type for status
3. **Exercise 3**: Task model interface
4. **Exercise 4**: Request payload interface for creating a task (DTO)
5. **Exercise 5**: Request payload interface for updating a task (DTO)
6. **Exercise 6**: In-memory task list data structure
7. **Exercise 7**: Utility function parameters and return type
8. **Exercise 8**: Custom middleware parameters
9. **Exercise 9**: Route handler for `GET /tasks` with query parameters
10. **Exercise 10**: Route handler for `GET /tasks/:id` with path parameters
11. **Exercise 11**: Route handler for `POST /tasks` with request body
12. **Exercise 12**: Route handler for `PUT /tasks/:id` with path parameters and body
13. **Exercise 13**: Route handler for `DELETE /tasks/:id`
14. **Exercise 14**: 4-parameter error handling middleware
15. **Exercise 15**: Server port and listener callback

> **Tip**: When you are ready to test your work with strict type checking, change `"strict": true` and `"noImplicitAny": true` in [tsconfig.json](file:///d:/projects/Training%20projects/convert-express-typescript/tsconfig.json) and run `npm run build`.
