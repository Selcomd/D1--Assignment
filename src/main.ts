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
let growthRate = 0;

const upgrades = {
  A: 0,
  B: 0,
  C: 0,
};

const counterEl = document.createElement("div");
counterEl.style.fontSize = "2rem";
counterEl.style.fontWeight = "bold";
app.append(counterEl);

const rateEl = document.createElement("div");
rateEl.style.fontSize = "1.2rem";
app.append(rateEl);

const statusEl = document.createElement("div");
statusEl.style.fontSize = "1rem";
app.append(statusEl);

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

const upgradeA = document.createElement("button");
upgradeA.textContent = "Upgrade A (+0.1/sec) — Cost: 10 cats";
app.append(upgradeA);

const upgradeB = document.createElement("button");
upgradeB.textContent = "Upgrade B (+2/sec) — Cost: 100 cats";
app.append(upgradeB);

const upgradeC = document.createElement("button");
upgradeC.textContent = "Upgrade C (+50/sec) — Cost: 1000 cats";
app.append(upgradeC);

clickBtn.addEventListener("click", () => {
  counter++;
  render();
});

upgradeA.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    upgrades.A++;
    render();
  }
});

upgradeB.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    upgrades.B++;
    render();
  }
});

upgradeC.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    upgrades.C++;
    render();
  }
});

function render() {
  counterEl.textContent = `${Math.floor(counter)} cats`;
  rateEl.textContent = `Growth rate: ${growthRate.toFixed(1)} cats/sec`;
  statusEl.textContent =
    `Upgrades — A: ${upgrades.A}, B: ${upgrades.B}, C: ${upgrades.C}`;

  upgradeA.disabled = counter < 10;
  upgradeB.disabled = counter < 100;
  upgradeC.disabled = counter < 1000;
}

let lastTime = performance.now();
function update(now: number) {
  const deltaSeconds = (now - lastTime) / 1000;
  lastTime = now;

  counter += growthRate * deltaSeconds;

  render();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
