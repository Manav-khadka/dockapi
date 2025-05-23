"use client";
import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  
  const plans = [
    {
      name: 'Free',
      description: 'For personal projects and experimentation',
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        'Up to 3 applications',
        '512MB RAM per application',
        '0.5 CPU cores per application',
        '1GB storage per application',
        'Shared subdomain (*.dockapi.manavkhadka.com.np)',
        'Community support'
      ],
      limitations: [
        'Shared resources',
        'No custom domains',
        'No auto-scaling',
        'Limited monitoring'
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      highlight: false
    },
    {
      name: 'Pro',
      description: 'For professional developers and small teams',
      priceMonthly: 19,
      priceAnnual: 190,
      features: [
        'Up to 10 applications',
        '1GB RAM per application',
        '1 CPU core per application',
        '10GB storage per application',
        'Custom domains with SSL',
        'Auto-scaling (up to 3 instances)',
        'Advanced monitoring',
        'Email support',
        'CI/CD integrations'
      ],
      limitations: [],
      cta: 'Subscribe',
      ctaLink: '/signup?plan=pro',
      highlight: true
    },
    {
      name: 'Team',
      description: 'For growing teams and businesses',
      priceMonthly: 49,
      priceAnnual: 490,
      features: [
        'Up to 25 applications',
        '2GB RAM per application',
        '2 CPU cores per application',
        '25GB storage per application',
        'Custom domains with SSL',
        'Auto-scaling (up to 10 instances)',
        'Advanced monitoring & analytics',
        'Priority email & chat support',
        'CI/CD integrations',
        'Team member management',
        'Access controls & permissions'
      ],
      limitations: [],
      cta: 'Subscribe',
      ctaLink: '/signup?plan=team',
      highlight: false
    }
  ];

  const enterpriseFeatures = [
    'Unlimited applications',
    'Custom resource allocation',
    'Dedicated infrastructure',
    'Private networking',
    'VPC peering',
    'Custom security policies',
    '24/7 phone & email support',
    'Dedicated account manager',
    'Custom SLA',
    'On-premises deployment option',
    'SAML/SSO integration'
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core platform features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${billingInterval === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>
                Monthly billing
              </span>
              <Switch
                checked={billingInterval === 'annual'}
                onCheckedChange={(checked) => setBillingInterval(checked ? 'annual' : 'monthly')}
                id="billing-toggle"
              />
              <div className="flex items-center">
                <span className={`text-sm ${billingInterval === 'annual' ? 'font-medium' : 'text-muted-foreground'}`}>
                  Annual billing
                </span>
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  Save 20%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.highlight ? 'border-blue-500 shadow-lg shadow-blue-100' : ''}`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingInterval === 'monthly' ? plan.priceMonthly : plan.priceAnnual}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{billingInterval === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Includes:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium text-muted-foreground mt-4">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild
                  className="w-full" 
                  variant={plan.highlight ? "default" : "outline"}
                >
                  <Link href={plan.ctaLink}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Enterprise Plan */}
        <div className="bg-slate-50 border rounded-xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Enterprise Plan</h2>
              <p className="text-muted-foreground max-w-xl">
                For large organizations with custom requirements. Get a tailored solution with dedicated support and infrastructure.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact-sales">
                Contact Sales
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan at any time?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade your plan at any time and the new features will be immediately available. When downgrading, the changes will take effect at the end of your current billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How does the billing work?</h3>
              <p className="text-muted-foreground">
                For paid plans, we charge at the beginning of each billing cycle (monthly or annually). You can change your billing interval at any time, with annual plans offering a 20% discount.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What happens if I exceed my plan limits?</h3>
              <p className="text-muted-foreground">
                We&apos;ll notify you when you&apos;re approaching your plan limits. If you exceed them, your applications will continue to run, but we&apos;ll reach out to discuss upgrading to a more suitable plan. We never shut down your services without warning.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Do you offer a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, all paid plans come with a 14-day free trial, no credit card required. You can explore all features and decide which plan works best for your needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Is there a long-term commitment?</h3>
              <p className="text-muted-foreground">
                No, you can cancel your subscription at any time. For monthly plans, you&apos;ll have access until the end of your current billing month. For annual plans, we offer prorated refunds for the unused portion.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="mb-4">Have more questions about our pricing?</p>
            <Button asChild variant="outline">
              <Link href="/docs/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 