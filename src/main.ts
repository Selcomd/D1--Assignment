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

interface Item {
  name: string;
  rate: number;
  baseCost: number;
  cost: number;
  count: number;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  { name: "Toy Mouse", rate: 0.1, baseCost: 10, cost: 10, count: 0 },
  { name: "Kitten", rate: 2, baseCost: 100, cost: 100, count: 0 },
  { name: "Cat Sitter", rate: 50, baseCost: 1000, cost: 1000, count: 0 },
];

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
clickBtn.style.border = "none";
clickBtn.style.background = "none";
clickBtn.style.padding = "0";
clickBtn.style.cursor = "pointer";

const catIcon = document.createElement("img");
catIcon.src = catImg;
catIcon.alt = "Cat";
catIcon.style.width = "150px";
catIcon.style.height = "150px";
catIcon.style.display = "block";
clickBtn.append(catIcon);
app.append(clickBtn);


clickBtn.addEventListener("click", () => {
  counter++;
  clickBtn.style.transform = "scale(1.2)";
  setTimeout(() => {
    clickBtn.style.transform = "scale(1)";
  }, 100);
  render();
});

for (const item of availableItems) {
  const btn = document.createElement("button");
  item.button = btn;
  btn.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.count++;
      item.cost *= PRICE_MULTIPLIER;
      render();
    }
  });
  app.append(btn);
}

function render() {
  counterEl.textContent = `${Math.floor(counter)} pets`;
  rateEl.textContent = `Growth rate: ${growthRate.toFixed(1)} pets/sec`;
  statusEl.textContent = availableItems
    .map((i) => `${i.name}: ${i.count}`)
    .join(", ");
  for (const item of availableItems) {
    if (item.button) {
      item.button.textContent = `Buy ${item.name} (+${item.rate}/sec) — Cost: ${Math.floor(item.cost)} pets`;
      item.button.disabled = counter < item.cost;
    }
  }
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