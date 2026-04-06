import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import logo from "@/assets/coloridoacai.jpg";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }).max(255),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }).max(100),
});

const greetings = [
  "Bem-vindo ao Colorido! 🫐",
  "Que alegria te ver aqui! 💜",
  "Vamos colorir o dia! 🌈",
  "Sabor e cor te esperam! ✨",
  "Pronto para fazer magia? 🎨",
  "Seu açaí, sua paixão! 💜",
  "Energia colorida chegando! ⚡",
  "Vamos espalhar alegria! 🫐",
  "Sabor vibrante, dia perfeito! 🌟",
  "Colorido é atitude! 💪"
];

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  const redirectToRolePage = async (session: any) => {
    try {
      // Get user role from metadata
      const { data: { user } } = await supabase.auth.getUser();
      let role = user?.user_metadata?.role || user?.app_metadata?.role;
      
      console.log('🔵 AUTH v3.0 - User role from metadata:', role);
      console.log('🔵 User ID:', user?.id);
      console.log('🔵 User email:', user?.email);
      
      // Always try to get role from database (most reliable)
      if (user?.id) {
        console.log('🔵 Fetching role from profiles table...');
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (!profileError && profileData?.role) {
            role = profileData.role;
            console.log('🔵 Got role from profiles table:', role);
          } else {
            console.log('🔵 Profile query error or no role:', profileError);
            
            // Try RPC function as fallback
            console.log('🔵 Trying RPC function...');
            const { data: rpcRole, error: rpcError } = await (supabase.rpc as any)('get_user_role', {
              user_id: user.id
            });
            
            if (!rpcError && rpcRole) {
              role = rpcRole;
              console.log('🔵 Got role from RPC:', role);
            } else {
              console.log('🔵 RPC error or no role:', rpcError);
            }
          }
        } catch (err) {
          console.log('🔵 Database query failed:', err);
        }
      }
      
      // Redirect based on role
      console.log('🔵 Final role for redirect:', role);
      
      if (role === 'waiter') {
        console.log('✅ Redirecting waiter to dashboard');
        navigate("/waiter-dashboard", { replace: true });
      } else if (role === 'kitchen') {
        console.log('✅ Redirecting to kitchen');
        navigate("/kitchen", { replace: true });
      } else if (role === 'cashier') {
        console.log('✅ Redirecting to cashier');
        navigate("/cashier", { replace: true });
      } else if (role === 'admin') {
        console.log('✅ Redirecting to admin');
        navigate("/admin", { replace: true });
      } else {
        console.log('⚠️  No role found, defaulting to admin. Role was:', role);
        // Default to admin for unknown roles
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.error('🔴 Error in redirectToRolePage:', error);
      // Fallback to admin on error
      navigate("/admin", { replace: true });
    }
  };

  useEffect(() => {
    // Rotate greetings every 5 seconds (increased from 3)
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Simple redirect based on email for now
        const email = session.user.email;
        console.log('🔵 Session found, email:', email);
        
        if (email === 'garcom1@cocoloko.com') {
          console.log('🔵 Waiter email detected, redirecting to dashboard');
          // Force redirect to current domain to avoid custom domain issues
          window.location.href = `${window.location.origin}/waiter-dashboard`;
        } else {
          redirectToRolePage(session);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Simple redirect based on email for now
        const email = session.user.email;
        console.log('🔵 Auth state change, email:', email);
        
        if (email === 'garcom1@cocoloko.com') {
          console.log('🔵 Waiter email detected, redirecting to dashboard');
          // Force redirect to current domain to avoid custom domain issues
          window.location.href = `${window.location.origin}/waiter-dashboard`;
        } else {
          redirectToRolePage(session);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos");
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success("Login realizado com sucesso!");
      const session = (await supabase.auth.getSession()).data.session;
      if (session) {
        // Use email-based redirect for waiter
        if (validation.data.email === 'garcom1@cocoloko.com') {
          console.log('🔵 Waiter login successful, redirecting to dashboard');
          // Force redirect to current domain to avoid custom domain issues
          window.location.href = `${window.location.origin}/waiter-dashboard`;
        } else {
          redirectToRolePage(session);
        }
      }
    } catch (error: any) {
      toast.error("Erro ao processar autenticação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 rounded-full" />
        <div className="blob blob-secondary w-72 h-72 -bottom-36 -right-36 rounded-full" />
        <div className="blob blob-tertiary w-80 h-80 top-1/2 right-1/4 rounded-full" />
      </div>

      <Card className="w-full max-w-md relative z-10 card-sticker animate-pop-in">
        <CardHeader className="text-center space-y-6 pt-8 pb-6">
          <div className="flex justify-center animate-pop-in" style={{ animationDelay: '0.1s' }}>
            <div className="icon-circle bg-primary text-primary-foreground w-20 h-20">
              <img 
                src={logo} 
                alt="Colorido Açaí" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-2 animate-pop-in" style={{ animationDelay: '0.2s' }}>
            <CardTitle className="font-heading text-3xl font-bold text-foreground">
              <span key={greetingIndex} className="inline-block animate-pop-in">
                {greetings[greetingIndex]}
              </span>
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Faça login para continuar
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 py-6 animate-pop-in" style={{ animationDelay: '0.3s' }}>
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-foreground uppercase tracking-wide">
                Email
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                  📧
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="h-14 text-base pl-14 pr-4 border-2 border-foreground focus:border-primary rounded-lg transition-all bg-input focus:shadow-pop"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-foreground uppercase tracking-wide">
                Senha
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                  🔒
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  maxLength={100}
                  className="h-14 text-base pl-14 pr-14 border-2 border-foreground focus:border-primary rounded-lg transition-all bg-input focus:shadow-pop"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="btn-primary w-full h-14 text-lg mt-6" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Entrando...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="text-xl">🚀</span>
                  <span>ENTRAR</span>
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
