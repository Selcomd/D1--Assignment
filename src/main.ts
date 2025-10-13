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
  description: string;
}

const items: Item[] = [
  {
    name: "Toy Mouse",
    rate: 0.1,
    baseCost: 10,
    cost: 10,
    count: 0,
    description: "A simple toy that entertains your cat for hours.",
  },
  {
    name: "Kitten",
    rate: 2,
    baseCost: 100,
    cost: 100,
    count: 0,
    description:
      "A playful kitten that never gets tired of adding to your pets.",
  },
  {
    name: "Cat Sitter",
    rate: 50,
    baseCost: 1000,
    cost: 1000,
    count: 0,
    description: "Someone to take care of your cats so you don’t have to.",
  },
  {
    name: "Cat Tower",
    rate: 200,
    baseCost: 5000,
    cost: 5000,
    count: 0,
    description:
      "The ultimate playground for cats, increasing their happiness.",
  },
  {
    name: "Cat Cafe",
    rate: 1000,
    baseCost: 20000,
    cost: 20000,
    count: 0,
    description: "A cafe filled with cats, attracting new fans every second.",
  },
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
catIcon.style.transition = "transform 0.1s ease";

clickBtn.append(catIcon);
app.append(clickBtn);

const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.alignItems = "center";
upgradesContainer.style.gap = "20px"; // spacing between upgrades
app.append(upgradesContainer);

const buttons: HTMLButtonElement[] = [];
const descriptions: HTMLDivElement[] = [];

items.forEach((item) => {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "6px"; // space between button and description

  const btn = document.createElement("button");
  buttons.push(btn);
  wrapper.append(btn);

  const desc = document.createElement("div");
  desc.style.fontSize = "0.9rem";
  desc.style.color = "#555";
  descriptions.push(desc);
  wrapper.append(desc);

  upgradesContainer.append(wrapper);

  btn.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.count++;
      item.cost *= PRICE_MULTIPLIER;
      render();
    }
  });
});

clickBtn.addEventListener("click", () => {
  counter++;
  render();

  catIcon.style.transform = "scale(1.2)";
  setTimeout(() => {
    catIcon.style.transform = "scale(1)";
  }, 100);
});

function render() {
  counterEl.textContent = `${Math.floor(counter)} pets`;
  rateEl.textContent = `Growth rate: ${growthRate.toFixed(1)} pets/sec`;
  statusEl.textContent = items.map((i) => `${i.name}: ${i.count}`).join(", ");

  items.forEach((item, i) => {
    buttons[i].textContent = `Buy ${item.name} (+${item.rate}/sec) — Cost: ${
      Math.floor(item.cost)
    } pets`;
    buttons[i].disabled = counter < item.cost;
    descriptions[i].textContent = item.description;
  });
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
