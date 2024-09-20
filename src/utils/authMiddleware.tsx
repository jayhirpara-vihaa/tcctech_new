import { useRouter } from "next/router";
import React, { useState } from "react";

const ProtectedPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();

    // Replace 'YOUR_PASSWORD' with your desired password
    if (password === "YOUR_PASSWORD") {
      // Password is correct, perform any necessary actions or rendering for the protected page
      console.log("Access granted to protected page");
    } else {
      // Password is incorrect, redirect or display an error message
      console.log("Invalid password");
      router.push("/login"); // Redirect to login page or display an error message
    }
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProtectedPage;
