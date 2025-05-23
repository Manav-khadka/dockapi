"use client";
import React, { useState } from 'react';
import { X, Server, Database, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Repository {
  id: number;
  name: string;
  description?: string;
}

interface DeploymentModalProps {
  repository: Repository;
  onClose: () => void;
}

type DeploymentStep = 'config' | 'deploying' | 'complete' | 'error';

export default function DeploymentModal({ repository, onClose }: DeploymentModalProps) {
  const [step, setStep] = useState<DeploymentStep>('config');
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [progress, setProgress] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    environment: 'production',
    region: 'us-east-1',
    instanceType: 'standard',
    autoScale: false,
    envVars: [{ key: 'PORT', value: '8080' }]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleEnvVarChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedEnvVars = [...formData.envVars];
    updatedEnvVars[index][field] = value;
    setFormData({ ...formData, envVars: updatedEnvVars });
  };

  const addEnvVar = () => {
    setFormData({
      ...formData,
      envVars: [...formData.envVars, { key: '', value: '' }]
    });
  };

  const removeEnvVar = (index: number) => {
    const updatedEnvVars = formData.envVars.filter((_, i) => i !== index);
    setFormData({ ...formData, envVars: updatedEnvVars });
  };

  const simulateDeployment = () => {
    setStep('deploying');
    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);
    
    // Simulate deployment completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);
      
      // 95% chance of success, 5% chance of error
      if (Math.random() > 0.05) {
        setDeploymentUrl(`${repository.name.toLowerCase()}.dockapi.manavkhadka.com.np`);
        setStep('complete');
      } else {
        setStep('error');
      }
    }, 8000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Deploy {repository.name}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {step === 'config' && (
            <>
              <p className="text-foreground/70 mb-6">
                Configure your deployment settings for {repository.name}.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Environment</label>
                    <select 
                      name="environment"
                      value={formData.environment}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Region</label>
                    <select 
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-1">US West (N. California)</option>
                      <option value="eu-west-1">EU (Ireland)</option>
                      <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Instance Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['standard', 'performance', 'memory'].map((type) => (
                      <label 
                        key={type}
                        className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition ${
                          formData.instanceType === type ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="instanceType"
                          value={type}
                          checked={formData.instanceType === type}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="mb-2">
                          {type === 'standard' && <Server size={20} />}
                          {type === 'performance' && <Server size={20} />}
                          {type === 'memory' && <Database size={20} />}
                        </div>
                        <div className="text-sm font-medium capitalize">{type}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {type === 'standard' && '1 CPU, 1 GB RAM'}
                          {type === 'performance' && '2 CPU, 2 GB RAM'}
                          {type === 'memory' && '2 CPU, 4 GB RAM'}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="autoScale"
                      checked={formData.autoScale}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Enable auto-scaling</span>
                  </label>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Environment Variables</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addEnvVar}
                      type="button"
                    >
                      Add Variable
                    </Button>
                  </div>
                  
                  {formData.envVars.map((envVar, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={envVar.key}
                        onChange={(e) => handleEnvVarChange(index, 'key', e.target.value)}
                        placeholder="KEY"
                        className="w-1/3 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        value={envVar.value}
                        onChange={(e) => handleEnvVarChange(index, 'value', e.target.value)}
                        placeholder="value"
                        className="flex-1 p-2 border rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEnvVar(index)}
                        type="button"
                        disabled={formData.envVars.length <= 1}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={simulateDeployment}
                >
                  Deploy
                </Button>
              </div>
            </>
          )}
          
          {step === 'deploying' && (
            <div className="py-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
                    style={{ 
                      transform: 'rotate(0deg)',
                      animation: 'spin 1s linear infinite'
                    }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Deploying {repository.name}</h3>
                <p className="text-foreground/70 mb-6">This might take a few minutes...</p>
                
                <div className="w-full max-w-md mb-4">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-foreground/60 mt-1">
                    {Math.round(progress)}%
                  </div>
                </div>
                
                <div className="w-full max-w-md text-left text-sm">
                  <div className="mb-1">
                    ✓ Pulling repository
                  </div>
                  <div className="mb-1">
                    ✓ Installing dependencies
                  </div>
                  <div className="mb-1">
                    {progress > 40 ? '✓' : '⟳'} Building application
                  </div>
                  <div className="mb-1 text-foreground/60">
                    {progress > 70 ? '✓' : progress > 50 ? '⟳' : '•'} Configuring environment
                  </div>
                  <div className="mb-1 text-foreground/60">
                    {progress > 90 ? '✓' : progress > 80 ? '⟳' : '•'} Starting deployment
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 'complete' && (
            <div className="py-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deployment Successful!</h3>
                <p className="text-foreground/70 mb-6">
                  Your application has been successfully deployed.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6 w-full max-w-md">
                  <p className="text-sm text-foreground/70 mb-1">Your deployment is available at:</p>
                  <a 
                    href={`https://${deploymentUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium text-lg"
                  >
                    https://{deploymentUrl}
                  </a>
                </div>
                
                <div className="flex">
                  <Button onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {step === 'error' && (
            <div className="py-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deployment Failed</h3>
                <p className="text-foreground/70 mb-6">
                  We encountered an error while deploying your application.
                </p>
                
                <div className="bg-red-50 border border-red-100 p-4 rounded-md mb-6 text-left w-full max-w-md">
                  <p className="text-sm font-medium text-red-800">Error details:</p>
                  <p className="text-sm text-red-700 mt-1">
                    Failed to initialize container environment. Please check your configuration and try again.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep('config')}
                  >
                    Try Again
                  </Button>
                  <Button 
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 