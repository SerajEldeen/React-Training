export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">Start adding some items to your packing list 🚀 </p>
    );
  const numItem = items.length;
  const numPacked = items.filter((e) => e.packed).length;
  const numPercent = (numPacked / numItem) * 100;
  return (
    <>
      <footer className="stats">
        <em>
          {numPercent === 100
            ? `You got everything! Ready to go ✈️`
            : `✌️ You have ${numItem} items on your list, and you already packed ${numPacked} (${Math.round(
                numPercent || 0
              )}%)`}
        </em>
      </footer>
    </>
  );
}
