const getDayName = (dayCode: number): string => {
    switch (dayCode) {
        case 1:
            return "Segunda-feira";
        case 2:
            return "Terça-feira";
        case 3:
            return "Quarta-feira";
        case 4:
            return "Quinta-feira";
        case 5:
            return "Sexta-feira";
        default:
            return "";
    }
};

export { getDayName }