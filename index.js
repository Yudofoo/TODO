const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul")
const clear = document.getElementById("clear")

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) { "文字列todosが空じゃない"
    todos.forEach(todo => { "個々の要素はtodo"
        add(todo); "引数を受け取る場所を作る必要！"
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
    });

    function add(todo) { "引数を受け取る"
        let todoText = input.value; "入力した値を変数宣言"

        if (todo) { "todoを取ってきたとき"
            todoText = todo.text;
        }

        if (todoText) { ".length > 0は暗黙的型変換により省略 空文字ならFalseとなる"
        const li = document.createElement("li");
        li.innerText = todoText; "ユーザーが入力した値をliリストに追加"
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        } "リロードした際にも線を残す"

        li.addEventListener("contextmenu", function (event) { "contextmenuで右クリック処理"
            event.preventDefault(); "右クリックのデフォルト処理を無効化"
            li.remove();
            saveData();
        });

        li.addEventListener("dblclick", function(){
            const editText = prompt("TODOを編集:", li.innerText);
            if (editText) {
                li.innerText = editText;
                saveData();
            }
        })

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through"); "toggleは()内がなければつけるしあれば消す ON/OFF"
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData(); "なぜこの関数でローカルストレージから消せるのか？"
        }
    }

    clear.addEventListener("click", function() {
        const li = document.createElement("li");
        localStorage.clear();
    })

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