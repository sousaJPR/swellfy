// Função para calcular juros compostos com aportes mensais
export const calculateCompoundInterest = (initialCapital, monthlyContribution, annualRate, years) => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    // Fórmula: Valor Final = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
    const finalValue = initialCapital * Math.pow(1 + monthlyRate, months) +
        monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    return finalValue;
};

// Função para Custo de Oportunidade simples
export const calculateOpportunityCost = (value, rateA, rateB, years) => {
    const resultA = calculateCompoundInterest(value, 0, rateA, years);
    const resultB = calculateCompoundInterest(value, 0, rateB, years);
    return resultB - resultA;
};