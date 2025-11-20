import React, { useEffect, useState, useRef } from 'react';
import { Download, Key, MessageCircle, HardDrive, CheckCircle2, ArrowRight, Copy, Shield, Mail, FileCode, Layout, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import StepCard from './components/StepCard';
import { DOWNLOAD_LINK, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from './constants';

const App: React.FC = () => {
  const [isStepsVisible, setIsStepsVisible] = useState(false);
  const [formData, setFormData] = useState({
    toolName: '',
    code: '',
    email: ''
  });

  const stepsRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
      });
    });

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStepsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Número copiado para a área de transferência!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getWhatsAppLink = () => {
    const message = `Olá! Baixei a ferramenta e gostaria de ativar meu teste grátis de 3 dias. \n\n` +
      `Aqui estão meus dados:\n` +
      `Nome da Ferramenta: ${formData.toolName || '[Não informado]'}\n` +
      `Código Gerado: ${formData.code || '[Não informado]'}\n` +
      `Email: ${formData.email || '[Não informado]'}`;
      
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const isFormValid = formData.toolName.trim().length > 0 && formData.code.trim().length > 0 && formData.email.trim().length > 0;

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFormValid) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos (Nome da Ferramenta, Código e Email) para enviar a solicitação.");
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-primary selection:text-white overflow-x-hidden font-sans relative">
      <Navbar />

      {/* Robot Animation */}
      <div className="fixed bottom-4 left-0 z-50 animate-walk will-change-transform text-6xl pointer-events-none select-none" aria-hidden="true">
        🤖
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
          Programa de Acesso Antecipado
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Teste Grátis por <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">3 Dias</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Nossa nova ferramenta para computador está pronta. Baixe, instale e libere seu acesso exclusivo enviando seu código de ativação.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={DOWNLOAD_LINK} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Baixar Agora
          </a>
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            Como Funciona
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Instructions Section */}
      <section 
        id="how-it-works" 
        ref={stepsRef}
        className={`py-24 bg-dark-900 relative ${isStepsVisible ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ativação em 4 Passos Simples</h2>
            <p className="text-slate-400">Siga o guia abaixo para começar a utilizar a ferramenta hoje mesmo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number={1}
              title="Download"
              description="Faça o download dos arquivos de instalação através do nosso link seguro no Google Drive."
              icon={<Download className="w-8 h-8" />}
              action={
                <a href={DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:text-primary-hover hover:underline inline-flex items-center gap-1">
                  Ir para o Drive <ArrowRight className="w-3 h-3" />
                </a>
              }
            />
            <StepCard 
              number={2}
              title="Instalação"
              description="Execute o instalador no seu computador. Siga as instruções na tela para concluir a configuração."
              icon={<HardDrive className="w-8 h-8" />}
            />
            <StepCard 
              number={3}
              title="Gerar Código"
              description="Abra a ferramenta instalada. Na tela inicial, clique em 'Gerar Código' e copie a sequência."
              icon={<Key className="w-8 h-8" />}
            />
            <StepCard 
              number={4}
              title="Ativação"
              description="Preencha seus dados abaixo e envie o código junto com seu email para liberar os 3 dias."
              icon={<MessageCircle className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800 to-dark-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 p-8 md:p-12 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Pronto para ativar?</h2>
              <p className="text-slate-400 max-w-lg mx-auto">
                Preencha os dados abaixo para gerar sua mensagem de ativação automaticamente.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              {/* Form Inputs */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Layout className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="toolName"
                    value={formData.toolName}
                    onChange={handleInputChange}
                    placeholder="Nome da Ferramenta *"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-dark-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-400 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] sm:text-sm transition-all duration-200 ${!formData.toolName ? 'border-dark-700' : 'border-primary/50'}`}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileCode className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Código Gerado *"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-dark-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-400 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] sm:text-sm transition-all duration-200 ${!formData.code ? 'border-dark-700' : 'border-primary/50'}`}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu Endereço de Email *"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-dark-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-400 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] sm:text-sm transition-all duration-200 ${!formData.email ? 'border-dark-700' : 'border-primary/50'}`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-6 mt-8 pt-4">
                <a 
                  href={isFormValid ? getWhatsAppLink() : undefined}
                  onClick={handleWhatsAppClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full px-8 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg
                    ${isFormValid 
                      ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-green-900/20 hover:scale-105 hover:animate-subtle-pulse' 
                      : 'bg-dark-700 text-slate-500 cursor-not-allowed opacity-80'}
                  `}
                >
                  <MessageCircle className={`w-6 h-6 ${!isFormValid && 'opacity-50'}`} />
                  {isFormValid ? 'Enviar Código pelo WhatsApp' : 'Preencha os dados acima'}
                </a>

                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-dark-900/50 rounded-lg border border-dark-700 w-full justify-center">
                  <span className="text-slate-400 text-sm px-2">Suporte Direto:</span>
                  <code className="font-mono text-white bg-dark-800 px-3 py-1 rounded">{WHATSAPP_DISPLAY}</code>
                  <button 
                    onClick={() => copyToClipboard(WHATSAPP_NUMBER)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                    title="Copiar número"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              {!isFormValid ? (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-500/80">Todos os campos marcados com * são obrigatórios</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Pronto para enviar!</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Shield className="w-5 h-5 text-slate-600" />
             <span className="text-slate-500 font-medium">Leadszapp Softwares</span>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Todos os direitos reservados. Agradecemos sua colaboração e feedback.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;