import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, FileText, MessageSquare, Rocket, ChevronRight } from 'lucide-react';

export default function DocumentationPage() {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of DockAPI and set up your first project',
      icon: <Rocket className="h-6 w-6" />,
      href: '/docs/getting-started',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'API Reference',
      description: 'Complete reference documentation for the DockAPI REST and GraphQL APIs',
      icon: <Code className="h-6 w-6" />,
      href: '/docs/api-reference',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides to accomplish common tasks with DockAPI',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/docs/tutorials',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'FAQ',
      description: 'Answers to frequently asked questions about DockAPI',
      icon: <MessageSquare className="h-6 w-6" />,
      href: '/docs/faq',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'CLI Reference',
      description: 'Command line tool documentation for automating DockAPI workflows',
      icon: <FileText className="h-6 w-6" />,
      href: '/docs/cli',
      color: 'bg-rose-50 text-rose-600',
    }
  ];
  
  const popularArticles = [
    {
      title: 'Deploying your first Docker container',
      href: '/docs/tutorials/first-deployment',
      category: 'Tutorial'
    },
    {
      title: 'Setting up continuous deployment with GitHub Actions',
      href: '/docs/tutorials/github-actions',
      category: 'Integration'
    },
    {
      title: 'Managing environment variables securely',
      href: '/docs/tutorials/env-variables',
      category: 'Security'
    },
    {
      title: 'Scaling your application horizontally',
      href: '/docs/tutorials/scaling',
      category: 'Advanced'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-12 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Everything you need to know about deploying and managing your Docker applications with DockAPI.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <Link href="/docs/contact">Contact Support</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/getting-started">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
        
        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {docSections.map((section, index) => (
            <Link 
              key={index} 
              href={section.href}
              className="block group border rounded-xl p-6 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className={`${section.color} inline-flex p-3 rounded-lg mb-4`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{section.title}</h3>
              <p className="text-muted-foreground mb-4">{section.description}</p>
              <div className="flex items-center text-sm font-medium text-blue-600">
                Browse {section.title} <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
        
        {/* Popular Articles */}
        <div className="bg-slate-50 border rounded-xl p-6 mb-16">
          <h2 className="text-2xl font-semibold mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Link 
                key={index} 
                href={article.href}
                className="flex items-start py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="mr-4 mt-1 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium hover:text-blue-600">{article.title}</h3>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-gray-100 inline-block mt-1">
                    {article.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link href="/docs/tutorials">View all articles</Link>
            </Button>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Need more help?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can't find what you're looking for or have a specific question? Our support team is ready to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href="/docs/contact">
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://github.com/manavkhadka/dockapi" target="_blank" rel="noopener noreferrer">
                GitHub Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 