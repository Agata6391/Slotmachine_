function importUserList() {
  const userInput = prompt("Please enter your comma-separated list:");
  if (userInput !== null && userInput.trim() !== "") {
    // Trim and split the input by commas into an array
    const userArray = userInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    console.log(userArray); // Display the array in the console (or return it)
    return userArray;
  } else {
    console.log("No input provided");
    return [];
  }
}

(function () {
  const items = importUserList();
  items.sort(() => Math.random() - 0.5);
  const doors = document.querySelectorAll(".door");

  document.querySelector("#spinner").addEventListener("click", spin);
  document.querySelector("#reseter").addEventListener("click", reset);

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = ["?"];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));
        pool.push("?");

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              // if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 1 ? duration : 5}s`; // ajuste de velocidad de giro
      // boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      setTimeout(
        () =>
          (boxesClone.style.transform = `translateY(-${
            door.clientHeight * (pool.length  - 2.2) 
          }px)`),
        0
      );
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);

    // for (const door of doors) {
    //   const boxes = door.querySelector('.boxes');
    //   const duration = parseInt(boxes.style.transitionDuration);
    //   boxes.style.transform = 'translateY(0px)';
    //   await new Promise((resolve) => setTimeout(resolve, duration * 1000));
    // }
  }

  async function reset() {
    for (const door of doors) {
      door.dataset.spinned = "0";
      const boxes = door.querySelector(".boxes");
      boxes.innerHTML = "";
      boxes.style.transform = "none";
    }

    init();
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
