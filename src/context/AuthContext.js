// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const defaultState = {
//   user: null,
//   token: null,
//   setToken: () => {},
//   logout: () => {},
//   fetchUser: async () => {},
//   loading: false,
//   error: null,
// };

// const AuthContext = createContext(defaultState);

// function AuthProvider({ children }) {
//   const [token, setToken] = useState(defaultState.token);
//   const [user, setUser] = useState(defaultState.user);
//   const [loading, setLoading] = useState(true); // Додано для обробки завантаження
//   const [error, setError] = useState(defaultState.error); // Додано для обробки помилок

//   useEffect(() => {
//     const _token = localStorage.getItem("@library/token");
//     if (_token) {
//       setToken(_token);
//       fetchUser(_token);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   async function fetchUser(token) {
//     setLoading(true); // Додано для обробки завантаження
//     try {
//       const response = await fetch("/api/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//       setError(error); // Додано для обробки помилок
//       logout();
//     } finally {
//       setLoading(false); // Додано для завершення завантаження
//     }
//   }

//   function logout() {
//     localStorage.removeItem("@library/token");
//     setToken(null);
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         loading,
//         error,
//         setToken: (newToken) => {
//           localStorage.setItem("@library/token", newToken);
//           setToken(newToken);
//           fetchUser(newToken); // Оновити користувача при зміні токену
//         },
//         logout,
//         fetchUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   return useContext(AuthContext);
// }

// export { AuthProvider, useAuth };
