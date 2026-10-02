const KEY = "neolist.items";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
let items = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} };

const list = document.getElementById("list");

function render() {
  list.replaceChildren(...items.map((item, i) => {
    const li = document.createElement("li");
    li.className = item.done ? "done" : "";
    const box = Object.assign(document.createElement("input"), { type: "checkbox", checked: item.done });
    box.onchange = () => { item.done = box.checked; save(); render(); };
    const label = document.createElement("span");
    label.textContent = item.text;
    const del = Object.assign(document.createElement("button"), { textContent: "✕" });
    del.onclick = () => { items.splice(i, 1); save(); render(); };
    li.append(box, label, del);
    return li;
  }));
}

document.getElementById("add").onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById("text");
  items.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
};

render();
