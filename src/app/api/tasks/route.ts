import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// مدل تسک
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  progress: number; // درصد پیشرفت تسک (0 تا 100)
  startDate: string; // تاریخ شروع تسک
  endDate: string;   // تاریخ پایان تسک
}

// مسیر فایل tasks.json
const filePath = path.join(process.cwd(), 'data', 'tasks.json');

// تابع برای خواندن تسک‌ها از فایل
async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error('Error reading tasks:', error);
    throw new Error('Failed to read tasks');
  }
}

// تابع برای نوشتن تسک‌ها به فایل
async function writeTasks(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing tasks:', error);
    throw new Error('Failed to write tasks');
  }
}

// متد GET: دریافت لیست تسک‌ها و محاسبه درصد پیشرفت
export async function GET() {
  try {
    const tasks = await readTasks();

    // محاسبه درصد پیشرفت هر فرد
    const progressByPerson: { [key: string]: number } = {};
    const totalTasksByPerson: { [key: string]: number } = {};

    tasks.forEach((task) => {
      let taskProgress = 0;

      if (task.status === 'Done') {
        taskProgress = 100;
      } else if (task.status === 'In Progress') {
        taskProgress = 50;
      } else if (task.status === 'To Do') {
        taskProgress = 0;
      }

      if (!progressByPerson[task.assignedTo]) {
        progressByPerson[task.assignedTo] = 0;
        totalTasksByPerson[task.assignedTo] = 0;
      }

      progressByPerson[task.assignedTo] += taskProgress;
      totalTasksByPerson[task.assignedTo] += 1;
    });

    const progressResult = Object.keys(progressByPerson).map((person) => ({
      person,
      progress: progressByPerson[person] / totalTasksByPerson[person],
    }));

    // برگرداندن تسک‌ها به همراه درصد پیشرفت افراد
    return NextResponse.json({ tasks, progressResult });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// متد POST: اضافه کردن تسک جدید
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status, assignedTo, progress, startDate, endDate } = body;

    // بررسی فیلدهای ضروری
    if (!title || !description || !status || !assignedTo || progress == null || progress < 0 || progress > 100 || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const tasks = await readTasks();
    const newTask: Task = { id: Date.now(), title, description, status, assignedTo, progress, startDate, endDate };
    tasks.push(newTask);
    await writeTasks(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// متد PUT: ویرایش تسک
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, status, assignedTo, progress, startDate, endDate } = body;

    // بررسی فیلدهای ضروری
    if (!id || !title || !description || !status || !assignedTo || progress == null || progress < 0 || progress > 100 || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], title, description, status, assignedTo, progress, startDate, endDate };
    await writeTasks(tasks);

    return NextResponse.json(tasks[taskIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// متد DELETE: حذف تسک
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks.splice(taskIndex, 1); // حذف تسک از آرایه
    await writeTasks(tasks); // ذخیره تغییرات

    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
