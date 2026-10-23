import express, { NextFunction, Request, Response } from 'express'

const app = express()
app.use(express.json())

export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export type Status = 'pending' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  createdAt: Date
}

const tasks: Task[] = [
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

function findTaskById(id: string): Task {
  return tasks.find((t) => t.id === id)
}

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

app.use(requestLogger)

app.get('/tasks', (req, res) => {
  const { status } = req.query

  if (status) {
    const filtered = tasks.filter((t) => t.status === status)
    return res.json(filtered)
  }

  return res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id)

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  return res.json(task)
})

app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  if (typeof priority !== 'string' || !PRIORITIES.includes(priority as Priority)) {
    return res.status(400).json({ message: 'Priority is not valid' })
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description: description || '',
    status: 'pending',
    priority: priority as Priority,
    createdAt: new Date(),
  }

  tasks.push(newTask)
  return res.status(201).json(newTask)
})

app.put('/tasks/:id', (req, res) => {
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

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id)

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  const deleted = tasks.splice(taskIndex, 1)[0]
  return res.json({ message: 'Task deleted successfully', task: deleted })
})

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const PORT: any = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
