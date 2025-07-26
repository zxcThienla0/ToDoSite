import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
}

export const useUserTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth state changed:', currentUser?.uid);
            setUser(currentUser);
            if (!currentUser) {
                setTodos([]);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const loadTodos = async () => {
            if (!user) {
                setTodos([]);
                setLoading(false);
                return;
            }

            try {
                console.log('Loading todos for user:', user.uid);
                setLoading(true);

                const q = query(
                    collection(db, 'users', user.uid, 'todos'),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const userTodos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toDate()
                } as Todo));

                console.log('Loaded todos:', userTodos);
                setTodos(userTodos);
            } catch (error) {
                console.error('Ошибка загрузки todos:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, [user]);

    const addTodo = async (title: string) => {
        if (!user || !title.trim()) return;

        const todoData = {
            title: title,
            completed: false,
            userId: user.uid,
            createdAt: Timestamp.now()
        };

        const docRef = await addDoc(
            collection(db, 'users', user.uid, 'todos'),
            todoData
        );

        const newTodo: Todo = {
            id: docRef.id,
            ...todoData,
            createdAt: new Date()
        };

        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = async (todoId: string, completed: boolean) => {
        if (!user) return;

        const todoRef = doc(db, 'users', user.uid, 'todos', todoId);
        await updateDoc(todoRef, {
            completed,
            updatedAt: Timestamp.now()
        });

        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId ? { ...todo, completed } : todo
            )
        );
    };

    const removeTodo = async (todoId: string) => {
        if (!user) return;

        const todoRef = doc(db, 'users', user.uid, 'todos', todoId);
        await deleteDoc(todoRef);

        setTodos(prev => prev.filter(todo => todo.id !== todoId));

    };

    const exitUser = async () => {
        await signOut(auth); 
        setUser(null); 
    }

    return {
        todos,
        loading,
        addTodo,
        toggleTodo,
        removeTodo,
        user,
        exitUser
    };
};