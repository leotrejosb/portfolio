'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, Linkedin, Github, Mail, FileDown, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MatrixBackground } from '@/components/matrix-background';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  // 👇 PASO 1: AÑADIR NUEVO ESTADO PARA LA DESCARGA
  const [isDownloading, setIsDownloading] = useState(false);


  const validateForm = () => {
    // ... (esta función no cambia)
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (esta función no cambia)
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;
    setIsSubmitting(true);
    const apiEndpoint = 'https://back.leonardotrejos.cerebria.co/api/v1/contact/';
    const webhookUrl = 'https://zzn8nzz.cerebria.co/webhook/form-contacto-leonardotrejos';
    const csrfToken = 'l2IdYbpCxE3UZYFPbAnuQkKsUU4jHqbzXqHgjuHA0hvGM7kQC4HrkpZfCYEIYTtO';
    try {
      const apiRequest = fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'accept': 'application/json', 'X-CSRFTOKEN': csrfToken }, body: JSON.stringify(formData) });
      const webhookRequest = fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const responses = await Promise.all([apiRequest, webhookRequest]);
      const failedResponse = responses.find(res => !res.ok);
      if (failedResponse) throw new Error(`Failed to send data. Status: ${failedResponse.status}`);
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); setFormData({ name: '', email: '', subject: '', message: '' }); }, 3000);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    // ... (esta función no cambia)
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };


  // In your ContactPage.tsx file

const handleDownloadCV = async () => {
  setIsDownloading(true);
  setSubmitError(''); // Clear previous errors

  try {
    // 👇 THE ONLY CHANGE IS HERE: Correctly point to the download action 👇
    const response = await fetch('https://back.leonardotrejos.cerebria.co/api/v1/documents/download-latest/');

    if (!response.ok) {
      // This will now catch proper errors, like if no CV is uploaded
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}: Download failed`);
    }

    // This part is correct and will now work as expected
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Leonardo_Trejos_CV.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

  } catch (error) {
    console.error('Download CV Error:', error);
    setSubmitError((error as Error).message);
  } finally {
    setIsDownloading(false);
  }
};


  return (
    <main className="min-h-screen relative">
      <MatrixBackground />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-green-400 transition-colors mb-8">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Secure Communication <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Channel</span>
              </h1>
              <p className="text-xl text-gray-400">
                Have a project in mind? Let&apos;s talk about how I can help bring it to life.
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Let&apos;s Connect</h2>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/leonardotrejos/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800 hover:border-blue-500 transition-all duration-300 group">
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"><Linkedin className="w-6 h-6 text-blue-500" /></div>
                  <div><div className="font-bold text-white">LinkedIn</div><div className="text-sm text-gray-400">Connect professionally</div></div>
                </a>
                <a href="https://github.com/leotrejosb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800 hover:border-gray-600 transition-all duration-300 group">
                  <div className="p-3 rounded-lg bg-gray-600/10 group-hover:bg-gray-600/20 transition-colors"><Github className="w-6 h-6 text-gray-400" /></div>
                  <div><div className="font-bold text-white">GitHub</div><div className="text-sm text-gray-400">Check out my code</div></div>
                </a>
                <a href="mailto:leonardo.trejos@hotmail.com" className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800 hover:border-green-400 transition-all duration-300 group">
                  <div className="p-3 rounded-lg bg-green-400/10 group-hover:bg-green-400/20 transition-colors"><Mail className="w-6 h-6 text-green-400" /></div>
                  <div><div className="font-bold text-white">Email</div><div className="text-sm text-gray-400">leonardo.trejos@hotmail.com</div></div>
                </a>

                {/* 👇 PASO 3: ACTUALIZAR EL BOTÓN DE DESCARGA */}
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800 hover:border-yellow-500 transition-all duration-300 group w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="p-3 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                    {isDownloading ? (
                      <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
                    ) : (
                      <FileDown className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">
                      {isDownloading ? 'Downloading...' : 'Download CV'}
                    </div>
                    <div className="text-sm text-gray-400">PDF Format</div>
                  </div>
                </button>

              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <form onSubmit={handleSubmit} className="glassmorphism rounded-xl p-8 space-y-6">
              {/* ... El resto del formulario no cambia ... */}
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={`bg-black/40 border-gray-700 text-white focus:border-green-400 transition-colors ${errors.name ? 'border-red-500' : formData.name ? 'border-green-400' : ''}`} placeholder="Your name" />
                {errors.name && (<p className="text-red-500 text-sm">{errors.name}</p>)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={`bg-black/40 border-gray-700 text-white focus:border-green-400 transition-colors ${errors.email ? 'border-red-500' : formData.email && !errors.email ? 'border-green-400' : ''}`} placeholder="you@example.com" />
                {errors.email && (<p className="text-red-500 text-sm">{errors.email}</p>)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <Input id="subject" value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)} className={`bg-black/40 border-gray-700 text-white focus:border-green-400 transition-colors ${errors.subject ? 'border-red-500' : formData.subject ? 'border-green-400' : ''}`} placeholder="What can I help you with?" />
                {errors.subject && (<p className="text-red-500 text-sm">{errors.subject}</p>)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea id="message" value={formData.message} onChange={(e) => handleChange('message', e.target.value)} className={`bg-black/40 border-gray-700 text-white focus:border-green-400 transition-colors min-h-[150px] ${errors.message ? 'border-red-500' : formData.message ? 'border-green-400' : ''}`} placeholder="Tell me about your project..." />
                {errors.message && (<p className="text-red-500 text-sm">{errors.message}</p>)}
              </div>
              {submitError && (<div className="flex items-center text-red-500 text-sm"><AlertTriangle className="mr-2 h-4 w-4" />{submitError}</div>)}
              <Button type="submit" size="lg" disabled={isSubmitting || isSuccess} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-black font-bold transition-all duration-300 disabled:opacity-50">
                {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Encrypting message...</>) : isSuccess ? (<><CheckCircle2 className="mr-2 h-5 w-5" />Message Sent</>) : (<><Send className="mr-2 h-5 w-5" />Send Encrypted Message</>)}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}