import { useEffect, useState, type FormEvent } from "react";
import "./App.css";

type Address = {
  id: number;
  name: string;
  description?: string;
  lat: number;
  lng: number;
};

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [token]);

  async function fetchAddresses() {
    try {
      const res = await fetch("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAddresses(data.items || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load addresses");
    }
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/users/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      const err = await res.json();
      setMessage(err.message || "Login failed");
    }
  }

  async function register(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setMessage("Registered! Please log in.");
    } else {
      const err = await res.json();
      setMessage(err.message || "Registration failed");
    }
  }

  async function addAddress(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ searchWord, name, description }),
      });
      if (res.ok) {
        setSearchWord("");
        setName("");
        setDescription("");
        fetchAddresses();
      } else {
        const err = await res.json();
        setMessage(err.message || "Failed to add address");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to add address");
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setAddresses([]);
  }

  if (!token) {
    return (
      <div className="container">
        <h1>Login / Register</h1>
        <form onSubmit={login} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
          <button type="button" onClick={register} className="secondary">
            Register
          </button>
        </form>
        {message && <p className="message(s)">{message}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your places</h1>
      <button onClick={logout} className="logout">
        Log out
      </button>
      <ul>
        {addresses.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong> ({a.lat.toFixed(4)}, {a.lng.toFixed(4)})
            <br />
            {a.description}
          </li>
        ))}
      </ul>
      <form onSubmit={addAddress} className="form">
        <h2>Add place</h2>
        <input
          type="text"
          placeholder="Search word (address)"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
