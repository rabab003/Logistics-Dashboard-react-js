
// Mock authentication service

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock user data
const mockUsers = [
  {
    id: "1",
    email: "test@soberall.co",
    password: "password123",
    name: "Test User"
  }
];

// Initial authentication state
let authState: AuthState = {
  user: null,
  isAuthenticated: false
};

// Check if there's a saved user in localStorage
const initAuth = () => {
  const savedUser = localStorage.getItem("logistics-user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      authState = {
        user,
        isAuthenticated: true
      };
    } catch (error) {
      console.error("Error parsing saved user:", error);
      localStorage.removeItem("logistics-user");
    }
  }
};

// Initialize authentication on import
initAuth();

// Function to get current authentication state
export const getAuthState = (): AuthState => {
  return { ...authState };
};

// Login function
export const login = (
  email: string,
  password: string,
  remember: boolean = false
): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        authState = {
          user: userWithoutPassword,
          isAuthenticated: true
        };

        // If remember is checked, save user to localStorage
        if (remember) {
          localStorage.setItem(
            "logistics-user",
            JSON.stringify(userWithoutPassword)
          );
        }

        resolve(userWithoutPassword);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
};

// Logout function
export const logout = (): void => {
  authState = {
    user: null,
    isAuthenticated: false
  };
  localStorage.removeItem("logistics-user");
};

// Google login simulation (mock)
export const loginWithGoogle = (): Promise<User> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const googleUser = {
        id: "g-1",
        email: "google-user@example.com",
        name: "Google User"
      };

      authState = {
        user: googleUser,
        isAuthenticated: true
      };

      localStorage.setItem("logistics-user", JSON.stringify(googleUser));
      resolve(googleUser);
    }, 1000);
  });
};
