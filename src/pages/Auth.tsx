import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, CreditCard } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [sakshamCard, setSakshamCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/', { replace: true });
      }
    });
  }, [navigate]);

  // Handle email sign in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Attempting sign in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log("Sign in successful:", data);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle email sign up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      console.log("Attempting sign up with:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            email: email,
          }
        },
      });

      if (error) throw error;

      console.log("Sign up response:", data);

      // Check if user already exists
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive",
        });
        setIsSignUp(false);
        return;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        toast({
          title: "Success",
          description: "Please check your email for the confirmation link.",
        });
      } else {
        // If email confirmation is disabled, user will be automatically signed in
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        navigate("/", { replace: true });
      }
      setIsSignUp(false);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle phone sign in
  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Check your phone for the OTP",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Saksham card sign in
  const handleSakshamCardSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('saksham_card_number', sakshamCard)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Invalid Saksham card number');

      // Here we would typically implement a custom authentication flow
      // For now, we'll show a message that this feature is coming soon
      toast({
        title: "Coming Soon",
        description: "Saksham card authentication will be available soon",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Saksham</CardTitle>
          <CardDescription>
            {isSignUp ? "Create a new account" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="saksham">Saksham Card</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={loading}>
                    <Mail className="mr-2 h-4 w-4" />
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={loading}
                  >
                    {isSignUp ? "Back to Sign In" : "Create New Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              <form onSubmit={handlePhoneSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Phone className="mr-2 h-4 w-4" />
                  Send OTP
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="saksham">
              <form onSubmit={handleSakshamCardSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="saksham">Saksham Card Number</Label>
                  <Input
                    id="saksham"
                    type="text"
                    placeholder="Enter 10-digit card number"
                    value={sakshamCard}
                    onChange={(e) => setSakshamCard(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Sign In with Card
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
            disabled={loading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
