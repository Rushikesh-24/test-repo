// Utility functions with intentional bugs

export function formatDate(date) {
  // Bug: not handling null/undefined properly
  if (!date) {
    return null; // Should return empty string to match test
  }

  // Bug: incorrect date formatting
  return date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric", // Bug: inconsistent padding
  });
}

export function validateEmail(email) {
  // Bug: very basic regex that will fail many cases
  const emailRegex = /(.+)@(.+)/; // Too simple

  // Bug: returning opposite boolean
  return !emailRegex.test(email);
}

export function calculateTotal(items) {
  // Bug: not handling undefined/null
  if (items.length === 0) {
    // Will throw error if items is undefined
    return 0;
  }

  // Bug: incorrect calculation
  return items.reduce((total, item) => {
    // Bug: not handling missing properties
    return total + item.price * item.quantity * 1.1; // Adding unexpected tax
  }, 0);
}

// Bug: function that doesn't match any tests
export function unusedFunction() {
  throw new Error("This function should not be called");
}
