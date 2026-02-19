import React from "react";

// Bug: component name doesn't match file
const HelloPage = () => {
  // Bug: missing null check
  const user = undefined;
  const message = user.name + " says hello"; // This will throw an error

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{message}</p>
      {/* Bug: key prop missing in list */}
      <ul>
        {["item1", "item2", "item3"].map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Bug: exporting wrong component name
export default hello;
