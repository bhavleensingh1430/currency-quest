import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, TrendingUp } from "lucide-react";

// Mock exchange rates - in a real app, you'd fetch from an API
const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.5,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  BRL: 5.2,
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  const convertCurrency = (value: string) => {
    if (!value || isNaN(Number(value))) {
      setConvertedAmount("");
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const result = (Number(value) / fromRate) * toRate;
    
    setConvertedAmount(result.toFixed(2));
  };

  useEffect(() => {
    convertCurrency(amount);
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const swapCurrencies = () => {
    setIsSwapping(true);
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    
    // Also swap the amounts
    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
    
    setTimeout(() => setIsSwapping(false), 500);
  };

  const getExchangeRate = () => {
    if (!amount || !convertedAmount) return null;
    const rate = Number(convertedAmount) / Number(amount);
    return rate.toFixed(4);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  return (
    <div className="w-full max-w-md mx-auto animate-slide-up">
      <Card className="shadow-card border-0 bg-gradient-surface">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Currency Converter
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Convert between currencies instantly
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* From Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">From</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="text-lg font-semibold shadow-input border-border/50 focus:border-primary"
                />
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-24 shadow-input border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {fromCurrencyData && (
              <p className="text-sm text-muted-foreground">
                {fromCurrencyData.symbol} {fromCurrencyData.name}
              </p>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="swap"
              size="icon"
              onClick={swapCurrencies}
              className={isSwapping ? "animate-swap" : ""}
              disabled={isSwapping}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={convertedAmount}
                  readOnly
                  className="text-lg font-semibold bg-secondary/50 shadow-input border-border/50"
                />
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-24 shadow-input border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {toCurrencyData && (
              <p className="text-sm text-muted-foreground">
                {toCurrencyData.symbol} {toCurrencyData.name}
              </p>
            )}
          </div>

          {/* Exchange Rate Info */}
          {getExchangeRate() && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-foreground">
                  1 {fromCurrency} = {getExchangeRate()} {toCurrency}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};