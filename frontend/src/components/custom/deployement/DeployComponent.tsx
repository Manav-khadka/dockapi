"use client";
import React, { useState } from 'react';
import SegmentedControl from "@/components/custom/SegmentedControl";
import Repositories from "@/components/custom/repositories/Repositories";
import { Github, Gitlab } from "lucide-react";
import { FaBitbucket } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function DeployComponent() {
  const [selected, setSelected] = useState("github");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This function would normally authenticate with the selected provider
  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-foreground/5 to-foreground/10 dark:from-foreground/10 dark:to-foreground/5 rounded-xl p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Deploy Your Project</h1>
        <p className="text-foreground/70 text-lg mb-0 max-w-2xl mx-auto">
          Connect to your repository provider and deploy your application in minutes.
        </p>
      </div>

      {!isAuthenticated ? (
        <div className="bg-background border rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold mb-6">Connect Your Repository</h2>
          <p className="text-foreground/70 mb-8">
            Choose a repository provider to connect and deploy your project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              className="flex items-center gap-2 py-6" 
              onClick={() => {
                setSelected("github");
                handleAuth();
              }}
            >
              <Github className="w-5 h-5" />
              <span>Connect with GitHub</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 py-6" 
              onClick={() => {
                setSelected("gitlab");
                handleAuth();
              }}
            >
              <Gitlab className="w-5 h-5" />
              <span>Connect with GitLab</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 py-6" 
              onClick={() => {
                setSelected("bitbucket");
                handleAuth();
              }}
            >
              <FaBitbucket className="w-5 h-5" />
              <span>Connect with Bitbucket</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-background border rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <SegmentedControl selected={selected} setSelected={setSelected} />
          </div>
          <Repositories selected={selected} />
        </div>
      )}
    </div>
  );
}
