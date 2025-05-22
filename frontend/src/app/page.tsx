import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { StackingIcons } from "@/components/custom/StackingIcons";
import { BentoGridC } from "@/components/custom/BentoGridC";
import { Button } from "@/components/ui/button";
import Name from "@/components/name";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-16 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 dark:from-transparent dark:to-foreground/5 z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative h-40 w-full mb-12 flex items-center justify-center">
              <StackingIcons />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/70">
              Code to Cloud—Fast, Flawless, Fail-Safe with AI.
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
              DockAPI empowers developers to deploy and scale applications effortlessly with AI-optimized infrastructure.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a 
                className="w-full sm:w-auto rounded-lg border border-solid border-transparent transition-all flex items-center justify-center bg-foreground text-background gap-2 hover:bg-foreground/90 dark:hover:bg-foreground/90 text-base font-medium py-3 px-6"
                href="/deploy"
              >
                <Image
                  className="dark:invert"
                  src="/dockapiwithnobg.svg"
                  alt="DockAPI logo"
                  width={24}
                  height={24}
                />
                Deploy now
              </a>
              
              <a
                className="w-full sm:w-auto rounded-lg border border-solid border-foreground/10 dark:border-foreground/20 transition-all flex items-center justify-center hover:bg-foreground/5 dark:hover:bg-foreground/10 text-base font-medium py-3 px-6"
                href="#docs"
              >
                Read our docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-foreground/5 dark:bg-foreground/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Powerful Features</h2>
            <p className="mt-4 text-lg text-foreground/70">Deploy, manage, and scale your applications with ease</p>
          </div>
          
          <BentoGridC />
        </div>
      </section>
      
      {/* Testimonials or Additional Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-foreground/5 to-foreground/10 dark:from-foreground/10 dark:to-foreground/5 rounded-xl p-8 sm:p-10 shadow-sm">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-foreground/40 to-foreground/20 rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Ready to Transform Your Deployment Experience?</h2>
            <p className="text-center text-lg mb-8">Join thousands of developers who trust DockAPI for their mission-critical deployments.</p>
            <div className="flex justify-center">
              <Button className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 rounded-lg font-medium">
                Start Building Today
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Name />
    </div>
  );
}
