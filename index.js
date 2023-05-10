const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul")

const todos = JSON.parse(localStorage.getItem("todos"));
const clearBtn = document.getElementById("clear");

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
    });

    function add(todo) {
        let todoText = input.value; "入力した値を変数宣言"

        if (todo) {
            todoText = todo.text;
        }

        if (todoText) { ".length > 0は暗黙的型変換により省略 空文字ならFalseとなる"
        const li = document.createElement("li");
        li.innerText = todoText; "ユーザーが入力した値をliリストに追加"
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
        }
    }

    function saveData() {
        const lists = document.querySelectorAll("li"); "document内のliタグを全て取得(list-group-item)"
        let todos = [];

        lists.forEach(list => {
            let todo = {
                text: list.innerText,
                completed: list.classList.contains("text-decoration-line-through")
            };
            todos.push(todo); "todosにtodoに格納していく todos配列を用いることでのちのち追加機能などを楽に"
        });
        localStorage.setItem("todos", JSON.stringify(todos)); "ローカルストレージでは文字列で保存されるためJSONに"
    }

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    ul.innerHTML = "";
});
