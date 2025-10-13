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

const PRICE_MULTIPLIER = 1.15;

const upgrades = {
  A: { count: 0, baseCost: 10, cost: 10, rate: 0.1 },
  B: { count: 0, baseCost: 100, cost: 100, rate: 2 },
  C: { count: 0, baseCost: 1000, cost: 1000, rate: 50 },
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
app.append(upgradeA);

const upgradeB = document.createElement("button");
app.append(upgradeB);

const upgradeC = document.createElement("button");
app.append(upgradeC);

clickBtn.addEventListener("click", () => {
  counter++;
  render();
});

upgradeA.addEventListener("click", () => {
  if (counter >= upgrades.A.cost) {
    counter -= upgrades.A.cost;
    growthRate += upgrades.A.rate;
    upgrades.A.count++;
    upgrades.A.cost *= PRICE_MULTIPLIER;
    render();
  }
});

upgradeB.addEventListener("click", () => {
  if (counter >= upgrades.B.cost) {
    counter -= upgrades.B.cost;
    growthRate += upgrades.B.rate;
    upgrades.B.count++;
    upgrades.B.cost *= PRICE_MULTIPLIER;
    render();
  }
});

upgradeC.addEventListener("click", () => {
  if (counter >= upgrades.C.cost) {
    counter -= upgrades.C.cost;
    growthRate += upgrades.C.rate;
    upgrades.C.count++;
    upgrades.C.cost *= PRICE_MULTIPLIER;
    render();
  }
});

function render() {
  counterEl.textContent = `${Math.floor(counter)} cats`;
  rateEl.textContent = `Growth rate: ${growthRate.toFixed(1)} cats/sec`;
  statusEl.textContent =
    `Upgrades — A: ${upgrades.A.count}, B: ${upgrades.B.count}, C: ${upgrades.C.count}`;

  upgradeA.textContent = `Upgrade A (+0.1/sec) — Cost: ${Math.floor(upgrades.A.cost)} cats`;
  upgradeB.textContent = `Upgrade B (+2/sec) — Cost: ${Math.floor(upgrades.B.cost)} cats`;
  upgradeC.textContent = `Upgrade C (+50/sec) — Cost: ${Math.floor(upgrades.C.cost)} cats`;

  upgradeA.disabled = counter < upgrades.A.cost;
  upgradeB.disabled = counter < upgrades.B.cost;
  upgradeC.disabled = counter < upgrades.C.cost;
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
