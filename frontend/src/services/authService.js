export async function registerUser(email, password) {
  try {
    console.log("Registering user:", email);
    localStorage.setItem("token", "dummy_token");
    return true;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
}