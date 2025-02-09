// infrastructure/platforms/react/src/utils/vinValidator.ts
export const validateTriumphVIN = (vin: string): string | null => {
    if (vin.length !== 17) {
        return "Le VIN doit contenir exactement 17 caractères.";
    }
    if (!vin.startsWith("SMT")) {
        return "Un VIN Triumph doit commencer par 'SMT'.";
    }
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
        return "Le VIN contient des caractères invalides.";
    }
    return null;
};

  
  export const formatVIN = (vin: string): string => {
    return vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
  };