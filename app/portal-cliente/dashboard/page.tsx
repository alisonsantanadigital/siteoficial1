'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Eye, 
  Database, 
  Cloud, 
  LogOut, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  X,
  FileText,
  Building2,
  TrendingUp,
  FileBadge,
  HardDrive,
  RefreshCw,
  Unlink,
  ExternalLink,
  ChevronRight,
  MailQuestion
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GoogleGenAI, Type } from "@google/genai";
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

// Inicialização da IA Gemini
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

interface Client {
  id: string;
  name: string;
  document: string;
  company: string;
  taxRegime: string;
  revenue: string;
  notes: string;
  createdAt: string;
}

interface ConnectedDrive {
  id: string;
  provider: 'google' | 'dropbox' | 'onedrive';
  email: string;
  connectedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
}

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rawData, setRawData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'clients' | 'leads' | 'drives' | 'settings'>('clients');
  const [connectedDrives, setConnectedDrives] = useState<ConnectedDrive[]>([]);
  const [isConnectingDrive, setIsConnectingDrive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Carregar drives conectados se houver
    const savedDrives = localStorage.getItem('portal_drives');
    if (savedDrives) {
      setConnectedDrives(JSON.parse(savedDrives)); // eslint-disable-line react-hooks/set-state-in-effect
    }

    // Carregar clientes mockados se houver
    const saved = localStorage.getItem('portal_clients');
    if (saved) {
      setClients(JSON.parse(saved)); // eslint-disable-line react-hooks/set-state-in-effect
    } else {
      // Clientes iniciais de exemplo
      const initial = [
        {
          id: '1',
          name: 'João Silva',
          document: '123.456.789-00',
          company: 'Silva Tech Ltda',
          taxRegime: 'Simples Nacional',
          revenue: 'R$ 45.000,00',
          notes: 'Cliente desde 2022. Foco em consultoria de software.',
          createdAt: new Date().toISOString()
        }
      ];
      setClients(initial); // eslint-disable-line react-hooks/set-state-in-effect
      localStorage.setItem('portal_clients', JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    // Escutar por novos leads no Firestore em tempo real
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData: Lead[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leads');
    });

    return () => unsubscribe();
  }, []);

  const saveToLocal = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem('portal_clients', JSON.stringify(newClients));
  };

  const handleAIProcess = async () => {
    if (!rawData.trim()) return;
    setIsProcessing(true);

    try {
      const prompt = `Analise o seguinte texto bruto e extraia informações para cadastrar um novo cliente contábil.
      Retorne APENAS um objeto JSON com as seguintes chaves: name, document, company, taxRegime (ex: Simples Nacional, Lucro Presumido, Lucro Real), revenue, notes.
      
      Texto bruto:
      ${rawData}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              document: { type: Type.STRING },
              company: { type: Type.STRING },
              taxRegime: { type: Type.STRING },
              revenue: { type: Type.STRING },
              notes: { type: Type.STRING },
            },
            required: ["name", "document", "company"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      
      const newClient: Client = {
        id: Date.now().toString(),
        name: result.name || 'Não identificado',
        document: result.document || 'Não identificado',
        company: result.company || 'Não identificado',
        taxRegime: result.taxRegime || 'Indefinido',
        revenue: result.revenue || 'R$ 0,00',
        notes: result.notes || '',
        createdAt: new Date().toISOString()
      };

      saveToLocal([newClient, ...clients]);
      setRawData('');
    } catch (error) {
      console.error("Erro no processamento IA:", error);
      alert("Erro ao processar dados com IA. Tente estruturar melhor o texto.");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteClient = (id: string) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      saveToLocal(clients.filter(c => c.id !== id));
    }
  };

  const deleteLead = async (id: string) => {
    if (confirm('Deseja excluir esta mensagem?')) {
      try {
        await deleteDoc(doc(db, 'leads', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
      }
    }
  };

  const logout = () => {
    router.push('/portal-cliente');
  };

  const handleDriveConnect = (provider: 'google' | 'dropbox' | 'onedrive' = 'google') => {
    setIsConnectingDrive(true);
    
    // Simulação de OAuth (3 segundos de processamento)
    setTimeout(() => {
      const providerNames = {
        google: 'Google Drive',
        dropbox: 'Dropbox',
        onedrive: 'OneDrive'
      };
      
      const newDrive: ConnectedDrive = {
        id: Math.random().toString(36).substr(2, 9),
        provider,
        email: `contato@officia-${provider}.com.br`,
        connectedAt: new Date().toISOString()
      };

      const updatedDrives = [...connectedDrives, newDrive];
      setConnectedDrives(updatedDrives);
      localStorage.setItem('portal_drives', JSON.stringify(updatedDrives));
      setIsConnectingDrive(false);
      
      alert(`Conectado com sucesso ao ${providerNames[provider]}!`);
    }, 1500);
  };

  const disconnectDrive = (id: string) => {
    const updatedDrives = connectedDrives.filter(d => d.id !== id);
    setConnectedDrives(updatedDrives);
    localStorage.setItem('portal_drives', JSON.stringify(updatedDrives));
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.document.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-8 border-b border-slate-800">
          <img 
            src="/logo-oficial.png?v=2" 
            alt="Logo" 
            className="h-10 w-auto object-contain mix-blend-screen filter brightness-0 invert"
          />
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-6">
          <button 
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeTab === 'clients' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Gestão de Clientes
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeTab === 'leads' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <MailQuestion className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Novos Leads
            {leads.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-secondary-glow text-[10px] flex items-center justify-center ml-auto font-bold animate-pulse">
                {leads.length}
              </div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('drives')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeTab === 'drives' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Cloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Integrações com Drives
            {connectedDrives.length > 0 && <div className="w-5 h-5 rounded-full bg-white/20 text-[10px] flex items-center justify-center ml-auto font-bold">{connectedDrives.length}</div>}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeTab === 'settings' ? 'bg-secondary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Database className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Configurações
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 w-full text-red-400 hover:text-red-300 hover:bg-red-400/5 px-4 py-3 rounded-xl text-sm font-medium transition-all group">
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Sair do Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-20 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Dashboard de Gestão</h1>
            <p className="text-slate-500 text-sm font-light">Bem-vindo, Higor Rocha.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all outline-none"
              />
            </div>
            {activeTab !== 'drives' && (
              <button 
                onClick={() => setActiveTab('drives')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${connectedDrives.length > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-900 text-white hover:bg-secondary'}`}
              >
                {connectedDrives.length > 0 ? <CheckCircle2 className="w-4 h-4" /> : <Cloud className="w-4 h-4" />}
                {connectedDrives.length > 0 ? `${connectedDrives.length} Drives Conectados` : 'Conectar Drive'}
              </button>
            )}
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'clients' ? (
            <div className="space-y-8">
              {/* AI Input Section */}
              <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <Sparkles className="w-12 h-12 text-secondary/10" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">Entrada Inteligente de Dados</h2>
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-6 max-w-2xl">
                    Cole aqui dados brutos de outros sistemas (relatórios, emails, planilhas). 
                    Nossa IA irá estruturar automaticamente os campos do cliente para registro rápido.
                  </p>

                  <div className="flex flex-col gap-4">
                    <textarea 
                      rows={4}
                      value={rawData}
                      onChange={(e) => setRawData(e.target.value)}
                      placeholder="Ex: João da Silva, CPF 12345678900, empresa XPTO Consultoria, fatura R$ 15k/mês, regime Simples..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all outline-none resize-none"
                    />
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={handleAIProcess}
                        disabled={isProcessing || !rawData.trim()}
                        className="flex items-center gap-2 bg-secondary hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-secondary/20 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Processar com IA
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Client Table Section */}
              <section className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-slate-400" />
                    <h2 className="text-lg font-bold tracking-tight">Carteira de Clientes</h2>
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">{filteredClients.length}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="px-8 py-4">Cliente / Empresa</th>
                        <th className="px-6 py-4">Documento</th>
                        <th className="px-6 py-4">Regime</th>
                        <th className="px-6 py-4">Faturamento</th>
                        <th className="px-8 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-xs">
                                {client.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">{client.name}</p>
                                <p className="text-xs text-slate-500">{client.company}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="font-mono text-xs text-slate-600">{client.document}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-700">{client.taxRegime}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-medium text-emerald-600">{client.revenue}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setSelectedClient(client); setIsModalOpen(true); }} className="p-2 hover:bg-white hover:text-secondary rounded-lg text-slate-400 transition-all" title="Ver Detalhes">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white hover:text-blue-500 rounded-lg text-slate-400 transition-all" title="Editar">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteClient(client.id)} className="p-2 hover:bg-white hover:text-red-500 rounded-lg text-slate-400 transition-all" title="Excluir">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredClients.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                <Users className="w-8 h-8" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-slate-400">Nenhum cliente encontrado</p>
                                <p className="text-sm text-slate-300">Tente buscar por outro termo ou cadastre um novo usando a IA acima.</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : activeTab === 'leads' ? (
            <div className="space-y-8">
              <section className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MailQuestion className="w-5 h-5 text-slate-400" />
                    <h2 className="text-lg font-bold tracking-tight">Leads do Site</h2>
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">{leads.length}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="px-8 py-4">Lead / Data</th>
                        <th className="px-6 py-4">Empresa</th>
                        <th className="px-6 py-4">E-mail</th>
                        <th className="px-6 py-4">Mensagem</th>
                        <th className="px-8 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-5">
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                                {new Date(lead.createdAt).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs text-slate-600">{lead.company || '—'}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs text-slate-600">{lead.email}</span>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-xs text-slate-500 max-w-xs truncate" title={lead.message}>
                              {lead.message}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => alert(lead.message)}
                                className="p-2 hover:bg-white hover:text-secondary rounded-lg text-slate-400 transition-all" 
                                title="Ver Completa"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a 
                                href={`mailto:${lead.email}`}
                                className="p-2 hover:bg-white hover:text-primary rounded-lg text-slate-400 transition-all" 
                                title="Responder"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </a>
                              <button 
                                onClick={() => deleteLead(lead.id)}
                                className="p-2 hover:bg-white hover:text-red-500 rounded-lg text-slate-400 transition-all" 
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                <MailQuestion className="w-8 h-8" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-slate-400">Nenhum lead no momento</p>
                                <p className="text-sm text-slate-300">As mensagens do site aparecerão aqui assim que forem enviadas.</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : activeTab === 'drives' ? (
            <div className="space-y-8 max-w-4xl">
               <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Canais de Integração</h2>
                      <p className="text-slate-500 text-sm">Gerencie suas contas de armazenamento em nuvem com segurança.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { id: 'google', name: 'Google Drive', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { id: 'dropbox', name: 'Dropbox', icon: HardDrive, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { id: 'onedrive', name: 'OneDrive', icon: Cloud, color: 'text-blue-700', bg: 'bg-blue-50' }
                  ].map((provider) => (
                    <button 
                      key={provider.id}
                      onClick={() => handleDriveConnect(provider.id as any)}
                      disabled={isConnectingDrive}
                      className="group p-6 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 border border-slate-100 rounded-[24px] transition-all text-left relative overflow-hidden"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${provider.bg} ${provider.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <provider.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{provider.name}</h3>
                      <p className="text-xs text-slate-500 mb-4">Sincronização bidirecional de documentos fiscais.</p>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-secondary uppercase tracking-widest">
                        {isConnectingDrive ? 'Conectando...' : 'Conectar agora'}
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-4">Contas Conectadas</h3>
                  {connectedDrives.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {connectedDrives.map((drive) => (
                        <div key={drive.id} className="py-5 flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center relative">
                              <Cloud className="w-6 h-6 text-slate-400" />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{drive.email}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase">Conectado</span>
                                <span className="text-[10px] text-slate-400 tracking-wide lowercase italic">desde {new Date(drive.connectedAt).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all">
                              <RefreshCw className="w-3.5 h-3.5" />
                              Sincronizar
                            </button>
                            <button 
                              onClick={() => disconnectDrive(drive.id)}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Desconectar"
                            >
                              <Unlink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4 text-slate-200">
                        <Cloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-slate-400">Nenhum drive conectado no momento.</p>
                      <p className="text-xs text-slate-300">Conecte sua primeira conta acima para começar.</p>
                    </div>
                  )}
                </div>
               </section>

               <section className="bg-slate-900 text-white rounded-[32px] p-8 relative overflow-hidden shadow-xl shadow-slate-900/20">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Cloud className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">Privacidade e Segurança Garantidas</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-xl">
                      A OFFICIA utiliza protocolos de autenticação OAuth 2.0. Isso significa que nunca temos acesso à sua senha. 
                      A conexão é feita diretamente com o provedor e você pode revogar o acesso a qualquer momento.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                        <FileBadge className="w-4 h-4" />
                        Certificado SSL 256-bit
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" />
                        Acesso Restrito
                      </div>
                    </div>
                  </div>
               </section>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-[32px] p-12 text-center max-w-4xl">
               <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <h2 className="text-xl font-bold mb-2">Página de Configurações</h2>
               <p className="text-slate-500">Em desenvolvimento. Em breve você poderá gerenciar seu perfil e preferências do sistema.</p>
            </div>
          )}
        </div>
      </main>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/20">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900">{selectedClient.name}</h3>
                      <p className="text-slate-500">{selectedClient.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                       <FileBadge className="w-3 h-3" />
                       Documento
                    </div>
                    <p className="text-slate-900 font-mono">{selectedClient.document}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                       <Building2 className="w-3 h-3" />
                       Regime Tributário
                    </div>
                    <p className="text-slate-900">{selectedClient.taxRegime}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                       <TrendingUp className="w-3 h-3" />
                       Faturamento / Mês
                    </div>
                    <p className="text-emerald-600 font-bold">{selectedClient.revenue}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                       <FileText className="w-3 h-3" />
                       Data de Registro
                    </div>
                    <p className="text-slate-900">{new Date(selectedClient.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-10">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                     <Cloud className="w-3 h-3" />
                     Documentos em Nuvem
                  </div>
                  <div className="space-y-2">
                    {connectedDrives.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 gap-2 mb-4">
                           {connectedDrives.map(drive => (
                              <div key={drive.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                <div className="flex items-center gap-2">
                                  <Cloud className="w-4 h-4 text-secondary" />
                                  <span className="text-slate-700">{drive.email} </span>
                                  <span className="text-[10px] text-slate-400 capitalize">({drive.provider})</span>
                                </div>
                                <button className="text-secondary hover:underline transition-colors font-bold uppercase text-[9px] tracking-widest">Acessar</button>
                              </div>
                           ))}
                        </div>
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-2">
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" />
                            Arquivos Recentes
                          </p>
                          <div className="space-y-2">
                             <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-slate-600">
                                   <FileText className="w-3.5 h-3.5 text-blue-500" />
                                   Contrato_Social.pdf
                                </div>
                                <X className="w-3.5 h-3.5 text-slate-300 cursor-pointer hover:text-red-500 transition-colors" />
                             </div>
                             <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-slate-600">
                                   <FileText className="w-3.5 h-3.5 text-blue-500" />
                                   Ultimo_Balancete.xlsx
                                </div>
                                <X className="w-3.5 h-3.5 text-slate-300 cursor-pointer hover:text-red-500 transition-colors" />
                             </div>
                          </div>
                        </div>
                        <button onClick={() => setActiveTab('drives')} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-secondary hover:text-secondary transition-all uppercase tracking-widest">
                          + Vincular mais arquivos
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 mb-2">Conecte um drive para gerenciar arquivos.</p>
                        <button onClick={() => setActiveTab('drives')} className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline">
                          Gerenciar Integrações
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-10">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                     <FileText className="w-3 h-3" />
                     Observações Estratégicas
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-600 leading-relaxed border border-slate-100">
                    {selectedClient.notes || 'Nenhuma observação registrada.'}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Editar Cadastro
                  </button>
                  <button 
                    onClick={() => handleDriveConnect()}
                    className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Cloud className="w-4 h-4" />
                    Ver no Drive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
