console.log("what should we do");
const modaladd = document.querySelector(".modal__add");
const modalcancel = document.querySelector(".modal__cancel");
const modalinput = document.querySelector(".modal__input");
const headerplus = document.querySelector(".header__plus");
const modal = document.querySelector(".modal");
const modalbox = document.querySelector(".modal__box");

modal.style.display = "none";
const toggleModal = () => {
  if (modal.style.display == "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
};
const toggleLoading = () => {
  if (modalcancel.style.display == "none") {
    modalcancel.style.display = "inline-block";
    modaladd.disabled = false;

    modaladd.style.filter = "blur(0px)";
  } else {
    modalcancel.style.display = "none";
    modaladd.disabled = true;
    modaladd.style.filter = "blur(1px)";
  }
};

// EVENT LISTENERS
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    changeSelection(e.key);
  }
  if (e.key == "Enter") {
    activateone();
  }
});
listitem.addEventListener("click", addAndRemove);
listitem.addEventListener("dblclick", activateone);
headerplus.addEventListener("click", toggleModal);
modalcancel.addEventListener("click", toggleModal);
modalbox.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = modalinput.value;
  console.log("submitting", value);
  //   send to main world
  toggleLoading();
  window.compipe.sendURL(value);
});

window.compipe.receiveItem((e, item) => {
  modalinput.value = "";
  toggleLoading();
  //   add to sorage
  addItem(item, true);
  toggleModal();
});
window.compipe.deleteId((e, id) => {
  deleteItemWithId(id);
});
window.compipe.addNew(toggleModal);
window.compipe.readNew(activateone);
window.compipe.deleteItem(deleteone);
window.compipe.openInBrowser(findoneurl());
