"use client";

import { useState } from "react";
import Container from "@/components/common/container/container";
import MoneyExchangeHero from "./money-exchange-hero";
import CurrencyConverterCard from "./currency-converter-card";
import LiveRatesTable from "./live-rates-table";
import ExchangeBenefits from "./exchange-benefits";
import ExchangeFaq from "./exchange-faq";

export default function MoneyExchange() {
  const [selectedFrom, setSelectedFrom] = useState("USD");
  const [selectedTo, setSelectedTo] = useState("BDT");

  const handleSelectCurrency = (currencyCode) => {
    // If user clicks a foreign currency from the rate ticker or table, set it as source and BDT as target
    setSelectedFrom(currencyCode);
    setSelectedTo("BDT");
  };

  return (
    <section className="bg-surface min-h-screen">
      {/* 1. Hero with dynamic live rate row / ticker */}
      <MoneyExchangeHero onSelectCurrency={handleSelectCurrency} />

      {/* 2. Main Content Container */}
      <Container>
        {/* Interactive Currency Converter & Exchange Request Card */}
        <CurrencyConverterCard
          fromCurrency={selectedFrom}
          toCurrency={selectedTo}
          onFromChange={setSelectedFrom}
          onToChange={setSelectedTo}
        />

        {/* 3. Comprehensive Live Rates Table / Row */}
        <LiveRatesTable onSelectCurrency={handleSelectCurrency} />

        {/* 4. Benefits, How it works, Security Badges */}
        <ExchangeBenefits />

        {/* 5. FAQs */}
        <ExchangeFaq />
      </Container>
    </section>
  );
}
