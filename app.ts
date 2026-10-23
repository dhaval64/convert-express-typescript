import express from 'express'

const app = express()
app.use(express.json())

// 🎯 EXERCISE 1: Define a union type for task priority
export type Priority = any

// 🎯 EXERCISE 2: Define a union type for task status
export type Status = any

// 🎯 EXERCISE 3: Define an interface for a Task item
export interface Task {
  id: any
  title: any
  description: any
  status: any
  priority: any
  createdAt: any
}

// 🎯 EXERCISE 4: Define a type or interface for creating a new Task (request body payload)
export interface CreateTaskDTO {
  title: any
  description: any
  priority: any
}

// 🎯 EXERCISE 5: Define a type or interface for updating a Task (request body payload)
export interface UpdateTaskDTO {
  title?: any
  description?: any
  status?: any
  priority?: any
}

// 🎯 EXERCISE 6: Type the in-memory array of tasks
const tasks: any = [
  {
    id: '1',
    title: 'Set up TypeScript in Express',
    description: 'Configure tsconfig and install type definitions',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Type middleware and route handlers',
    description: 'Add types for Request, Response, and NextFunction',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(),
  },
]

// 🎯 EXERCISE 7: Type the helper function parameters and return type
function findTaskById(id: any): any {
  return tasks.find((t: any) => t.id === id)
}

// 🎯 EXERCISE 8: Type the custom logging middleware parameters
const requestLogger = (req: any, res: any, next: any) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

app.use(requestLogger)

// 🎯 EXERCISE 9: Type the route handler parameters for GET /tasks (all tasks with optional status filter)
app.get('/tasks', (req: any, res: any) => {
  const { status } = req.query

  if (status) {
    const filtered = tasks.filter((t: any) => t.status === status)
    return res.json(filtered)
  }

  return res.json(tasks)
})

// 🎯 EXERCISE 10: Type the route handler parameters for GET /tasks/:id
app.get('/tasks/:id', (req: any, res: any) => {
  const task = findTaskById(req.params.id)

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  return res.json(task)
})

// 🎯 EXERCISE 11: Type the route handler parameters and request body for POST /tasks
app.post('/tasks', (req: any, res: any) => {
  const { title, description, priority } = req.body

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const newTask: any = {
    id: Date.now().toString(),
    title,
    description: description || '',
    status: 'pending',
    priority: priority || 'medium',
    createdAt: new Date(),
  }

  tasks.push(newTask)
  return res.status(201).json(newTask)
})

// 🎯 EXERCISE 12: Type the route handler parameters and request body for PUT /tasks/:id
app.put('/tasks/:id', (req: any, res: any) => {
  const taskIndex = tasks.findIndex((t: any) => t.id === req.params.id)

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  const existingTask = tasks[taskIndex]
  const updatedTask = {
    ...existingTask,
    ...req.body,
  }

  tasks[taskIndex] = updatedTask
  return res.json(updatedTask)
})

// 🎯 EXERCISE 13: Type the route handler parameters for DELETE /tasks/:id
app.delete('/tasks/:id', (req: any, res: any) => {
  const taskIndex = tasks.findIndex((t: any) => t.id === req.params.id)

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  const deleted = tasks.splice(taskIndex, 1)[0]
  return res.json({ message: 'Task deleted successfully', task: deleted })
})

// 🎯 EXERCISE 14: Type the 4-parameter error-handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// 🎯 EXERCISE 15: Type the port variable and the listen callback
const PORT: any = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
