import React from "react";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
    const {
        STATUS_ORDER,
        logout,
        categories,
        newCategory,
        setNewCategory,
        loadingCategories,
        creatingCategory,
        handleCreateCategory,
        tasks,
        setTasks,
        filterStatus,
        setFilterStatus,
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
    } = useTasks();

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col px-6 py-8">
                <nav className="flex flex-col space-y-2">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Estados</h2>
                    {STATUS_ORDER.map((item) => (
                        <button
                            key={item.key}
                            className={`text-left text-gray-700 hover:text-blue-600 transition-colors ${filterStatus === item.key ? "text-gray-700" : "opacity-50 text-blue-600"
                                }`}
                            onClick={() => setFilterStatus(filterStatus === item.key ? "" : item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                    <hr className="my-4 border-gray-300" />

                    <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Categorías</h2>

                    {loadingCategories ? (
                        <p className="text-sm text-gray-400">Cargando...</p>
                    ) : (
                        categories.map((cat) => (
                            <button
                                key={cat.id || cat.name}
                                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {cat.name}
                            </button>
                        ))
                    )}

                    <div className="mt-2 flex space-x-2 items-center">
                        <input
                            type="text"
                            placeholder="Nueva categoría"
                            className="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            disabled={creatingCategory}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCreateCategory();
                                }
                            }}
                        />
                        <button
                            onClick={handleCreateCategory}
                            disabled={creatingCategory || !newCategory.trim()}
                            className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <button
                        onClick={logout}
                        className="mt-auto text-left text-red-600 hover:text-red-800 font-semibold"
                    >
                        Cerrar sesión
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Tus Tareas</h1>
                    <div className="flex justify-end items-center space-x-4 mt-4">
                        <button
                            onClick={goToPrevPage}
                            disabled={!prevPageUrl}
                            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        <span className="text-sm text-gray-600">
                            Página {currentPage} — Total: {totalTasks}
                        </span>

                        <button
                            onClick={goToNextPage}
                            disabled={!nextPageUrl}
                            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Nuevo
                    </button>
                </div>
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha creación</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha edición</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        No hay tareas disponibles
                                    </td>
                                </tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span
                                                className="inline-block w-4 h-4 rounded-full mr-2 align-middle"
                                                style={{ backgroundColor: task.color || "#ccc" }}
                                            ></span>
                                            <span>{task.task_type?.name || "N/A"}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(task.updated_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                                            {STATUS_ORDER.find((s) => s.key === task.status)?.label.toLowerCase() || task.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                            {getNextStage(task.status) && (
                                                <button
                                                    className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded hover:bg-blue-700 transition"
                                                    onClick={() => {
                                                        const nextStage = getNextStage(task.status);
                                                        if (nextStage) handleNextStage(task, nextStage.key);
                                                    }}
                                                    title={`Mover a etapa "${getNextStage(task.status).label}"`}
                                                >
                                                    Siguiente etapa
                                                </button>
                                            )}

                                            <button
                                                className="text-white text-xs font-semibold px-3 py-1 rounded hover:bg-red-700 transition"
                                                onClick={() => handleDeleteTask(task.id)}
                                                title="Eliminar tarea"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {
                    isModalOpen && (
                        <div className="fixed inset-0 bg-gray-700 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                            <div className="bg-white rounded shadow p-6 w-96 max-w-full">
                                <h2 className="text-xl font-semibold mb-4">Crear nueva tarea</h2>

                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Tipo de tarea
                                </label>
                                <select
                                    value={newTaskTypeId}
                                    onChange={(e) => setNewTaskTypeId(e.target.value)}
                                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {loadingCategories ? (
                                        <option disabled>Cargando...</option>
                                    ) : (
                                        categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))
                                    )}
                                </select>

                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    rows={3}
                                />

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                                        disabled={creatingTask}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleCreateTask}
                                        disabled={creatingTask || !newTaskTypeId || !newTaskDescription.trim()}
                                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
                                    >
                                        {creatingTask ? "Creando..." : "Crear"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main >
        </div >
    );
}
