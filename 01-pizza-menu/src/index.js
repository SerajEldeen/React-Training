import React, { StrictMode } from "react";
import ReactDom from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Menu />
        <Footer />
      </div>
    </>
  );
}
function Header() {
  return (
    <>
      <div className="header">
        <h1>Fast React Pizza Co.</h1>
      </div>
    </>
  );
}
function Menu() {
  return (
    <>
      <div className="menu">
        <h2>Our Menu</h2>
        <Pizza pizzaData={pizzaData} />
      </div>
    </>
  );
}
function Pizza({ pizzaData }) {
  return (
    <>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>
      <div className="pizzas">
        {pizzaData.map((e) => (
          <div className={`pizza ${e.soldOut ? "sold-out" : ""}`}>
            <img src={`${e.photoName}`} alt={e.name} />
            <div className="text">
              <h3>{e.name}</h3>
              <p>{e.ingredients}</p>
              <span>{e.soldOut ? "SOLD OUT" : e.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const open = 12;
  const close = 22;
  const isopen = hour >= open && hour <= close;
  return (
    <>
      <div className="footer">
        {isopen ? (
          <p>Welcome to Our pizza Resturant</p>
        ) : (
          <Order open={open} close={close} />
        )}
      </div>
    </>
  );
}
function Order({ open, close }) {
  return (
    <div className="order">
      <p>
        We're happy to welcome you between {open}:00 To {close}:00.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

//Render V18
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
