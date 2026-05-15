/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, PlayCircle, Lock, CheckCircle2 } from "lucide-react";

interface Site {
  name: string;
  desc: string;
  icon: string;
  color: string;
  url: string;
}

const allSites = [
  { name: "Claude", desc: "Anthropic · Chat & API", icon: "🤖", color: "purple", url: "https://claude.ai/new" },
  { name: "ChatGPT", desc: "OpenAI · GPT-4o", icon: "✦", color: "teal", url: "https://chatgpt.com/" },
  { name: "Gemini", desc: "Google · Gemini 2.0", icon: "♊", color: "blue", url: "https://gemini.google.com/app" },
  { name: "Grok", desc: "xAI · Grok 3", icon: "⚡", color: "white", url: "https://grok.com/" },
  { name: "AI Studio", desc: "Google · Dev & prompts", icon: "🔬", color: "blue", url: "https://aistudio.google.com/apps" },
  { name: "MotionSites", desc: "Webs con animación AI", icon: "🌀", color: "purple", url: "https://motionsites.ai/" },
  { name: "Luma Labs", desc: "Video · Dream Machine", icon: "🎥", color: "pink", url: "https://app.lumalabs.ai/boards" },
  { name: "GitHub", desc: "Repositorios · Código", icon: "🐙", color: "white", url: "https://github.com/" },
  { name: "Vercel", desc: "Deploy · Vortexia", icon: "▲", color: "white", url: "https://vercel.com/vortexia" },
  { name: "YouTube", desc: "Google · Video & Streaming", icon: "📺", color: "orange", url: "https://www.youtube.com/" },
  { name: "Wavespeed", desc: "Wavespeed · Image to Video", icon: "🌊", color: "blue", url: "https://wavespeed.ai/models/wavespeed-ai/ltx-2.3/image-to-video?utm_source=google" },
  { name: "Draftly", desc: "Onboarding · Space Tools", icon: "✍️", color: "teal", url: "https://www.draftly.space/onboarding" },
  { name: "Trellis 3D", desc: "Mesh · 3D Generation", icon: "🧊", color: "purple", url: "https://trellis3d.net/es" },
  { name: "Firecrawl", desc: "Github · Web to LLM", icon: "🔥", color: "orange", url: "https://github.com/firecrawl/firecrawl" },
  { name: "Claude Code", desc: "CLI · Oh My Claude", icon: "💻", color: "white", url: "https://ohmyclaudecode.com/" },
  { name: "Superpowers", desc: "Obra · OS Superpowers", icon: "🦸", color: "pink", url: "https://github.com/obra/superpowers/tree/main" },
];

const workflowSteps = [
  { step: 1, site: "Claude", instruction: "Crear metaprompt para crear la imagen inicial en chatgpt y el metaprompt para crear la imagen final en chatgpt", url: "https://claude.ai/new" },
  { step: 2, site: "ChatGPT", instruction: "Crear la imagen inicial y la imagen final", url: "https://chatgpt.com/" },
  { step: 3, site: "Claude", instruction: "Crear el metaprompt para crear el video con ia de transición", url: "https://claude.ai/new" },
  { step: 4, site: "Luma Labs", instruction: "Ponemos el prompt que nos dio claude en Lumalabs y la imagen de inicio y de final y lumalabs creara el video", url: "https://app.lumalabs.ai/boards" },
  { step: 5, site: "MotionSites", instruction: "Buscar diseños de webs y copiar un prompt", url: "https://motionsites.ai/" },
  { step: 6, site: "Claude", instruction: "Crear el metaprompt para google ai studio", url: "https://claude.ai/new" },
  { step: 7, site: "AI Studio", instruction: "Google ai studio creará la web", url: "https://aistudio.google.com/apps" },
  { step: 8, site: "GitHub", instruction: "La web estará en un repositorio de github", url: "https://github.com/" },
  { step: 9, site: "Vercel", instruction: "La web tendrá deploy en vercel", url: "https://vercel.com/vortexia" },
];

const colorGradients: Record<string, string> = {
  purple: "radial-gradient(circle at 0% 0%, rgba(124, 106, 255, 0.09), transparent 60%)",
  teal: "radial-gradient(circle at 0% 0%, rgba(61, 240, 194, 0.07), transparent 60%)",
  blue: "radial-gradient(circle at 0% 0%, rgba(58, 150, 255, 0.08), transparent 60%)",
  orange: "radial-gradient(circle at 0% 0%, rgba(255, 140, 60, 0.08), transparent 60%)",
  white: "radial-gradient(circle at 0% 0%, rgba(220, 225, 255, 0.05), transparent 60%)",
  pink: "radial-gradient(circle at 0% 0%, rgba(240, 80, 180, 0.07), transparent 60%)",
};

interface CardProps {
  site: Site | any;
  index: number;
  isWorkflow?: boolean;
  instruction?: string;
  stepNumber?: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  onComplete?: () => void;
}

