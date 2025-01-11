const VITE_TODO_API_URL = import.meta.env.VITE_TODO_API_URL;

if (!VITE_TODO_API_URL || typeof VITE_TODO_API_URL !== "string") {
  throw new Error(
    "Environment variable VITE_TODO_API_URL is missing or not a string"
  );
}

export default { VITE_TODO_API_URL };
