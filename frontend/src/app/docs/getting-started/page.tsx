import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GettingStartedPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-12 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/docs" 
            className="text-sm flex items-center text-muted-foreground hover:text-foreground transition"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Documentation
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Side Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="sticky top-20 space-y-1">
              <p className="text-sm font-medium text-muted-foreground mb-2 px-3">On this page</p>
              <a href="#introduction" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Introduction</a>
              <a href="#prerequisites" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Prerequisites</a>
              <a href="#installation" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Installation</a>
              <a href="#first-project" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Your First Project</a>
              <a href="#configuration" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Configuration</a>
              <a href="#deployment" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Deployment</a>
              <a href="#next-steps" className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50">Next Steps</a>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <article className="prose prose-slate max-w-none">
              <h1 id="introduction">Getting Started with DockAPI</h1>
              <p>
                Welcome to DockAPI! This guide will walk you through the basics of setting up your account, installing the necessary tools, and deploying your first Docker application.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Note</h3>
                    <div className="text-sm text-blue-700">
                      <p>This guide assumes you have basic knowledge of Docker and containerization concepts.</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="prerequisites">Prerequisites</h2>
              <p>
                Before you begin, ensure you have the following installed on your machine:
              </p>
              <ul>
                <li>
                  <strong>Docker</strong>: Version 20.10.0 or higher. You can download it from <a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">Docker's official website</a>.
                </li>
                <li>
                  <strong>Node.js</strong>: Version 14.0.0 or higher (optional, needed only for using the DockAPI CLI). You can download it from <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js website</a>.
                </li>
                <li>
                  <strong>Git</strong>: Required for version control. You can download it from <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git's website</a>.
                </li>
              </ul>

              <h2 id="installation">Installation</h2>
              <p>
                You can interact with DockAPI through our web interface or by using our CLI tool. Here's how to install the CLI:
              </p>

              <div className="border rounded-md my-6">
                <div className="bg-slate-50 border-b px-4 py-2 font-mono text-sm">
                  Install DockAPI CLI
                </div>
                <div className="p-4 bg-slate-900 text-white rounded-b-md">
                  <Tabs defaultValue="npm">
                    <TabsList className="bg-slate-800">
                      <TabsTrigger value="npm">npm</TabsTrigger>
                      <TabsTrigger value="yarn">yarn</TabsTrigger>
                      <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    </TabsList>
                    <TabsContent value="npm" className="mt-2">
                      <div className="flex items-center justify-between">
                        <code className="text-sm">npm install -g @dockapi/cli</code>
                        <button className="text-slate-400 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </TabsContent>
                    <TabsContent value="yarn" className="mt-2">
                      <div className="flex items-center justify-between">
                        <code className="text-sm">yarn global add @dockapi/cli</code>
                        <button className="text-slate-400 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </TabsContent>
                    <TabsContent value="pnpm" className="mt-2">
                      <div className="flex items-center justify-between">
                        <code className="text-sm">pnpm add -g @dockapi/cli</code>
                        <button className="text-slate-400 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <p>
                Verify the installation by running the following command:
              </p>

              <div className="border rounded-md my-4">
                <div className="p-4 bg-slate-900 text-white rounded-md">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">dockapi --version</code>
                    <button className="text-slate-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <h2 id="first-project">Your First Project</h2>
              <p>
                Let's create your first project and prepare it for deployment.
              </p>

              <h3>1. Log in to your DockAPI account</h3>
              <p>
                If you haven't already, <Link href="/login" className="text-blue-600 hover:text-blue-800">sign up for a DockAPI account</Link>. Then, authenticate the CLI with your account:
              </p>

              <div className="border rounded-md my-4">
                <div className="p-4 bg-slate-900 text-white rounded-md">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">dockapi login</code>
                    <button className="text-slate-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p>Follow the prompts to complete the authentication process.</p>

              <h3>2. Initialize a new project</h3>
              <p>
                Navigate to your project directory (or create a new one) and run:
              </p>

              <div className="border rounded-md my-4">
                <div className="p-4 bg-slate-900 text-white rounded-md">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">dockapi init my-first-project</code>
                    <button className="text-slate-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p>
                This command will create a `dockapi.yaml` configuration file in your project directory.
              </p>

              <h2 id="configuration">Configuration</h2>
              <p>
                The `dockapi.yaml` file is the heart of your project configuration. Here's a basic example:
              </p>

              <div className="border rounded-md my-6">
                <div className="bg-slate-50 border-b px-4 py-2 font-mono text-sm">
                  dockapi.yaml
                </div>
                <div className="p-4 bg-slate-900 text-white rounded-md">
                  <pre className="text-sm overflow-auto"><code>{`name: my-first-project
version: 1.0.0
region: us-east-1
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      NODE_ENV: production
      PORT: 8080
    scale: 1
    health_check:
      path: /health
      interval: 30s
`}</code></pre>
                </div>
              </div>

              <p>
                For more configuration options, visit our <Link href="/docs/configuration" className="text-blue-600 hover:text-blue-800">Configuration Reference</Link>.
              </p>

              <h2 id="deployment">Deployment</h2>
              <p>
                Once your project is configured, you can deploy it using the following command:
              </p>

              <div className="border rounded-md my-4">
                <div className="p-4 bg-slate-900 text-white rounded-md">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">dockapi deploy</code>
                    <button className="text-slate-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p>
                Alternatively, you can use our web interface to deploy your project:
              </p>

              <ol>
                <li>Log in to your <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">DockAPI Dashboard</Link></li>
                <li>Click on "New Project" or select an existing repository</li>
                <li>Configure your deployment settings</li>
                <li>Click "Deploy" to start the deployment process</li>
              </ol>

              <div className="bg-slate-50 border rounded-md p-6 my-8">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Deployment Complete!
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  After deployment is complete, your application will be accessible at a unique URL:
                </p>
                <div className="bg-white border rounded-md p-3">
                  <code className="text-sm">https://my-first-project.dockapi.manavkhadka.com.np</code>
                </div>
              </div>

              <h2 id="next-steps">Next Steps</h2>
              <p>
                Now that you've deployed your first project, here are some next steps to explore:
              </p>

              <ul>
                <li><Link href="/docs/custom-domains" className="text-blue-600 hover:text-blue-800">Configure custom domains</Link></li>
                <li><Link href="/docs/tutorials/ci-cd" className="text-blue-600 hover:text-blue-800">Set up CI/CD pipelines</Link></li>
                <li><Link href="/docs/scaling" className="text-blue-600 hover:text-blue-800">Learn about scaling options</Link></li>
                <li><Link href="/docs/monitoring" className="text-blue-600 hover:text-blue-800">Monitor your application</Link></li>
                <li><Link href="/docs/api-reference" className="text-blue-600 hover:text-blue-800">Explore the API reference</Link></li>
              </ul>

              <div className="border-t border-b py-6 my-8">
                <h3 className="text-lg font-medium mb-4">Need Help?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/docs/faq" 
                    className="flex-1 border rounded-md p-4 hover:bg-slate-50 transition"
                  >
                    <h4 className="font-medium mb-2">Check our FAQ</h4>
                    <p className="text-sm text-slate-600">Find answers to commonly asked questions</p>
                  </Link>
                  <Link 
                    href="/docs/contact" 
                    className="flex-1 border rounded-md p-4 hover:bg-slate-50 transition"
                  >
                    <h4 className="font-medium mb-2">Contact Support</h4>
                    <p className="text-sm text-slate-600">Get help from our technical team</p>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
} 