import "./style.css";
import catImg from "./Cat.png";

const app = document.createElement("div");
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.justifyContent = "center";
app.style.alignItems = "center";
app.style.height = "100vh";
app.style.gap = "16px";
document.body.append(app);

let counter = 0;
const counterEl = document.createElement("div");
counterEl.style.fontSize = "2rem";
counterEl.style.fontWeight = "bold";
counterEl.textContent = `${counter} cats`;
app.append(counterEl);

const clickBtn = document.createElement("button");
clickBtn.type = "button";
clickBtn.ariaLabel = "Click the cat!";

const catIcon = document.createElement("img");
catIcon.src = catImg;
catIcon.alt = "Cat";
catIcon.style.width = "150px";
catIcon.style.height = "150px";
catIcon.style.border = "none";

clickBtn.append(catIcon);
app.append(clickBtn);

clickBtn.addEventListener("click", () => {
  counter++;
  counterEl.textContent = `${counter.toFixed(0)} cats`;
});

let lastTime = performance.now();

function update(now: number) {
  const deltaSeconds = (now - lastTime) / 1000; 
  lastTime = now;

  counter += deltaSeconds;

  counterEl.textContent = `${Math.floor(counter)} cats`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);