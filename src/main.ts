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
  toy: { count: 0, baseCost: 10, cost: 10, rate: 0.1, label: "Toy Mouse" },
  kitten: { count: 0, baseCost: 100, cost: 100, rate: 2, label: "Kitten" },
  sitter: { count: 0, baseCost: 1000, cost: 1000, rate: 50, label: "Cat Sitter" },
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

const clickBtn = document.createElement("div");
clickBtn.style.cursor = "pointer";
clickBtn.style.display = "inline-block";
clickBtn.style.transition = "transform 0.1s ease";

const catIcon = document.createElement("img");
catIcon.src = catImg;
catIcon.alt = "Cat";
catIcon.style.width = "150px";
catIcon.style.height = "150px";
catIcon.style.userSelect = "none";
catIcon.style.pointerEvents = "none";
clickBtn.append(catIcon);
app.append(clickBtn);

const upgradeToy = document.createElement("button");
app.append(upgradeToy);

const upgradeKitten = document.createElement("button");
app.append(upgradeKitten);

const upgradeSitter = document.createElement("button");
app.append(upgradeSitter);

clickBtn.addEventListener("click", () => {
  counter++;

  clickBtn.style.transform = "scale(1.1)";
  setTimeout(() => {
    clickBtn.style.transform = "scale(1)";
  }, 100);

  render();
});

upgradeToy.addEventListener("click", () => {
  if (counter >= upgrades.toy.cost) {
    counter -= upgrades.toy.cost;
    growthRate += upgrades.toy.rate;
    upgrades.toy.count++;
    upgrades.toy.cost *= PRICE_MULTIPLIER;
    render();
  }
});

upgradeKitten.addEventListener("click", () => {
  if (counter >= upgrades.kitten.cost) {
    counter -= upgrades.kitten.cost;
    growthRate += upgrades.kitten.rate;
    upgrades.kitten.count++;
    upgrades.kitten.cost *= PRICE_MULTIPLIER;
    render();
  }
});

upgradeSitter.addEventListener("click", () => {
  if (counter >= upgrades.sitter.cost) {
    counter -= upgrades.sitter.cost;
    growthRate += upgrades.sitter.rate;
    upgrades.sitter.count++;
    upgrades.sitter.cost *= PRICE_MULTIPLIER;
    render();
  }
});

function render() {
  counterEl.textContent = `${Math.floor(counter)} Pets`;
  rateEl.textContent = `Growth rate: ${growthRate.toFixed(1)} pets/sec`;
  statusEl.textContent =
    `Upgrades — Toy Mice: ${upgrades.toy.count}, Kittens: ${upgrades.kitten.count}, Cat Sitters: ${upgrades.sitter.count}`;

  upgradeToy.textContent = `Buy ${upgrades.toy.label} (+${upgrades.toy.rate}/sec) — Cost: ${Math.floor(upgrades.toy.cost)} pets`;
  upgradeKitten.textContent = `Adopt ${upgrades.kitten.label} (+${upgrades.kitten.rate}/sec) — Cost: ${Math.floor(upgrades.kitten.cost)} pets`;
  upgradeSitter.textContent = `Hire ${upgrades.sitter.label} (+${upgrades.sitter.rate}/sec) — Cost: ${Math.floor(upgrades.sitter.cost)} pets`;

  upgradeToy.disabled = counter < upgrades.toy.cost;
  upgradeKitten.disabled = counter < upgrades.kitten.cost;
  upgradeSitter.disabled = counter < upgrades.sitter.cost;
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
