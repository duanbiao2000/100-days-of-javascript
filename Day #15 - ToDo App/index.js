// 获取任务输入框
const taskInput = document.querySelector(".task-input input"),
    // 获取过滤按钮
    filters = document.querySelectorAll(".filters span"),
    // 获取清空按钮
    clearAll = document.querySelector(".clear-btn"),
    // 获取任务列表
    taskBox = document.querySelector(".task-box");

let editId,
    // 是否编辑任务
    isEditTask = false,
    // 获取本地存储的任务列表
    todos = JSON.parse(localStorage.getItem("todo-list"));

// 为过滤按钮添加点击事件
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        // 移除其他按钮的active类
        document.querySelector("span.active").classList.remove("active");
        // 添加active类
        btn.classList.add("active");
        // 显示对应过滤的任务
        showTodo(btn.id);
    });
});

// 显示任务
function showTodo(filter) {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // 判断任务状态
            let completed = todo.status == "completed" ? "checked" : "";
            // 判断任务是否显示
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
        });
    }

    // 设置任务列表内容
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    // 获取任务列表中的任务
    let checkTask = taskBox.querySelectorAll(".task");
    // 判断是否有任务
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    // 判断任务列表是否溢出
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");

}
// 默认显示所有任务
showTodo("all");

//i have added a task before tutorial so that shows here for test
// if you don't have any tasks no problem it isn't bug

// 显示菜单
function showMenu(selectedTask) {
    // 获取菜单
    let menuDiv = selectedTask.parentElement.lastElementChild;
    // 添加show类
    menuDiv.classList.add("show");
    // 点击其他地方隐藏菜单
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

// 更新任务状态
function updateStatus(selectedTask) {
    // 获取任务名称
    let taskName = selectedTask.parentElement.lastElementChild;
    // 判断任务是否完成
    if (selectedTask.checked) {
        // 添加checked类
        taskName.classList.add("checked");
        // 更新任务状态
        todos[selectedTask.id].status = "completed";
    } else {
        // 移除checked类
        taskName.classList.remove("checked");
        // 更新任务状态
        todos[selectedTask.id].status = "pending";
    }
    // 更新本地存储
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

// 编辑任务
function editTask(taskId, textName) {
    // 设置编辑任务id
    editId = taskId;
    // 设置编辑状态
    isEditTask = true;
    // 设置任务输入框内容
    taskInput.value = textName;
    // 聚焦任务输入框
    taskInput.focus();
    // 添加active类
    taskInput.classList.add("active");
}

// 删除任务
function deleteTask(deleteId, filter) {
    // 设置编辑状态
    isEditTask = false;
    // 删除任务
    todos.splice(deleteId, 1);
    // 更新本地存储
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // 显示任务
    showTodo(filter);
}

// 清空任务
clearAll.addEventListener("click", () => {
    // 设置编辑状态
    isEditTask = false;
    // 清空任务
    todos.splice(0, todos.length);
    // 更新本地存储
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // 显示任务
    showTodo();
});

// 监听任务输入框的keyup事件
taskInput.addEventListener("keyup", e => {
    // 获取任务内容
    let userTask = taskInput.value.trim();
    // 判断是否按下回车键且任务内容不为空
    if (e.key == "Enter" && userTask) {
        // 判断是否编辑任务
        if (!isEditTask) {
            // 添加任务
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            // 编辑任务
            isEditTask = false;
            todos[editId].name = userTask;
        }
        // 清空任务输入框
        taskInput.value = "";
        // 更新本地存储
        localStorage.setItem("todo-list", JSON.stringify(todos));
        // 显示任务
        showTodo(document.querySelector("span.active").id);
    }
});