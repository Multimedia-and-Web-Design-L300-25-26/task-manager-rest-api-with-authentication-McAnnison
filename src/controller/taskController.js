import Task from "../models/Task.js";

const createTask = async (req, res) => {
    try {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required." });
    }

    const task = await Task.create({    
        title, 
        description, 
        owner: req.user._id
    });

    return res.status(201).json(task);
} catch (error) {
    return res.status(500).json({ message: "Server error." });
}
};

const getTasks = async (req, res) => {
    try {
    const tasks = await Task.find({ owner: req.user._id });
    return res.status(200).json(tasks);
} catch (error) {
    return res.status(500).json({ message: "Server error." });

}

const deleteTask = async (req, res) => {
try {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found." });
    }

    if (task.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized." });
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted." });
} catch (error) {
    return res.status(500).json({ message: "Server error."});
}
}
};

export { createTask, getTasks, deleteTask };