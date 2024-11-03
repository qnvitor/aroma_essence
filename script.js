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
                ? 'Laranja doce + Limão + Bergamota ou Lavanda + Ylang Ylang + Gerânio</a>' 
                : 'Lavanda + Laranja doce + Jasmim + Rosa</a>',
            herbaisAmadeiradas: score >= 20 
                ? 'Alecrim + Eucalipto + Cedro + Manjerona</a>' 
                : 'Sândalo + Cedro + Lavanda + Hortelã-pimenta</a>'
        },
        reduzirEstresse: {
            citricaFlorais: score >= 20 
                ? 'Bergamota + Neroli + Ylang Ylang + Lavanda</a>' 
                : 'Lavanda + Rosa + Laranja doce + Camomila</a>',
            herbaisAmadeiradas: score >= 20 
                ? 'Lavanda + Manjericão + Alecrim ou Cedro + Sândalo + Vetiver</a>' 
                : 'Cedro + Sândalo + Patchouli + Lavanda</a>'
        },
        aumentarEnergia: {
            citricaFlorais: score >= 20 
                ? 'Alecrim + Hortelã-pimenta + Limão + Canela</a>' 
                : 'Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim</a>',
            herbaisAmadeiradas: score >= 20 
                ? 'Alecrim + Hortelã-pimenta + Limão + Canela</a>' 
                : 'Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim</a>'
        },
        melhorarSono: {
            independente: score >= 20 
                ? 'Lavanda + Camomila Romana + Neroli ou Cedro + Vetiver + Sândalo</a>'
                : 'Lavanda + Camomila + Cedro + Sândalo</a>'
        },
        alivioDores: {
            citricaFlorais: score >= 20 
                ? 'Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona</a>' 
                : 'Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona</a>',
            herbaisAmadeiradas: score >= 20 
                ? 'Alecrim + Eucalipto + Lavanda + Sândalo</a>' 
                : 'Alecrim + Eucalipto + Lavanda + Sândalo</a>'
        },
        concentracaoFoco: {
            citricaFlorais: score >= 20 
                ? 'Limão + Alecrim + Menta ou Hortelã-pimenta + Alecrim + Sálvia</a>' 
                : 'Limão + Bergamota + Eucalipto + Alecrim</a>',
            herbaisAmadeiradas: score >= 20 
                ? 'Alecrim + Cedro + Vetiver + Hortelã-pimenta</a>' 
                : 'Patchouli + Sândalo + Alecrim + Eucalipto</a>'
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
        preferenceType = "citricaFlorais"; // Default preference
    }

    const recommendation = getRecommendation(goal, score, preferenceType);

    // Armazena a recomendação no localStorage
    localStorage.setItem("recommendation", recommendation);

    // Redireciona para a página fixa de recomendação
    window.location.href = 'saida_aromas_fixo.html';
}

// Recupera a recomendação armazenada no localStorage
const recommendation = localStorage.getItem("recommendation");

// Exibe a recomendação na div 'bolha-grande-1'
if (recommendation) {
    document.getElementById("recommendationContainer").innerHTML = recommendation;
}

// Limpa o localStorage para que a recomendação não persista em visitas futuras
localStorage.removeItem("recommendation");
