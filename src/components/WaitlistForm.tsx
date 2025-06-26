
"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar dados para Google Sheets via Google Apps Script
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzt3Tx9t3AU5Xsk1-ayAYXDVNXJU3qbUwo975JJFmqZs0zejfE2xZLAZOuvu9jHFFJUCA/exec', // Substitua pela URL do seu Google Apps Script
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      console.log('Dados enviados para Google Sheets:', formData);
      
      toast({
        title: "Sucesso!",
        description: "Você foi adicionado à nossa waitlist. Em breve entraremos em contato!",
      });

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        phone: ""
      });

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Waitlist FinanceFlow
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto my-6 text-sm text-center relative z-10">
          Seja um dos primeiros a experimentar nossa revolucionária plataforma de gestão financeira. 
          FinanceFlow vai transformar a maneira como você controla suas finanças pessoais e empresariais.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <Input
            type="text"
            name="name"
            placeholder="Seu nome completo"
            className="w-full"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="email"
            name="email"
            placeholder="seu@email.com"
            className="w-full"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="(11) 99999-9999"
            className="w-full"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Entrar na Waitlist"
            )}
          </Button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export { WaitlistForm };
