(function () {
  const items = [
    "Carlos Gómez",
    "María Fernández",
    "Juan Rodríguez",
    "Laura Pérez",
    "José López",
    "Ana Sánchez",
    "Luis Ramírez",
    "Carmen García",
    "Diego Torres",
    "Sofia Herrera",
    "Pedro Díaz",
    "Elena Ortiz",
    "Miguel Romero",
    "Teresa González",
    "Javier Moreno",
    "Isabel Ruiz",
    "Andrés Castro",
    "Rosa Márquez",
    "Francisco Vázquez",
    "Marta Jiménez",
    "Daniel Navarro",
    "Victoria Alonso",
    "Alberto Vega",
    "Patricia Cortés",
    "Ricardo Paredes",
    "Lucía Ríos",
    "Eduardo Soto",
    "Natalia Castillo",
    "Alejandro Mendoza",
    "Valentina Espinoza",
    "Fernando Medina",
    "Carolina Vargas",
    "Roberto Delgado",
    "Elena Silva",
    "David Aguilar",
    "Andrea Castro",
    "Jorge Peña",
    "Julia Flores",
    "Manuel Serrano",
    "Claudia Miranda",
    "Raúl Campos",
    "Laura Guzmán",
    "Sergio Herrera",
    "Daniela Fuentes",
    "Antonio Suárez",
    "Cristina Ortiz",
    "Pablo Ramos",
    "Lorena Morales",
    "Enrique Cabrera",
    "Alejandra León",
  ];
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
      const pool = ["❓"];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));
        pool.push("❓");

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
      boxesClone.style.transitionDuration = `${duration > 5 ? duration : 10}s`; // ajuste de velocidad de giro
      // boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      setTimeout(
        () =>
          (boxesClone.style.transform = `translateY(-${
            door.clientHeight * (pool.length - 1 - 1)
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
