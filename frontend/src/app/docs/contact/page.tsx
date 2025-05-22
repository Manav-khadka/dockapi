"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ChevronLeft, Mail, MessageSquare, Phone, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
    isSubmitting: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData(prev => ({ ...prev, priority: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'normal',
      isSubmitting: false
    });
  };

  return (
    <Layout>
      <Toaster />
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
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Support</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Get help from our technical team or find answers to common questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your issue in detail"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <Label>Priority</Label>
                  <RadioGroup 
                    value={formData.priority} 
                    onValueChange={handlePriorityChange}
                    className="flex flex-col sm:flex-row gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent">Urgent</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={formData.isSubmitting}
                >
                  {formData.isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">For general inquiries</p>
                      <a href="mailto:support@dockapi.com" className="text-blue-600 hover:underline block mt-1">
                        support@dockapi.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mt-1">Available for paid plans</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => alert('Live chat would open here')}
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">Available for enterprise plans</p>
                      <p className="text-sm mt-1">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Support Hours</h3>
                      <p className="text-sm text-muted-foreground mt-1">We're here to help during these hours:</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>Monday - Friday: 9am - 8pm EST</li>
                        <li>Saturday: 10am - 5pm EST</li>
                        <li>Sunday: Closed</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Enterprise customers receive 24/7 support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-3">Other Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/faq" className="text-blue-600 hover:underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-blue-600 hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/manavkhadka/dockapi/discussions" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    Community Forum
                  </a>
                </li>
                <li>
                  <Link href="/docs/tutorials" className="text-blue-600 hover:underline">
                    Tutorials & Guides
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 