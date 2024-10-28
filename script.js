function calculatePoints() {
    let total = 0;
    const form = document.forms['surveyForm'];
  
    const inputs = form.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');
    inputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
  
    document.getElementById("totalPoints").innerText = total;
    return total;
  }
  
  function getRecommendation(goal, score, preference) {
    const recommendations = {
        melhorarHumor: {
            citricaFlorais: score >= 20 
                ? "Laranja doce + Limão + Bergamota ou Lavanda + Ylang Ylang + Gerânio" 
                : "Lavanda + Laranja doce + Jasmim + Rosa",
            herbaisAmadeiradas: score >= 20 
                ? "Alecrim + Eucalipto + Cedro + Manjerona" 
                : "Sândalo + Cedro + Lavanda + Hortelã-pimenta"
        },
        reduzirEstresse: {
            citricaFlorais: score >= 20 
                ? "Bergamota + Neroli + Ylang Ylang + Lavanda" 
                : "Lavanda + Rosa + Laranja doce + Camomila",
            herbaisAmadeiradas: score >= 20 
                ? "Lavanda + Manjericão + Alecrim ou Cedro + Sândalo" 
                : "Sálvia + Camomila + Cedro + Patchouli"
        },
        aumentarEnergia: {
            citricaFlorais: score >= 20 
                ? "Alecrim + Hortelã-pimenta + Limão + Canela" 
                : "Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim",
            herbaisAmadeiradas: score >= 20 
                ? "Alecrim + Hortelã-pimenta + Limão + Canela" 
                : "Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim"
        },
        melhorarSono: {
            independente: score >= 20 
                ? "Lavanda + Camomila Romana + Neroli ou Cedro + Vetiver + Sândalo"
                : "Lavanda + Camomila + Cedro + Sândalo"
        },
        alivioDores: {
            citricaFlorais: score >= 20 
                ? "Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona" 
                : "Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona",
            herbaisAmadeiradas: score >= 20 
                ? "Alecrim + Eucalipto + Lavanda + Sândalo" 
                : "Alecrim + Eucalipto + Lavanda + Sândalo"
        },
        concentracaoFoco: {
            citricaFlorais: score >= 20 
                ? "Limão + Alecrim + Menta ou Hortelã-pimenta + Alecrim + Sálvia" 
                : "Limão + Bergamota + Eucalipto + Alecrim",
            herbaisAmadeiradas: score >= 20 
                ? "Alecrim + Cedro + Vetiver + Hortelã-pimenta" 
                : "Patchouli + Sândalo + Alecrim + Eucalipto"
        }
    };
  
    // Verifica se existe uma recomendação específica para o objetivo e preferência
    if (recommendations[goal] && recommendations[goal][preference]) {
        return recommendations[goal][preference];
    }
    // Caso especial para objetivos que não dependem de preferências específicas
    if (recommendations[goal] && recommendations[goal].independente) {
        return recommendations[goal].independente;
    }
    return "Nenhuma recomendação específica";
}
 
  function generateRecommendation() {
    const form = document.forms['surveyForm'];
    const goal = form['goal'].value;
    const score = calculatePoints();
  
    const preferences = Array.from(form.querySelectorAll('input[name="aromaPreference"]:checked'))
                             .map(input => input.value);
  
    let preferenceType;
    if (preferences.includes("citricaFlorais")) {
        preferenceType = "citricaFlorais";
    } else if (preferences.includes("herbaisAmadeiradas")) {
        preferenceType = "herbaisAmadeiradas";
    } else {
        preferenceType = "citricaFlorais";
    }
  
    const recommendation = getRecommendation(goal, score, preferenceType);
    document.getElementById("recommendation").innerText = recommendation;
  }