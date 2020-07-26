import { Formula } from "../lib/index";
import "./styles/index.css";

function createApp() {
  const element = document.createElement("main");
  element.innerHTML = require("./index.html");
  return element;
}

document.body.appendChild(createApp());
const a = new Formula({
  fields: [{ name: "firstName", validations: ["required"] }]
});

// Formula should return an object with funcions

// submit()
// validate()
