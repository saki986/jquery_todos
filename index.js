const taskForm = document.querySelector(".taskForm");
const todoList = document.querySelector(".todoList");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const all = document.querySelector(".all");
const leftItem = document.querySelector(".leftItem");
const clearCompleted = document.querySelector(".clearCompleted");
const inputMark = document.querySelector(".inputMark");
let count = 0;
let all_count = 0;
let checked_count = 0;

const createListItem = (task) => {
	const html = `
	<li class="list__item">
	  	<span class="checked">○</span>
			<span class="kigou">${task}</span>
			<span class="delete">×</span>
	</li>
	`;
	return html;
};

const allItemCount = () => {
	all_count = todoList.children.length + 1;
};

const checkedItemCount = () => {
	let itemCount = 1;
	for (let i = 0; i < todoList.children.length; i++) {
		if (todoList.children[i].children[1].classList.contains("option")) {
			itemCount++;
			console.log(checked_count);
		}
	}
	checked_count = itemCount;
};

const leftItemCount = () => {
	leftItem.innerHTML = all_count - checked_count;
};

const addListElement = (html) => {
	todoList.innerHTML += html;
	allItemCount();
	checkedItemCount();
	leftItemCount();
};

const removeListElement = (html) => {
	html.remove();
	allItemCount();
	checkedItemCount();
	leftItemCount();
};

const toggleClass = (html, className) => {
	html.classList.toggle(className);
};

const activateTaskList = (html) => {
	html.classList.add("is-active");
	html.classList.remove("is-none");
};

const inactivateTaskList = (html) => {
	html.classList.add("is-none");
	html.classList.remove("is-active");
};

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const task = taskForm.inputTaskField.value.trim();
	if (task.length) {
		addListElement(createListItem(task));
		taskForm.reset();
	}
});

todoList.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		removeListElement(e.target.parentElement);
	}
	if (e.target.classList.contains("checked")) {
		toggleClass(e.target.nextElementSibling, "option");
		toggleClass(e.target, "option1");
		allItemCount();
		checkedItemCount();
		leftItemCount();
	}
});

active.addEventListener("click", (e) => {
	for (let i = 0; i < todoList.children.length; i++) {
		if (todoList.children[i].children[1].classList.contains("option")) {
			inactivateTaskList(todoList.children[i]);
		} else {
			activateTaskList(todoList.children[i]);
		}
	}
});

completed.addEventListener("click", (e) => {
	for (let i = 0; i < todoList.children.length; i++) {
		if (todoList.children[i].children[1].classList.contains("option")) {
			activateTaskList(todoList.children[i]);
		} else {
			inactivateTaskList(todoList.children[i]);
		}
	}

	// itemLeftCount();
});

all.addEventListener("click", (e) => {
	for (let i = 0; i < todoList.children.length; i++) {
		if (todoList.children[i].children[1].classList.contains("option")) {
			activateTaskList(todoList.children[i]);
		} else {
			activateTaskList(todoList.children[i]);
		}
	}

	// itemLeftCount();
});

clearCompleted.addEventListener("click", (e) => {
	for (let i = 0; i < todoList.children.length; i++) {
		if (todoList.children[i].children[1].classList.contains("option")) {
			removeListElement(todoList.children[i]);
		}
	}
});

let inputMarkSwitch = true;
inputMark.addEventListener("click", (e) => {
	if (inputMarkSwitch === true) {
		for (let i = 0; i < todoList.children.length; i++) {
			todoList.children[i].children[1].classList.add("option");
			todoList.children[i].children[0].classList.add("option1");
		}
		inputMarkSwitch = false;
	} else {
		for (let i = 0; i < todoList.children.length; i++) {
			todoList.children[i].children[1].classList.remove("option");
			todoList.children[i].children[0].classList.removex("option1");
		}
		inputMarkSwitch = true;
	}
});
