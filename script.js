let main = document.querySelector("main");
let generate = document.querySelector("#generate");
let sort = document.querySelector("#sort");
sort.disabled = true;
let speed = document.querySelector("#speed");
let speedInMS = 0;
let listLength = 50;

generate.onclick = async () => {
  main.innerHTML = "";
  generate.disabled = true;
  sort.disabled = true;
  for (let i = 0; i < listLength; i++) {
    let randomNumber = Math.floor(Math.random() * (75 - 1) + 1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        let bar = document.createElement("span");
        bar.id = `bar-${i}`;
        bar.innerText = randomNumber;
        bar.style["height"] = `${randomNumber}vh`;
        main.append(bar);
        resolve();
      }, speed);
    });
  }
  generate.disabled = false;
  sort.disabled = false;
};

sort.onclick = async () => {
  sort.disabled = true;
  let bars = [...document.querySelectorAll("span")];
  let list = [...bars].map((bar) => {
    return parseInt(bar.innerText);
  });
  for (let i = 0; i < list.length; i++) {
    bars[i].style["backgroundColor"] = "#ef2d56";
    for (let j = i + 1; j < list.length; j++) {
      bars[j].style["color"] = "black";
      bars[j].style["backgroundColor"] = "yellow";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (list[j] < list[i]) {
            let tmp = list[i];
            list[i] = list[j];
            list[j] = tmp;
            bars[i].innerText = list[i];
            bars[i].style["height"] = `${list[i]}vh`;
            bars[j].innerText = list[j];
            bars[j].style["height"] = `${list[j]}vh`;
          }
          resolve();
        }, speed);
      });
      bars[j].style["color"] = "#fcfcfd";
      bars[j].style["backgroundColor"] = "#1a73e8";
    }
    bars[i].style["backgroundColor"] = "#34A853";
  }
  sort.disabled = false;
};

speed.onchange = (e) => {
  speed = parseInt(e.target.value);
};