function Card({ 
  site, 
  index, 
  isWorkflow = false, 
  instruction = "", 
  stepNumber = 0,
  isLocked = false,
  isCompleted = false,
  onComplete
}: CardProps) {
  const originalSite = isWorkflow ? allSites.find(s => s.name === (typeof site === "string" ? site : site.name)) : site;
  const icon = isWorkflow ? originalSite?.icon : site.icon;
  const color = isWorkflow ? originalSite?.color : site.color;
  const name = isWorkflow ? (typeof site === "string" ? site : site.name) : site.name;
  const url = isWorkflow ? originalSite?.url : site.url;

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    if (onComplete) onComplete();
  };

  return (
    <motion.a
      href={isLocked ? "#" : url}
      target={isLocked ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={isLocked ? {} : { y: -3 }}
      whileTap={isLocked ? {} : { y: -1 }}
      className={`group relative flex flex-col ${isWorkflow ? 'items-start text-left w-72 h-44' : 'items-center text-center w-full'} justify-center gap-3 p-6 overflow-hidden transition-all duration-200 border rounded-xl bg-surface border-border-dim ${isLocked ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:border-border-hover hover:shadow-2xl hover:shadow-black/40 hover:bg-[#111520] cursor-pointer'}`}
    >
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: colorGradients[color || 'white'] }}
      />
      
      <div className="absolute top-4 right-4 z-20">
        {isLocked && <Lock className="w-3.5 h-3.5 text-text-muted" />}
        {isCompleted && <CheckCircle2 className="w-4 h-4 text-accent-teal fill-accent-teal/10" />}
      </div>

      {isWorkflow && (
        <span className={`relative z-10 text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-1 ${isCompleted ? 'text-accent-teal bg-accent-teal/10' : 'text-gray-500 bg-white/5'}`}>
          Paso {stepNumber}
        </span>
      )}

      <div className={`relative z-10 ${isWorkflow ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} flex items-center justify-center border rounded-lg border-border-dim bg-white/3`}>
        {icon}
      </div>

      <div className="relative z-10">
        <h3 className="font-syne font-bold text-[0.85rem] text-text-main tracking-tight uppercase">
          {name}
        </h3>
        {isWorkflow && (instruction) && (
          <p className="mt-2 text-[0.62rem] text-text-muted leading-relaxed font-mono">
            {instruction}
          </p>
        )}
      </div>
    </motion.a>
  );
}

export default function App() {
  const [activeWorkflow, setActiveWorkflow] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <div id="web-hub-container" className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-12 flex flex-col min-h-screen">
      <div className="relative z-20 flex justify-center mb-10">
        {!activeWorkflow ? (
          <button
            onClick={() => setActiveWorkflow(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[0.65rem] font-bold uppercase tracking-widest hover:bg-accent-purple/20 hover:border-accent-purple/40 transition-all duration-200"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Flujo: Crear Web con Video
          </button>
        ) : (
          <button
            onClick={() => setActiveWorkflow(false)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted text-[0.65rem] font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a todas las herramientas
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!activeWorkflow ? (
          <motion.main
            key="all-tools"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative z-10"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {allSites.map((site, i) => (
                <Card key={site.name} site={site} index={i} />
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.main
            key="workflow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10"
          >
            <div className="mb-12 text-center">
              <h2 className="font-syne font-bold text-xl text-white tracking-tight uppercase">
                Crear Pagina web Con video Mp4
              </h2>
              <p className="text-[0.6rem] text-text-muted uppercase tracking-[0.2em] mt-2">
                Flujo de trabajo secuencial
              </p>
            </div>

            <div className="relative overflow-x-auto pb-12 no-scrollbar">
              <div className="flex items-start gap-0 min-w-max px-4">
                {workflowSteps.map((step, i) => {
                  const isLocked = step.step > 1 && !completedSteps.includes(step.step - 1);
                  const isCompleted = completedSteps.includes(step.step);
                  
                  return (
                    <div key={`${step.step}-${step.site}`} className="flex items-center">
                      <Card 
                        site={step.site} 
                        index={i} 
                        isWorkflow={true} 
                        instruction={step.instruction}
                        stepNumber={step.step}
                        isLocked={isLocked}
                        isCompleted={isCompleted}
                        onComplete={() => handleStepComplete(step.step)}
                      />
                      
                      {i < workflowSteps.length - 1 && (
                        <div className="relative flex items-center justify-center w-12 h-20">
                          <div className={`absolute w-full h-[1px] border-t border-dashed ${isCompleted ? 'bg-accent-teal border-accent-teal' : 'bg-border-dim border-white/20'}`} />
                          <div className={`relative z-10 w-2 h-2 rounded-full ${isCompleted ? 'bg-accent-teal shadow-[0_0_8px_rgba(61,240,194,0.5)]' : 'bg-border-dim'}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
