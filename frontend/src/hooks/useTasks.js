import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../services/categoryService";
import { tasksService } from "../services/taskService";

const STATUS_ORDER = [
    { label: "Tareas pendientes", key: "pending" },
    { label: "En progreso", key: "in_progress" },
    { label: "Finalizadas", key: "completed" },
];

export function useTasks() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [creatingCategory, setCreatingCategory] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState("pending");

    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [totalTasks, setTotalTasks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTypeId, setNewTaskTypeId] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [creatingTask, setCreatingTask] = useState(false);

    async function fetchTasks(params = {}) {
        try {
            const data = await tasksService.list(params);
            setTasks(data.results);
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
            setTotalTasks(data.count);
            setCurrentPage(params.page || 1);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    useEffect(() => {
        fetchTasks({ status: filterStatus, page: currentPage });
    }, [filterStatus, currentPage]);

    useEffect(() => {
        async function fetchCategories() {
            setLoadingCategories(true);
            try {
                const data = await categoryService.list();
                setCategories(data);
            } catch (error) {
                console.error("Error cargando categorías:", error);
            } finally {
                setLoadingCategories(false);
            }
        }
        fetchCategories();
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategory.trim()) return;
        setCreatingCategory(true);
        try {
            const created = await categoryService.create(newCategory.trim());
            setCategories((prev) => [...prev, created]);
            setNewCategory("");
        } catch (error) {
            console.error("Error creando categoría:", error);
        } finally {
            setCreatingCategory(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const getNextStage = (currentStage) => {
        const currentIndex = STATUS_ORDER.findIndex((s) => s.key === currentStage);
        if (currentIndex === -1 || currentIndex === STATUS_ORDER.length - 1) {
            return null;
        }
        return STATUS_ORDER[currentIndex + 1];
    };

    const handleNextStage = async (task, nextStageKey) => {
        try {
            const updatedTask = await tasksService.edit(task.id, nextStageKey);
            await fetchTasks({ status: filterStatus, page: currentPage });
        } catch (error) {
            console.error("Error updating task stage:", error);
        }
    };

    const goToNextPage = () => {
        if (nextPageUrl) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (prevPageUrl) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
    };

    const setFilterStatusAndResetPage = (status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    };

    const openModal = () => {
        setNewTaskTypeId("");
        setNewTaskDescription("");
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleCreateTask = async () => {
        if (!newTaskTypeId || !newTaskDescription.trim()) return;

        setCreatingTask(true);
        try {
            console.log(newTaskTypeId, newTaskDescription.trim());
            await tasksService.create({
                task_type_id: newTaskTypeId,
                description: newTaskDescription.trim(),
            });
            await fetchTasks({ status: filterStatus, page: 1 });
            setCurrentPage(1);
            closeModal();
        } catch (error) {
            console.error("Error creando tarea:", error);
        } finally {
            setCreatingTask(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            return;
        }

        try {
            await tasksService.delete(taskId);
            await fetchTasks({ status: filterStatus, page: currentPage });
        } catch (error) {
            console.error("Error eliminando la tarea:", error);
        }
    };

    return {
        STATUS_ORDER,
        logout: handleLogout,
        categories,
        newCategory,
        setNewCategory,
        loadingCategories,
        creatingCategory,
        handleCreateCategory,
        tasks,
        setTasks,
        filterStatus,
        setFilterStatus: setFilterStatusAndResetPage,
        getNextStage,
        handleNextStage,
        currentPage,
        nextPageUrl,
        prevPageUrl,
        totalTasks,
        goToNextPage,
        goToPrevPage,
        isModalOpen,
        openModal,
        closeModal,
        newTaskTypeId,
        setNewTaskTypeId,
        newTaskDescription,
        setNewTaskDescription,
        creatingTask,
        handleCreateTask,
        handleDeleteTask,
    };
}
