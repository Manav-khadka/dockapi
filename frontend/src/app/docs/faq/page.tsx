import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FAQPage() {
  // FAQ categories and questions
  const faqCategories = [
    {
      title: 'General',
      questions: [
        {
          question: 'What is DockAPI?',
          answer: 'DockAPI is a cloud platform that simplifies the deployment and management of Docker containers. It provides an intuitive interface for deploying applications, managing environments, and monitoring performance, all without needing to manage complex infrastructure.'
        },
        {
          question: 'How does DockAPI differ from other container platforms?',
          answer: 'DockAPI focuses on simplicity and developer experience. Unlike other platforms that require extensive configuration, DockAPI offers a streamlined workflow with sensible defaults, integrated CI/CD capabilities, and built-in monitoring tools. We also provide AI-powered assistance for optimizing your deployments.'
        },
        {
          question: 'Is DockAPI suitable for production workloads?',
          answer: 'Yes, DockAPI is designed for both development and production environments. We offer different tiers of service with SLAs, dedicated resources, and enhanced security features for production workloads.'
        }
      ]
    },
    {
      title: 'Pricing & Billing',
      questions: [
        {
          question: 'How does DockAPI pricing work?',
          answer: 'DockAPI offers a usage-based pricing model where you pay only for the resources you consume. We measure resource usage in terms of compute units, which are calculated based on CPU, memory, and storage utilization. We also offer fixed-price plans for teams that prefer predictable billing.'
        },
        {
          question: 'Is there a free tier?',
          answer: 'Yes, DockAPI offers a generous free tier that includes up to 3 applications with shared resources, suitable for personal projects and experimentation. The free tier includes 512MB RAM, 0.5 CPU cores, and 1GB of storage per application.'
        },
        {
          question: 'How can I estimate my monthly costs?',
          answer: 'You can use our pricing calculator on the pricing page to estimate costs based on your expected resource usage. Additionally, we provide detailed usage metrics and cost breakdowns in your dashboard, along with budget alerts to help manage expenses.'
        }
      ]
    },
    {
      title: 'Deployment',
      questions: [
        {
          question: 'How do I deploy my first application?',
          answer: 'Deploying your first application is simple. You can connect your Git repository (GitHub, GitLab, or Bitbucket), configure your deployment settings, and click "Deploy". Alternatively, you can use our CLI tool for deployment. Check our Getting Started guide for detailed instructions.'
        },
        {
          question: 'Which programming languages and frameworks are supported?',
          answer: 'DockAPI supports any application that can run in a Docker container. This includes popular languages and frameworks like Node.js, Python, Ruby, Java, Go, PHP, .NET, and many more. If it can be containerized, it can be deployed on DockAPI.'
        },
        {
          question: 'Can I deploy databases on DockAPI?',
          answer: 'Yes, you can deploy databases like PostgreSQL, MySQL, MongoDB, and Redis on DockAPI. However, for production workloads, we recommend using our managed database offerings or connecting to external database services for better reliability and performance.'
        },
        {
          question: 'How do I configure environment variables?',
          answer: 'You can configure environment variables through our web interface or CLI. We provide a secure environment variable management system that supports encryption for sensitive data. You can also define different variables for different environments (development, staging, production).'
        }
      ]
    },
    {
      title: 'Management & Scaling',
      questions: [
        {
          question: 'How do I scale my application?',
          answer: 'DockAPI offers both manual and automatic scaling options. You can manually adjust the number of instances, CPU, and memory allocation through our dashboard or CLI. For automatic scaling, you can set up rules based on metrics like CPU usage, memory consumption, or request count.'
        },
        {
          question: 'Does DockAPI support custom domains?',
          answer: 'Yes, you can configure custom domains for your applications. We provide automatic HTTPS certificates through Let&apos;s Encrypt. You simply need to add your domain in the dashboard and update your DNS settings to point to our servers.'
        },
        {
          question: 'How does DockAPI handle logging?',
          answer: 'DockAPI automatically collects stdout/stderr logs from your containers. You can view these logs in real-time through our dashboard or CLI. We also support log forwarding to external services like Datadog, Logstash, or your own log aggregation system.'
        }
      ]
    },
    {
      title: 'Security & Compliance',
      questions: [
        {
          question: 'How does DockAPI secure my applications?',
          answer: 'DockAPI implements multiple layers of security, including network isolation between containers, automatic HTTPS, regular security updates, and vulnerability scanning for container images. We also offer features like IP restrictions, authentication policies, and audit logs.'
        },
        {
          question: 'Is DockAPI GDPR compliant?',
          answer: 'Yes, DockAPI is GDPR compliant. We offer data processing agreements (DPAs) for customers who require them. Our infrastructure is designed with privacy and data protection in mind, and we provide tools to help you maintain compliance with your own applications.'
        },
        {
          question: 'Can I restrict access to my applications?',
          answer: 'Yes, you can implement various access controls including IP restrictions, authentication requirements, and team-based permissions. For enterprise customers, we offer integration with SSO providers and more advanced security features.'
        }
      ]
    }
  ];

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

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Find answers to common questions about DockAPI&apos;s features, pricing, and usage.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for answers..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category, index) => (
            <div key={index} className="border-b pb-8 last:border-b-0">
              <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <details key={faqIndex} className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-3 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-slate-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you couldn&apos;t find the answer you were looking for, our support team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/docs/contact">
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://github.com/manavkhadka/dockapi/discussions" target="_blank" rel="noopener noreferrer">
                Community Forum
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 