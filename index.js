const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

// const addItems = document.querySelector(".add-items");
// const itemsList = document.querySelector(".plates");

// 讓 items 讀取 localStorage 的資料，沒有的話給予空陣列
const items = JSON.parse(localStorage.getItem("items")) || [];
// const items = JSON.parse(localStorage.getItem("items")) || [];

/**
 * 事件停止冒泡
 * @param {*} event
 */
function stopPopup(event) {
  if (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
  }
}

// function stopPopup(event){
//   if(event){
//     if(event.stopPropagation){
//       event.stopPropagation();
//     }
//     if(event.preventDefault){
//       event.preventDefault();
//     }
//     event.cancelBubble = true;
//     event.returnValue = false;
//     return false;
//   }
// }

/**
 * 將小吃資料新增到 items 中
 * @param {*} e
 */
function addItem(e) {
  // 事件停止冒泡
  stopPopup(e);
  // 取得輸入值
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  populateItem(
    item,
    items.findIndex((element) => element === item)
  );
  // 重置 form
  this.reset();
}
// function addItem(e) {
//   stopPopup(e);
//   const text = this.querySelector("[name=item]").value;
//   const item = {
//     text,
//     done: false,
//   };
//   items.push(item);
//   localStorage.setItem("items", JSON);
//   populateItem(
//     item,
//     items.findIndex((element)=> element===item)
//   );
//   this.reset();
// }

/**
 * 將 localStorage 的資料項目呈現到 HTML 上
 * @param {*} plates     array data
 * @param {*} platesList html container
 */
function populateList(plates = [], platesList = itemsList) {
  platesList.innerHTML = "";

  plates.forEach((plate, i) => populateItem(plate, i, platesList));

  // 範例的解法
  // platesList.innerHTML = plates.map((plate, i) => {
  //   return `
  //     <li>
  //       <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
  //       <label for="item${i}">${plate.text}</label>
  //     </li>
  //   `;
  // }).join('');
}

// function populateList(plates = [], platesList = itemsList) {
//   platesList.innerHTML = "";
//   const newList = plates.map((plate, i) => {
//     return populateItem(plate, i, platesList);
//   });
//   return newList;
// }

/**
 * 將 localStorage 的資料項目呈現到 HTML 上 (單筆)
 * @param {*} plate 要顯示的項目
 * @param {*} i index(索引)
 */
function populateItem(plate, i, container = itemsList) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  input.setAttribute("type", "checkbox");
  input.setAttribute("data-index", `${i}`);
  input.setAttribute("id", `item${i}`);
  if (plate.done) input.setAttribute("checked", "checked");
  li.appendChild(input);
  label.setAttribute("for", `item${i}`);
  label.appendChild(document.createTextNode(plate.text));
  li.appendChild(label);
  container.appendChild(li);
}

// function populateItem(plate, i , container = itemsList){
//   const li = document.createElement("li");
//   const input = document.createElement("input");
//   const label = document.createElement("label");
//   input.setAttribute("type","checkbox");
//   input.setAttribute("data-index",`${i}`);
//   input.setAttribute("id",`item${i}`);
//   if(plate.done) input.setAttribute("checked","checked");
//   li.appendChild(input);
//   label.setAttribute("for",`item${i}`);
//   label.appendChild(document.createTextNode(plate.text));
//   li.appendChild(label);
//   container.appendChild(li);
// }

/**
 * Check 選擇
 * @param {*} e
 */
function toggleDone(e) {
  // skip this unless it's an input
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
}

// function toggleDone(e){
//   if(!e.target.matches("input"))return;
//   const el = e.target;
//   const index = el.dataset.index;
//   items[index].done = !items[index].done;
//   localStorage.setItem("items", JSON.stringify(items));
// }

addItems.addEventListener("submit", addItem);
// addItems.addEventListener("submit",addItem);
populateList(items);
// populateList(items);
itemsList.addEventListener("click", toggleDone);
// itemsList.addEventListener("click",toggleDone);
