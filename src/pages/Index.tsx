import { CurrencyConverter } from "@/components/CurrencyConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Exchange
          </h1>
          <p className="text-muted-foreground text-lg">
            Fast, accurate currency conversion at your fingertips
          </p>
        </div>
        
        {/* Main Converter */}
        <div className="flex justify-center">
          <CurrencyConverter />
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Exchange rates are for demonstration purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default Index;