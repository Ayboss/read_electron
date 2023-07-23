const listitem = document.querySelector(".list");

const getitemsFromStorage = () => {
  return JSON.parse(localStorage.getItem("items"));
};

const storeitemInStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};
const clearItemInStorage = () => {
  localStorage.removeItem("items");
};

let storage = getitemsFromStorage() || [];
const addAndRemove = (e) => {
  // remove selected
  // add selected to this element
  document.querySelector(".item.selected")?.classList.remove("selected");
  const item = e.target.closest(".item");
  if (item) {
    item.classList.add("selected");
  }
};

const activateone = (e) => {
  const item = document.querySelector(".item.selected");

  let indexId = 0;
  let child = item.previousElementSibling;

  while (child != null) {
    indexId++;
    child = child.previousElementSibling;
  }

  console.log(indexId, "big one");

  if (item) {
    console.log(item.dataset.url);
    window.compipe.createNewWindow({ url: item.dataset.url, id: indexId });
  }
};

const findoneurl = () => {
  const item = document.querySelector(".item.selected");
  console.log(item.dataset);
  return item.dataset.url;
};

const deleteone = () => {
  const item = document.querySelector(".item.selected");

  let indexId = 0;
  let child = item.previousElementSibling;

  while (child != null) {
    indexId++;
    child = child.previousElementSibling;
  }

  console.log(indexId, "big one");
  deleteItemWithId(indexId);
};
const deleteItemWithId = (id) => {
  console.log("I am deleting .", id);
  console.log(storage, "old");
  storage = storage.filter((item, i) => {
    console.log(i, id);
    if (i != id) {
      return true;
    }
    return false;
  });

  storeitemInStorage(storage);
  listitem.innerHTML = "";

  init();
};
const changeSelection = (direction) => {
  const current = document.querySelector(".item.selected");
  if (direction == "ArrowDown") {
    const nextsibling = current.nextElementSibling;
    if (nextsibling) {
      nextsibling.classList.add("selected");
      current.classList.remove("selected");
    }
  } else {
    const prevsibling = current.previousElementSibling;
    if (prevsibling) {
      prevsibling.classList.add("selected");
      current.classList.remove("selected");
    }
  }
};

const addItem = (item, shouldStore) => {
  const itemnode = document.createElement("li");
  itemnode.setAttribute("class", "item");
  itemnode.setAttribute("data-URL", item.URL);
  const imgnode = document.createElement("img");
  imgnode.setAttribute("class", "item__img");
  imgnode.setAttribute("src", item.screenshot);
  const pnode = document.createElement("p");
  pnode.innerText = item.title;
  pnode.setAttribute("class", "item__p");
  itemnode.appendChild(imgnode);
  itemnode.appendChild(pnode);
  listitem.appendChild(itemnode);

  if (shouldStore) {
    console.log("'asdfasdfsadfsaffdafa");
    storage.push(item);
    storeitemInStorage(storage);
  }
};

const storeAndRenderStorage = (type) => {
  storage.forEach((str) => {
    addItem(str, type);
  });
};

const init = () => {
  storeAndRenderStorage(false);
  listitem.children[0]?.classList.add("selected");
};

init();
