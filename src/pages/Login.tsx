import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    try {
        // Try real backend first
        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (resp.ok) {
          const data = await resp.json();
          // store token
          if (data.token) localStorage.setItem('authToken', data.token);
          login({ username: data.user.username, role: data.user.role });
          navigate('/admin');
          return;
        }

        // Fallback to simulated auth if backend returns error
        const response = await simulateAuthCheck(username, password);
        if (response.success && response.user) {
          login({ username: response.user.username, role: response.user.role });
          navigate('/admin');
        } else {
          setError('Invalid username or password');
        }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  // Temporary simulation function - replace with real API call
  const simulateAuthCheck = async (username: string, password: string): Promise<{success: boolean, user?: {username: string, role: string}}> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this should be handled by a secure backend
    // This is just for demonstration - credentials should never be in frontend code
    const validCredentials = [
      { username: "admin@rightsense.in", password: "secure_password_2024", role: "admin" },
      { username: "demo@rightsense.in", password: "demo123", role: "user" }
    ];
    
    const user = validCredentials.find(cred => cred.username === username && cred.password === password);
    return user ? { success: true, user: { username: user.username, role: user.role } } : { success: false };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="email" placeholder="cloudcxo@rightsense.in" required value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;