// Simplified version for the project

type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
};

export const toast = ({ title, description, duration = 5000 }: ToastProps) => {
  // In a real implementation, this would update a global toast store
  // This is a simplified version just for our UI to work
  console.log('Toast:', { title, description, duration });
  
  // Return a sample object that would normally control the toast
  return {
    id: Date.now().toString(),
    dismiss: () => console.log('Toast dismissed')
  };
}; 