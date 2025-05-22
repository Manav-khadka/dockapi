"use client";
import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Settings, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  Server,
  Database,
  Network 
} from 'lucide-react';

export default function DashboardPage() {
  // Mock data for deployments
  const deployments = [
    {
      id: 'dep_1234567',
      name: 'dockapi',
      status: 'running',
      url: 'dockapi.dockapi.manavkhadka.com.np',
      lastDeployed: '2 hours ago',
      cpu: 23,
      memory: 47,
      requests: 1243
    },
    {
      id: 'dep_7654321',
      name: 'backend-api',
      status: 'running',
      url: 'backend-api.dockapi.manavkhadka.com.np',
      lastDeployed: '3 days ago',
      cpu: 15,
      memory: 32,
      requests: 876
    },
    {
      id: 'dep_8901234',
      name: 'marketing-site',
      status: 'deploying',
      url: 'marketing-site.dockapi.manavkhadka.com.np',
      lastDeployed: 'in progress',
      cpu: 0,
      memory: 10,
      requests: 0
    },
    {
      id: 'dep_5678901',
      name: 'data-processor',
      status: 'failed',
      url: 'data-processor.dockapi.manavkhadka.com.np',
      lastDeployed: '1 hour ago',
      cpu: 0,
      memory: 0,
      requests: 0
    }
  ];

  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      action: 'Deployment completed',
      target: 'dockapi',
      user: 'You',
      time: '2 hours ago'
    },
    {
      id: 2,
      action: 'Environment variable updated',
      target: 'backend-api',
      user: 'Alex Smith',
      time: '1 day ago'
    },
    {
      id: 3,
      action: 'New deployment started',
      target: 'marketing-site',
      user: 'You',
      time: '10 minutes ago'
    },
    {
      id: 4,
      action: 'Domain configured',
      target: 'dockapi',
      user: 'System',
      time: '2 days ago'
    },
    {
      id: 5,
      action: 'Deployment failed',
      target: 'data-processor',
      user: 'You',
      time: '1 hour ago'
    }
  ];

  // Mock statistics
  const stats = {
    activeDeployments: 2,
    totalRequests: 2119,
    avgResponseTime: 152, // ms
    uptime: 99.97, // percentage
  };
  
  // Helper function to render status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Running
          </span>
        );
      case 'deploying':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Deploying
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-12">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your deployments and monitor performance</p>
          </div>
          <div className="flex mt-4 sm:mt-0">
            <Button asChild variant="outline" className="mr-3">
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button asChild>
              <Link href="/deploy">
                <Plus className="w-4 h-4 mr-2" />
                New Deployment
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDeployments}</div>
              <div className="text-xs text-muted-foreground mt-1">Out of {deployments.length} total</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">↑ 12% from yesterday</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResponseTime} ms</div>
              <div className="text-xs text-green-600 mt-1">↓ 8% from yesterday</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uptime}%</div>
              <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="deployments" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          {/* Deployments Tab */}
          <TabsContent value="deployments">
            <div className="grid grid-cols-1 gap-6">
              {deployments.map((deployment) => (
                <Card key={deployment.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{deployment.name}</CardTitle>
                        <CardDescription>ID: {deployment.id}</CardDescription>
                      </div>
                      <div>
                        {getStatusBadge(deployment.status)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center">
                          <ArrowUpRight className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a 
                            href={`https://${deployment.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {deployment.url}
                          </a>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last deployed: {deployment.lastDeployed}
                        </div>
                      </div>
                      
                      {deployment.status === 'running' && (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center">
                                <Server className="w-4 h-4 mr-2 text-muted-foreground" />
                                CPU
                              </span>
                              <span>{deployment.cpu}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${deployment.cpu}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center">
                                <Database className="w-4 h-4 mr-2 text-muted-foreground" />
                                Memory
                              </span>
                              <span>{deployment.memory}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${deployment.memory}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Network className="w-4 h-4 mr-1" />
                      {deployment.status === 'running' ? `${deployment.requests.toLocaleString()} requests today` : 'No active traffic'}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/deployments/${deployment.id}/logs`}>
                          Logs
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/deployments/${deployment.id}`}>
                          Details
                        </Link>
                      </Button>
                      {deployment.status === 'failed' && (
                        <Button size="sm">
                          Redeploy
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions across your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="divide-y">
                  {activities.map((activity) => (
                    <li key={activity.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user} • {activity.target}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/deploy">
              <Card className="cursor-pointer hover:border-blue-300 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium">New Deployment</h3>
                  <p className="text-sm text-muted-foreground mt-1">Deploy a new application</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/logs">
              <Card className="cursor-pointer hover:border-purple-300 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <Server className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium">View Logs</h3>
                  <p className="text-sm text-muted-foreground mt-1">Check application logs</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/analytics">
              <Card className="cursor-pointer hover:border-green-300 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">View performance metrics</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/settings">
              <Card className="cursor-pointer hover:border-orange-300 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-orange-100 p-3 rounded-full mb-3">
                    <Settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-muted-foreground mt-1">Configure your account</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 