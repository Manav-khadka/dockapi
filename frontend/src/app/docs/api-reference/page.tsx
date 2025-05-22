import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { ChevronLeft, Copy, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function ApiReferencePage() {
  const apiEndpoints = [
    {
      id: 'authentication',
      name: 'Authentication',
      description: 'Authenticate with the DockAPI API using API keys or OAuth tokens.',
      endpoints: [
        {
          method: 'POST',
          path: '/api/v1/auth/token',
          description: 'Generate an access token using API key',
          requestExample: `{
  "api_key": "your_api_key",
  "api_secret": "your_api_secret"
}`,
          responseExample: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`
        },
        {
          method: 'POST',
          path: '/api/v1/auth/refresh',
          description: 'Refresh an expired access token',
          requestExample: `{
  "refresh_token": "your_refresh_token"
}`,
          responseExample: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "new_refresh_token"
}`
        }
      ]
    },
    {
      id: 'applications',
      name: 'Applications',
      description: 'Manage your deployed applications.',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/applications',
          description: 'List all applications',
          requestExample: '',
          responseExample: `{
  "applications": [
    {
      "id": "app_1234567890",
      "name": "my-nodejs-app",
      "status": "running",
      "created_at": "2023-08-15T14:30:00Z",
      "updated_at": "2023-08-15T14:35:00Z",
      "region": "us-east-1",
      "url": "my-nodejs-app.dockapi.manavkhadka.com.np"
    },
    {
      "id": "app_0987654321",
      "name": "my-python-api",
      "status": "stopped",
      "created_at": "2023-07-10T09:15:00Z",
      "updated_at": "2023-08-14T11:20:00Z",
      "region": "eu-west-1",
      "url": "my-python-api.dockapi.manavkhadka.com.np"
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}`
        },
        {
          method: 'GET',
          path: '/api/v1/applications/{id}',
          description: 'Get application details',
          requestExample: '',
          responseExample: `{
  "id": "app_1234567890",
  "name": "my-nodejs-app",
  "status": "running",
  "created_at": "2023-08-15T14:30:00Z",
  "updated_at": "2023-08-15T14:35:00Z",
  "region": "us-east-1",
  "url": "my-nodejs-app.dockapi.manavkhadka.com.np",
  "environment": "production",
  "resources": {
    "cpu": 1,
    "memory": 512,
    "storage": 1024
  },
  "scaling": {
    "min_instances": 1,
    "max_instances": 3,
    "current_instances": 1
  },
  "domains": [
    "my-nodejs-app.dockapi.manavkhadka.com.np",
    "api.mycompany.com"
  ]
}`
        },
        {
          method: 'POST',
          path: '/api/v1/applications',
          description: 'Create a new application',
          requestExample: `{
  "name": "my-new-app",
  "region": "us-east-1",
  "environment": "production",
  "resources": {
    "cpu": 1,
    "memory": 512,
    "storage": 1024
  },
  "source": {
    "type": "github",
    "repository": "username/repo",
    "branch": "main"
  }
}`,
          responseExample: `{
  "id": "app_2468135790",
  "name": "my-new-app",
  "status": "creating",
  "created_at": "2023-08-20T10:15:00Z",
  "updated_at": "2023-08-20T10:15:00Z",
  "region": "us-east-1",
  "url": "my-new-app.dockapi.manavkhadka.com.np"
}`
        },
        {
          method: 'DELETE',
          path: '/api/v1/applications/{id}',
          description: 'Delete an application',
          requestExample: '',
          responseExample: `{
  "success": true,
  "message": "Application deleted successfully"
}`
        }
      ]
    },
    {
      id: 'deployments',
      name: 'Deployments',
      description: 'Manage application deployments.',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/applications/{app_id}/deployments',
          description: 'List deployments for an application',
          requestExample: '',
          responseExample: `{
  "deployments": [
    {
      "id": "dep_1234567890",
      "application_id": "app_1234567890",
      "status": "successful",
      "created_at": "2023-08-15T14:30:00Z",
      "completed_at": "2023-08-15T14:35:00Z",
      "commit_sha": "a1b2c3d4e5f6",
      "commit_message": "Add new feature",
      "branch": "main"
    },
    {
      "id": "dep_0987654321",
      "application_id": "app_1234567890",
      "status": "failed",
      "created_at": "2023-08-14T10:15:00Z",
      "completed_at": "2023-08-14T10:17:00Z",
      "commit_sha": "f6e5d4c3b2a1",
      "commit_message": "Fix bug in API",
      "branch": "main",
      "error": "Build failed: npm install error"
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}`
        },
        {
          method: 'POST',
          path: '/api/v1/applications/{app_id}/deployments',
          description: 'Create a new deployment',
          requestExample: `{
  "branch": "main",
  "commit_sha": "a1b2c3d4e5f6" // Optional
}`,
          responseExample: `{
  "id": "dep_3579246801",
  "application_id": "app_1234567890",
  "status": "in_progress",
  "created_at": "2023-08-20T15:45:00Z",
  "branch": "main"
}`
        },
        {
          method: 'GET',
          path: '/api/v1/applications/{app_id}/deployments/{deployment_id}/logs',
          description: 'Get deployment logs',
          requestExample: '',
          responseExample: `{
  "logs": [
    {
      "timestamp": "2023-08-20T15:45:10Z",
      "message": "Cloning repository...",
      "level": "info"
    },
    {
      "timestamp": "2023-08-20T15:45:15Z",
      "message": "Installing dependencies...",
      "level": "info"
    },
    {
      "timestamp": "2023-08-20T15:45:30Z",
      "message": "Running build script...",
      "level": "info"
    },
    {
      "timestamp": "2023-08-20T15:46:00Z",
      "message": "Build completed successfully",
      "level": "info"
    },
    {
      "timestamp": "2023-08-20T15:46:05Z",
      "message": "Starting application...",
      "level": "info"
    },
    {
      "timestamp": "2023-08-20T15:46:10Z",
      "message": "Deployment completed successfully",
      "level": "info"
    }
  ]
}`
        }
      ]
    },
    {
      id: 'environment',
      name: 'Environment Variables',
      description: 'Manage environment variables for your applications.',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/applications/{app_id}/env-vars',
          description: 'List environment variables',
          requestExample: '',
          responseExample: `{
  "variables": [
    {
      "key": "NODE_ENV",
      "value": "production",
      "is_secret": false
    },
    {
      "key": "API_KEY",
      "value": "[REDACTED]",
      "is_secret": true
    },
    {
      "key": "DATABASE_URL",
      "value": "[REDACTED]",
      "is_secret": true
    }
  ]
}`
        },
        {
          method: 'POST',
          path: '/api/v1/applications/{app_id}/env-vars',
          description: 'Create or update environment variables',
          requestExample: `{
  "variables": [
    {
      "key": "NODE_ENV",
      "value": "production",
      "is_secret": false
    },
    {
      "key": "API_KEY",
      "value": "secret-api-key",
      "is_secret": true
    }
  ]
}`,
          responseExample: `{
  "success": true,
  "updated": 2
}`
        },
        {
          method: 'DELETE',
          path: '/api/v1/applications/{app_id}/env-vars/{key}',
          description: 'Delete an environment variable',
          requestExample: '',
          responseExample: `{
  "success": true,
  "message": "Environment variable deleted successfully"
}`
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-12 max-w-7xl">
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
          <h1 className="text-4xl font-bold tracking-tight mb-4">API Reference</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive documentation for the DockAPI REST API. Use our API to programmatically manage your deployments.
          </p>
        </div>

        {/* API Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="prose max-w-none">
            <p>
              The DockAPI API is organized around REST. Our API has predictable resource-oriented URLs, 
              accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP 
              response codes, authentication, and verbs.
            </p>
            
            <h3>Base URL</h3>
            <pre className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
              <code>https://api.dockapi.manavkhadka.com.np/api/v1</code>
            </pre>
            
            <h3>Authentication</h3>
            <p>
              The DockAPI API uses API keys to authenticate requests. You can view and manage your API keys 
              in the DockAPI Dashboard.
            </p>
            <p>
              Authentication to the API is performed via HTTP Bearer Auth. Provide your API key as the bearer token value.
            </p>
            <pre className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
              <code>Authorization: Bearer your_api_key</code>
            </pre>
            
            <h3>Response Codes</h3>
            <p>The DockAPI API uses conventional HTTP response codes to indicate the success or failure of an API request.</p>
            <ul>
              <li><code>200 OK</code> - Everything worked as expected.</li>
              <li><code>201 Created</code> - Resource was successfully created.</li>
              <li><code>400 Bad Request</code> - The request was unacceptable, often due to missing a required parameter.</li>
              <li><code>401 Unauthorized</code> - No valid API key provided.</li>
              <li><code>403 Forbidden</code> - The API key doesn't have permissions to perform the request.</li>
              <li><code>404 Not Found</code> - The requested resource doesn't exist.</li>
              <li><code>429 Too Many Requests</code> - Too many requests hit the API too quickly.</li>
              <li><code>500, 502, 503, 504 Server Errors</code> - Something went wrong on DockAPI's end.</li>
            </ul>
          </div>
        </div>

        {/* API Endpoints */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">API Endpoints</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-20">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Endpoints</h3>
                <nav className="space-y-1">
                  {apiEndpoints.map((section) => (
                    <a 
                      key={section.id}
                      href={`#${section.id}`}
                      className="block px-3 py-2 rounded-md text-sm hover:bg-slate-50"
                    >
                      {section.name}
                    </a>
                  ))}
                </nav>
                
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a 
                      href="https://github.com/manavkhadka/dockapi/blob/main/API.md" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Full API Docs
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* API Documentation */}
            <div className="md:col-span-3 space-y-12">
              {apiEndpoints.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-2xl font-semibold mb-3">{section.name}</h2>
                  <p className="text-muted-foreground mb-6">{section.description}</p>
                  
                  <div className="space-y-8">
                    {section.endpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium mr-2
                                  ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                                    endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 
                                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : 
                                    endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 
                                    'bg-gray-100 text-gray-800'}`}
                                >
                                  {endpoint.method}
                                </span>
                                <code className="text-sm font-mono">{endpoint.path}</code>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{endpoint.description}</p>
                            </div>
                            <button 
                              className="text-muted-foreground hover:text-foreground"
                              aria-label="Copy endpoint"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <Tabs defaultValue={endpoint.requestExample ? "request" : "response"}>
                            <TabsList>
                              {endpoint.requestExample && (
                                <TabsTrigger value="request">Request</TabsTrigger>
                              )}
                              <TabsTrigger value="response">Response</TabsTrigger>
                            </TabsList>
                            
                            {endpoint.requestExample && (
                              <TabsContent value="request" className="mt-2">
                                <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                                  <pre><code>{endpoint.requestExample}</code></pre>
                                </div>
                              </TabsContent>
                            )}
                            
                            <TabsContent value="response" className="mt-2">
                              <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                                <pre><code>{endpoint.responseExample}</code></pre>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* SDK Links */}
        <div className="mt-16 bg-slate-50 border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Client Libraries</h2>
          <p className="text-muted-foreground mb-6">
            Use our official client libraries to integrate DockAPI into your applications.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a 
              href="https://github.com/manavkhadka/dockapi-js" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">JavaScript/TypeScript</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Official JavaScript client for Node.js and browser environments.
              </p>
              <div className="text-sm font-medium text-blue-600 flex items-center">
                View on GitHub <ExternalLink className="ml-1 h-3 w-3" />
              </div>
            </a>
            
            <a 
              href="https://github.com/manavkhadka/dockapi-python" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">Python</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Official Python client library for DockAPI.
              </p>
              <div className="text-sm font-medium text-blue-600 flex items-center">
                View on GitHub <ExternalLink className="ml-1 h-3 w-3" />
              </div>
            </a>
            
            <a 
              href="https://github.com/manavkhadka/dockapi-go" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">Go</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Official Go client library for DockAPI.
              </p>
              <div className="text-sm font-medium text-blue-600 flex items-center">
                View on GitHub <ExternalLink className="ml-1 h-3 w-3" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
} 