import "./style.css";
import catImg from "./Cat.png";

const clickBtn = document.createElement("button");
clickBtn.type = "button";
clickBtn.style.fontSize = "2rem";
clickBtn.style.padding = "12px 16px";
clickBtn.style.cursor = "pointer";
clickBtn.ariaLabel = "Click the cat!";

const catIcon = document.createElement("img");
catIcon.src = catImg;
catIcon.alt = "Cat";
catIcon.className = "icon";

clickBtn.append(catIcon);
document.body.append(clickBtn);
