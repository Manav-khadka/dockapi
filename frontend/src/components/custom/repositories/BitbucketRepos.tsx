"use client";
import React, { useState, useEffect } from 'react';
import { Search, Star, GitFork, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaBitbucket } from 'react-icons/fa';
import DeploymentModal from '../deployement/DeploymentModal';

// Fallback dummy data if API fails
const dummyRepos = [
  {
    id: 1,
    name: 'dockapi-bitbucket',
    description: 'Bitbucket version of our AI-powered cloud platform for Docker-based projects.',
    private: false,
    updatedAt: '2023-07-15',
    stars: 64,
    forks: 27,
    language: 'TypeScript'
  },
  {
    id: 2,
    name: 'ci-cd-pipelines',
    description: 'CI/CD pipeline configurations and templates for Bitbucket Pipelines.',
    private: false,
    updatedAt: '2023-08-23',
    stars: 87,
    forks: 41,
    language: 'YAML'
  },
  {
    id: 3,
    name: 'deployment-scripts',
    description: 'Deployment scripts and automation tools for various environments.',
    private: true, 
    updatedAt: '2023-09-19',
    stars: 12,
    forks: 5,
    language: 'Shell'
  },
  {
    id: 4,
    name: 'backend-services',
    description: 'Collection of backend microservices with Docker setup.',
    private: false,
    updatedAt: '2023-10-08',
    stars: 49,
    forks: 18,
    language: 'Python'
  }
];

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  YAML: 'bg-purple-500',
  Shell: 'bg-green-600',
  Python: 'bg-green-500',
  JavaScript: 'bg-yellow-400',
  Java: 'bg-orange-600',
  PHP: 'bg-indigo-500',
};

interface Repository {
  id: number;
  name: string;
  description: string;
  private: boolean;
  updatedAt: string;
  stars: number;
  forks: number;
  language: string;
}

export default function BitbucketRepos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for deployment modal
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);
  const [deployingRepo, setDeployingRepo] = useState<Repository | null>(null);

  useEffect(() => {
    async function fetchBitbucketRepos() {
      setLoading(true);
      setError(null);
      
      try {
        // Attempt to fetch from your API
        const response = await fetch('/api/bitbucket/repositories', { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error('Failed to fetch Bitbucket repositories:', err);
        setError('Could not fetch repositories from Bitbucket. Using sample data instead.');
        
        // Fallback to dummy data
        setRepos(dummyRepos);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBitbucketRepos();
  }, []);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeployClick = () => {
    if (selectedRepo !== null) {
      const repoToDeploy = repos.find(repo => repo.id === selectedRepo);
      if (repoToDeploy) {
        setDeployingRepo(repoToDeploy);
        setIsDeploymentModalOpen(true);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Error message if API fails */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Fetching repositories...</p>
        </div>
      ) : (
        <>
          {/* Repositories List */}
          <div className="space-y-4">
            {filteredRepos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No repositories found matching &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className={`border rounded-xl p-5 transition-all hover:border-blue-300 cursor-pointer ${
                    selectedRepo === repo.id ? 'ring-2 ring-blue-400 border-blue-400' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedRepo(repo.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <FaBitbucket className="h-5 w-5 mr-2 text-blue-400" />
                        <h2 className="text-lg font-semibold text-foreground">{repo.name}</h2>
                        {repo.private && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 text-sm mt-2 line-clamp-2">{repo.description || 'No description'}</p>
                      
                      <div className="flex flex-wrap items-center mt-4 text-sm text-foreground/60">
                        {repo.language && (
                          <div className="flex items-center mr-4 mb-1">
                            <span className={`inline-block w-3 h-3 rounded-full mr-1 ${languageColors[repo.language] || 'bg-gray-400'}`}></span>
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center mr-4 mb-1">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <GitFork className="h-4 w-4 mr-1" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-foreground/50">
                      Updated {repo.updatedAt}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <Button 
              className="px-6 bg-blue-400 hover:bg-blue-500" 
              disabled={selectedRepo === null}
              onClick={handleDeployClick}
            >
              Deploy Project
            </Button>
          </div>
        </>
      )}
      
      {/* Deployment Modal */}
      {isDeploymentModalOpen && deployingRepo && (
        <DeploymentModal 
          repository={deployingRepo}
          onClose={() => {
            setIsDeploymentModalOpen(false);
            setDeployingRepo(null);
          }}
        />
      )}
    </div>
  );
} 