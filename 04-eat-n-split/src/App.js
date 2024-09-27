import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function Button({ children, onClick }) {
    return (
      <>
        <button onClick={onClick} className="button">
          {children}
        </button>
      </>
    );
  }
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
    setSelectedFriend(false);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }
  function handleSelection(friend) {
    setSelectedFriend((currSelected) =>
      currSelected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(false);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onSelection={handleSelection}
            selectedFriend={selectedFriend}
          />
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <div key={friend.id} className={isSelected ? "selected" : ""}>
        <li>
          <img src={friend.image} alt={friend.name} />
          <h3>{friend.name}</h3>

          <p
            style={{
              color:
                friend.balance < 0
                  ? "red"
                  : friend.balance === 0
                  ? "gray"
                  : "green",
            }}
          >
            {friend.balance < 0
              ? `You owe ${friend.name} ${Math.abs(friend.balance)}`
              : friend.balance === 0
              ? `You and ${friend.name} are even`
              : `${friend.name} owes you ${friend.balance}`}
          </p>
          <button onClick={() => onSelection(friend)} className="button">
            {isSelected ? "Close" : "Select"}
          </button>
        </li>
      </div>
    </>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setname] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setname("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👫 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label>🌄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
    </>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState();
  const [myExpense, setMyExpense] = useState();
  const [whoIsPaying, setWhoIsPaying] = useState("User");
  const friendExpenses = billValue - myExpense;
  function handleSubmit(e) {
    e.preventDefault();
    if (!billValue || !myExpense) return;
    onSplitBill(whoIsPaying === "user" ? friendExpenses : -myExpense);
  }
  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label>💰 Bill Value</label>
        <input
          type="text"
          value={billValue}
          onChange={(e) => setBillValue(Number(e.target.value))}
        />

        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={myExpense}
          onChange={(e) =>
            setMyExpense(
              Number(e.target.value) > billValue
                ? myExpense
                : Number(e.target.value)
            )
          }
        />
        <label>👫{selectedFriend.name}'s expense</label>
        <input type="text" disabled="true" value={friendExpenses} />

        <label>🤑 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <button className="button">Split bill</button>
      </form>
    </>
  );
}
