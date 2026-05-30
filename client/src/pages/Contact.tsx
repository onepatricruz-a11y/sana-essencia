import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, MapPin, Share2, FileText, Check } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    message: ""
  });
  const [submitted, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubscribed(true);
    toast.success("Research Inquiry Received", {
      description: "Patricia's lab has received your message. We will respond within 48 research hours.",
    });
    setFormData({ name: "", email: "", institution: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="bg-card text-card-foreground border-b border-border py-16 grid-notebook">
        <div className="container max-w-4xl text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            [Collaborative Inquiries]
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary font-bold">
            Contact the Lab
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Whether you are a clinician seeking formulation details, a researcher interested in collaboration, or a customer with specific questions, we welcome your inquiry.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  [Lab Headquarters]
                </div>
                <h2 className="text-2xl font-serif text-primary font-semibold">
                  Sana Essencia Laboratories
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our research and compounding laboratory is located within the scientific incubator park of Coimbra, Portugal. 
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-6 font-mono text-xs text-muted-foreground">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-primary font-bold uppercase tracking-wider block">RESEARCH INQUIRIES</span>
                    <a href="mailto:research@sanaessencia.com" className="hover:text-primary transition-colors block">
                      research@sanaessencia.com
                    </a>
                    <a href="mailto:patricia@sanaessencia.com" className="hover:text-primary transition-colors block">
                      patricia@sanaessencia.com (Chief Researcher)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-t border-border/60 pt-6">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-primary font-bold uppercase tracking-wider block">LABORATORY ADDRESS</span>
                    <p className="leading-relaxed">
                      Sana Essencia Labs, Block B-3<br />
                      Coimbra Science and Technology Park<br />
                      3030-199 Coimbra, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-t border-border/60 pt-6">
                  <Share2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-primary font-bold uppercase tracking-wider block">RESEARCH NETWORKS</span>
                    <div className="flex flex-col space-y-1">
                      <a href="#researchgate" className="hover:text-primary transition-colors">ResearchGate / Patricia-Labs</a>
                      <a href="#linkedin" className="hover:text-primary transition-colors">LinkedIn / company/sana-essencia</a>
                      <a href="#instagram" className="hover:text-primary transition-colors">Instagram / @sana.essencia</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Bulletin Box */}
              <div className="border border-border p-5 bg-card font-mono text-[10px] space-y-2 text-muted-foreground uppercase">
                <div className="text-primary font-bold text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>PUBLICATIONS & DATA</span>
                </div>
                <p className="leading-relaxed">
                  Clinicians and academic researchers may request our compiled GC-MS chromatography data sheets and peer-reviewed literature references dossier.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-card border border-border p-8 md:p-10 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  [Communication Portal]
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">
                  Submit an Inquiry
                </h3>
              </div>

              {submitted ? (
                <div className="border border-secondary/40 bg-secondary/5 p-6 space-y-4 text-center">
                  <div className="h-10 w-10 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center mx-auto text-accent">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-primary">Inquiry Logged</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      Thank you. Your submission has been securely transmitted to our Coimbra laboratory database. A clinical associate or Patricia herself will respond shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-background border border-border px-4 py-3 text-xs font-mono focus:outline-none focus:border-primary"
                        placeholder="Dr. Sarah Jenkins"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-background border border-border px-4 py-3 text-xs font-mono focus:outline-none focus:border-primary"
                        placeholder="s.jenkins@university.edu"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="institution" className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                      Affiliation / Institution (Optional)
                    </label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border px-4 py-3 text-xs font-mono focus:outline-none focus:border-primary"
                      placeholder="Department of Cognitive Science, MIT"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                      Inquiry Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border px-4 py-3 text-xs font-mono focus:outline-none focus:border-primary resize-none"
                      placeholder="Please detail your research, clinical, or general inquiry..."
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary py-6 btn-tactile"
                    >
                      Transmit Inquiry to Lab
                    </Button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
