// Mostrar/ocultar campos de texto com base na seleção da condição de saúde crônica
function toggleInputDisplay(radioName, displayMapping) {
    document.querySelectorAll(`input[name="${radioName}"]`).forEach((elem) => {
        elem.addEventListener('change', function() {
            for (const [value, ids] of Object.entries(displayMapping)) {
                const [showId, hideIds] = ids;
                if (this.value === value) {
                    // Mostrar a caixa de texto correspondente
                    if (showId) {
                        document.getElementById(showId).style.display = "inline-block";
                    }
                    // Ocultar as caixas de texto correspondentes
                    hideIds.forEach(hideId => {
                        document.getElementById(hideId).style.display = "none";
                    });
                } else {
                    // Ocultar as caixas de texto se não forem selecionadas
                    if (hideIds.includes(showId)) {
                        document.getElementById(showId).style.display = "none";
                    }
                }
            }
        });
    });
}

// Inicializando os campos de entrada
toggleInputDisplay('saudeCronica', {
    'uma': ['descricaoUmaCondicao', []],
    'mais': ['descricaoMaisCondicoes', ['descricaoUmaCondicao']],
    'nenhuma': ['', ['descricaoUmaCondicao', 'descricaoMaisCondicoes']]
});

toggleInputDisplay('doresFrequentes', {
    '2': ['', ['descricaoOutrasDores']], // Nenhuma
    '1': ['', ['descricaoOutrasDores']], // Dores de cabeça ou musculares
    'outras': ['descricaoOutrasDores', []] // Outras
});

// Função de cálculo atualizada para pegar as condições crônicas detalhadas
function calcularRecomendacao() {
    const resultadoElemento = document.getElementById("resultado");

    // Obter as respostas
    const rotina = document.querySelector('input[name="rotina"]:checked')?.value;
    const atividadesFisicas = document.querySelector('input[name="atividadesFisicas"]:checked')?.value;
    const horasSono = document.querySelector('input[name="horasSono"]:checked')?.value;
    const ambienteEstressante = document.querySelector('input[name="ambienteEstressante"]:checked')?.value;
    const saudeCronica = document.querySelector('input[name="saudeCronica"]:checked')?.value;
    const descricaoUmaCondicao = document.getElementById("descricaoUmaCondicao").value;
    const descricaoMaisCondicoes = document.getElementById("descricaoMaisCondicoes").value;
    const doresFrequentes = document.querySelector('input[name="doresFrequentes"]:checked')?.value;
    const nivelEstresse = document.querySelector('input[name="nivelEstresse"]:checked')?.value;
    const problemasDormir = document.querySelector('input[name="problemasDormir"]:checked')?.value;
    const cansaco = document.querySelector('input[name="cansaco"]:checked')?.value;
    const preferenciaAroma = document.querySelector('input[name="preferenciaAroma"]:checked')?.value;
    const objetivoPrincipal = document.querySelector('input[name="objetivoPrincipal"]:checked')?.value;

    // Verificar se todas as perguntas foram respondidas
    if (!rotina || !atividadesFisicas || !horasSono || !ambienteEstressante || !saudeCronica ||
        !doresFrequentes || !nivelEstresse || !problemasDormir || !cansaco || !preferenciaAroma ||
        !objetivoPrincipal) {
        resultadoElemento.innerText = "Por favor, responda todas as perguntas!";
        return;
    }

    // Verificar se o usuário informou as condições de saúde crônicas
    if (saudeCronica === "uma" && !descricaoUmaCondicao) {
        resultadoElemento.innerText = "Por favor, descreva sua condição de saúde crônica.";
        return;
    }
    if (saudeCronica === "mais" && !descricaoMaisCondicoes) {
        resultadoElemento.innerText = "Por favor, descreva suas condições de saúde crônicas.";
        return;
    }

    let recomendacao = "";

    // Regras para as recomendações
    switch (objetivoPrincipal) {
        case "humor":
            if (preferenciaAroma === "citricos_florais") {
                recomendacao = nivelEstresse <= 1 ? 
                    "Laranja doce + Limão + Bergamota ou Lavanda + Ylang Ylang + Gerânio" :
                    "Lavanda + Laranja doce + Jasmim + Rosa";
            } else {
                recomendacao = nivelEstresse <= 1 ? 
                    "Alecrim + Eucalipto + Cedro + Manjerona" :
                    "Sândalo + Cedro + Lavanda + Hortelã-pimenta";
            }
            break;

        case "estresse":
            if (preferenciaAroma === "citricos_florais") {
                recomendacao = nivelEstresse <= 1 ? 
                    "Bergamota + Neroli + Ylang Ylang + Lavanda" :
                    "Lavanda + Rosa + Laranja doce + Camomila";
            } else {
                recomendacao = nivelEstresse <= 1 ? 
                    "Lavanda + Manjericão + Alecrim ou Cedro + Sândalo + Vetiver" :
                    "Cedro + Sândalo + Patchouli + Lavanda";
            }
            break;

        case "energia":
            if (cansaco === "0") {
                recomendacao = preferenciaAroma === "citricos_florais" || preferenciaAroma === "herbais_amadeirados" ? 
                    "Toranja + Limão Siciliano + Tangerina ou Hortelã-pimenta + Eucalipto + Alecrim" :
                    "Alecrim + Hortelã-pimenta + Limão + Canela";
            } else {
                recomendacao = "Alecrim + Hortelã-pimenta + Limão + Canela";
            }
            break;

        case "concentracao":
            if (preferenciaAroma === "citricos_florais") {
                recomendacao = nivelEstresse <= 1 ? 
                    "Limão + Alecrim + Menta ou Hortelã-pimenta + Alecrim + Sálvia" :
                    "Limão + Bergamota + Eucalipto + Alecrim";
            } else {
                recomendacao = nivelEstresse <= 1 ? 
                    "Alecrim + Cedro + Vetiver + Hortelã-pimenta" :
                    "Patchouli + Sândalo + Alecrim + Eucalipto";
            }
            break;

        case "sono":
            recomendacao = problemasDormir === "0" ? 
                "Lavanda + Camomila + Cedro + Sândalo" :
                "Lavanda + Camomila Romana + Neroli ou Cedro + Vetiver + Sândalo";
            break;

        case "dores":
            if (doresFrequentes === "1") {
                recomendacao = preferenciaAroma === "citricos_florais" ? 
                    "Eucalipto + Hortelã-pimenta + Gengibre ou Lavanda + Alecrim + Manjerona" :
                    "Alecrim + Eucalipto + Lavanda + Sândalo";
            }
            break;

        default:
            recomendacao = "Nenhuma recomendação disponível.";
            break;
    }

    // Exibir o resultado
    resultadoElemento.innerHTML = `Recomendação: ${recomendacao}<br>`;
}
