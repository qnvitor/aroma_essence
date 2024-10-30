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
                ? '<a href="saida_aroma_01.html">Laranja doce + Limão + Bergamota ou Lavanda + Ylang Ylang + Gerânio</a>' 
                : '<a href="saida_aroma_02.html">Lavanda + Laranja doce + Jasmim + Rosa</a>',
            herbaisAmadeiradas: score >= 20 
                ? '<a href="saida_aroma_03.html">Alecrim + Eucalipto + Cedro + Manjerona</a>' 
                : '<a href="saida_aroma_04.html">Sândalo + Cedro + Lavanda + Hortelã-pimenta</a>'
        },
        reduzirEstresse: {
            citricaFlorais: score >= 20 
                ? '<a href="saida_aroma_05.html">Bergamota + Neroli + Ylang Ylang + Lavanda</a>' 
                : '<a href="saida_aroma_06.html">Lavanda + Rosa + Laranja doce + Camomila</a>',
            herbaisAmadeiradas: score >= 20 
                ? '<a href="saida_aroma_07.html">Lavanda + Manjericão + Alecrim ou Cedro + Sândalo + Vetiver</a>' 
                : '<a href="saida_aroma_08.html">Cedro + Sândalo + Patchouli + Lavanda</a>'
        },
        aumentarEnergia: {
            citricaFlorais: score >= 20 
                ? '<a href="saida_aroma_10.html">Alecrim + Hortelã-pimenta + Limão + Canela</a>' 
                : '<a href="saida_aroma_09.html">Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim</a>',
            herbaisAmadeiradas: score >= 20 
                ? '<a href="saida_aroma_10.html">Alecrim + Hortelã-pimenta + Limão + Canela</a>' 
                : '<a href="saida_aroma_09.html">Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim</a>'
        },
        melhorarSono: {
            independente: score >= 20 
                ? '<a href="saida_aroma_12.html">Lavanda + Camomila Romana + Neroli ou Cedro + Vetiver + Sândalo</a>'
                : '<a href="saida_aroma_11.html">Lavanda + Camomila + Cedro + Sândalo</a>'
        },
        alivioDores: {
            citricaFlorais: score >= 20 
                ? '<a href="saida_aroma_13.html">Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona</a>' 
                : '<a href="saida_aroma_13.html">Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona</a>',
            herbaisAmadeiradas: score >= 20 
                ? '<a href="saida_aroma_14.html">Alecrim + Eucalipto + Lavanda + Sândalo</a>' 
                : '<a href="saida_aroma_14.html">Alecrim + Eucalipto + Lavanda + Sândalo</a>'
        },
        concentracaoFoco: {
            citricaFlorais: score >= 20 
                ? '<a href="saida_aroma_15.html">Limão + Alecrim + Menta ou Hortelã-pimenta + Alecrim + Sálvia</a>' 
                : '<a href="saida_aroma_16.html">Limão + Bergamota + Eucalipto + Alecrim</a>',
            herbaisAmadeiradas: score >= 20 
                ? '<a href="saida_aroma_17.html">Alecrim + Cedro + Vetiver + Hortelã-pimenta</a>' 
                : '<a href="saida_aroma_18.html">Patchouli + Sândalo + Alecrim + Eucalipto</a>'
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
    
    // Redireciona para a página da recomendação
    if (recommendation.includes('href="')) {
        const urlMatch = recommendation.match(/href="([^"]+)"/);
        if (urlMatch) {
            window.location.href = urlMatch[1]; // Redireciona para a URL encontrada
        }
    } else {
        alert("Nenhuma recomendação específica encontrada.");
    }
}
