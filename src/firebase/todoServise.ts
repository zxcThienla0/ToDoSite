import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export const createTodo = async (title: string, userId: string) => {
    const todoData = {
      title,
      completed: false,
      userId,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(
      collection(db, 'users', userId, 'todos'), 
      todoData
    );

    return {
      id: docRef.id,
      ...todoData,
      createdAt: new Date()
    } as Todo;
};

export const getUserTodos = async (userId: string) => {
    const q = query(
      collection(db, 'users', userId, 'todos'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    } as Todo));
};

export const updateTodo = async (todoId: string, userId: string, updates: Partial<Todo>) => {
    const todoRef = doc(db, 'users', userId, 'todos', todoId);
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
};

export const deleteTodo = async (todoId: string, userId: string) => {
    const todoRef = doc(db, 'users', userId, 'todos', todoId);
    await deleteDoc(todoRef);
};