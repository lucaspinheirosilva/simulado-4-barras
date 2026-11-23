const bank = [];
const sources = {
 edital: 'https://www.consulpam.com.br/index.php?menu=concursos&acao=ver&id=887',
 analista: 'https://www.consulpam.com.br/arquivos/20260713_171225_012-%20ANALISTA%20DE%20LICITA%C3%87%C3%95ES%20E%20CONTRATOS%20-%20PROVA%2001.pdf',
 compras: 'https://www.consulpam.com.br/arquivos/20260713_173501_046-%20T%C3%89CNICO%20DE%20COMPRAS%20-%20PROVA%2001.pdf',
 regimento: 'https://sapl.quatrobarras.pr.leg.br/media/sapl/public/materialegislativa/2022/217/resolucao_10_2022_-_novo_regimento_interno.pdf',
 cf: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
 lei: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm',
 fin: 'https://www.planalto.gov.br/ccivil_03/leis/l4320compilado.htm',
 lrf: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm',
 tecnica: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp95.htm',
 redacao: 'https://www.comunicacao.pr.gov.br/Pagina/Manual-de-Redacao-Oficial-do-Estado-do-Parana'
};
const add = (block, topic, family, question, options, explanation, source='', origin='Questão inédita') =>
  bank.push({id:bank.length+1,block,topic,family,question,options,correct:options[0],explanation,source,origin});
const words = s => s.trim().split('\n').map(line => line.trim().split('|'));
const shift = (arr,i) => [...arr.slice(i),...arr.slice(0,i)];
const labels = {p:'Língua Portuguesa',g:'Conhecimentos Gerais',e:'Conhecimentos Específicos'};
const contexts = words(`
secretária|secretárias|relatório|relatórios|redigiu|redigiram
assessora|assessoras|parecer|pareceres|revisou|revisaram
servidora|servidoras|projeto|projetos|conferiu|conferiram
analista|analistas|documento|documentos|enviou|enviaram
coordenadora|coordenadoras|edital|editais|publicou|publicaram
arquivista|arquivistas|ofício|ofícios|catalogou|catalogaram
revisora|revisoras|minuta|minutas|corrigiu|corrigiram
conselheira|conselheiras|requerimento|requerimentos|recebeu|receberam
gestora|gestoras|memorando|memorandos|assinou|assinaram
técnica|técnicas|processo|processos|autuou|autuaram
estagiária|estagiárias|anexo|anexos|digitalizou|digitalizaram
auditora|auditoras|balancete|balancetes|verificou|verificaram
redatora|redatoras|texto|textos|preparou|prepararam
colega|colegas|formulário|formulários|preencheu|preencheram
presidente|presidentes|comunicado|comunicados|divulgou|divulgaram
diretora|diretoras|cronograma|cronogramas|atualizou|atualizaram
administradora|administradoras|registro|registros|organizou|organizaram
supervisora|supervisoras|protocolo|protocolos|controlou|controlaram
contadora|contadoras|demonstrativo|demonstrativos|elaborou|elaboraram
bibliotecária|bibliotecárias|volume|volumes|separou|separaram
assistente|assistentes|convite|convites|imprimiu|imprimiram
consultora|consultoras|diagnóstico|diagnósticos|apresentou|apresentaram
relatora|relatoras|voto|votos|fundamentou|fundamentaram
pesquisadora|pesquisadoras|questionário|questionários|aplicou|aplicaram
fiscal|fiscais|contrato|contratos|examinou|examinaram
`);
for (const [i,[s,sp,o,op,v,vp]] of contexts.entries()) {
 const a = i===6 ? 'a' : 'o';
 const p = i===6 ? 'as' : 'os';
 const sentence = `A ${s} ${v} ${a} ${o}.`;
 const addP = (type,q,answers,why) => add('p',type,'Português '+s,q,answers,why);
 addP('Concordância verbal',`Complete: “As ${sp} ___ ${p} ${op} ontem.”`,[vp,v,'havia '+vp,'foi '+vp],`O sujeito “As ${sp}” exige a terceira pessoa do plural.`);
 addP('Sintaxe',`Em “${sentence}”, qual é o sujeito?`,[`A ${s}`,`${a} ${o}`,v,`${v} ${a} ${o}`],`“A ${s}” é o termo sobre o qual se declara a ação.`);
 addP('Classes de palavras',`Em “${sentence}”, qual é a classe de “${o}”?`,['Substantivo','Adjetivo','Verbo','Advérbio'],'A palavra nomeia uma entidade e funciona como núcleo do objeto.');
 addP('Voz verbal',`Qual é o agente da passiva em “${i===6?'A':'O'} ${o} foi ${i===6?'recebida pela':'processado pela'} ${s}”?`,[`pela ${s}`,o,'foi',`foi ${i===6?'recebida':'processado'}`],'O agente da passiva indica quem executa a ação.');
 addP('Crase',`Qual opção completa corretamente “A chefia pediu uma cópia ___ ${s} responsável”?`,['à','a','há','às'],'Pedir algo a alguém exige a preposição a. O substantivo feminino admite o artigo a.');
 addP('Pontuação',`Marque a frase que isola corretamente o vocativo “${s}”.`,[`Por favor, ${s}, confirme o envio.`,`Por favor ${s} confirme, o envio.`,`Por favor ${s} confirme o envio.`,`Por favor, ${s} confirme, o envio.`],'O vocativo intercalado fica isolado por vírgulas.');
 addP('Coesão',`“A ${s} tinha pouco tempo, mas ${v} ${a} ${o}.” Que relação “mas” estabelece?`,['Oposição','Explicação','Conclusão','Alternância'],'A conjunção adversativa assinala contraste entre as duas orações.');
 addP('Inferência',`“A ${s} voltou a conferir ${a} ${o}.” O que a locução “voltou a” pressupõe?`,['Uma conferência anterior.','A anulação do documento.','Uma segunda pessoa na tarefa.','A recusa em conferir.'],'Voltar a fazer algo pressupõe que a ação já havia sido feita.');
 addP('Concordância nominal',`Em “Foram entregues ${p} ${op} ___”, qual forma de “anexo” concorda com o substantivo?`,[i===6?'anexas':'anexos',i===6?'anexos':'anexas','anexo','anexa'],'Como adjetivo, “anexo” concorda em gênero e número com o substantivo.');
 addP('Orações',`“Embora houvesse pouco tempo, a ${s} ${v} ${a} ${o}.” Qual é a relação expressa pela primeira oração?`,['Concessão','Causa','Finalidade','Consequência'],'A oração introduzida por “embora” indica um obstáculo que não impediu a ação.');
}
const num = (v) => String(v).replace('.',',');
const math = [
 ['Juros simples',(n)=>[`Uma aplicação rendeu R$ ${n*40} em 8 meses, à taxa simples de 2,5% ao mês. Qual foi o capital inicial em reais?`,n*200,n*180,n*220,n*240,`Divida os juros por 0,025 × 8. Resultado: R$ ${n*200}.`]],
 ['Porcentagem',(n)=>[`O preço de R$ ${n*100} caiu 15%. Qual é o preço após a redução, em reais?`,85*n,15*n,115*n,90*n,'O valor final corresponde a 85% do original.']],
 ['PA',(n)=>[`Um arquivo recebe ${n} itens no primeiro dia e, a cada dia, 3 a mais que no dia anterior. Quantos recebe no 12º dia?`,n+33,n+36,n+30,n+39,'Use a₁₂ = a₁ + 11 × 3.']],
 ['PG',(n)=>[`Uma sequência começa em ${n} e cada termo é o dobro do anterior. Qual é o quinto termo?`,n*16,n*8,n*32,n*10,'Do primeiro ao quinto termo são quatro duplicações.']],
 ['Análise combinatória',(n)=>[`Há ${n+4} candidatos a uma dupla sem cargos distintos. Quantas duplas podem ser formadas?`,(n+4)*(n+3)/2,(n+4)*(n+3),(n+4)*(n+5)/2,n+4,'Conte os pares ordenados e divida por dois.']],
 ['Geometria plana',(n)=>[`Um quadrado de lado x metros é ampliado em ${n} m em cada lado. Qual é a expressão da nova área?`,`x² + ${2*n}x + ${n*n}`,`x² + ${n*n}`,`x² + ${n}x + ${n*n}`,`x² + ${2*n}x + ${n}`,'Desenvolva o quadrado da soma, incluindo duas vezes o produto entre x e o acréscimo.']],
 ['Probabilidade',(n)=>[`Uma caixa tem ${n} fichas azuis, ${n+2} verdes e 2 brancas. Qual fração representa a chance de tirar uma ficha verde?`,`${n+2}/${2*n+4}`,`${n}/${2*n+4}`,`2/${2*n+4}`,`${n+2}/${2*n+2}`,'Divida a quantidade de fichas verdes pelo total de fichas.']],
 ['Sistemas lineares',(n)=>[`Em um sistema, x + y = ${2*n+4} e x − y = 4. Qual é o valor de x?`,n+4,n,n+2,2*n+4,'Somando as duas equações, o termo y se cancela.']],
 ['Estatística',(n)=>[`Qual é a mediana das observações ${n}, ${n+2}, ${n+4}, ${n+8} e ${n+13}?`,n+4,n+2,n+8,n+13,'Com cinco valores em ordem, a mediana é o terceiro.']],
 ['Regra de três',(n)=>[`Com ritmo constante, ${n} impressoras produzem ${n*120} folhas em 1 hora. Quantas folhas ${n+2} impressoras produzem em 3 horas?`,(n+2)*360,(n+2)*120,n*360,(n+2)*480,'Cada impressora produz 120 folhas por hora. Multiplique pelo número de impressoras e de horas.']]
];
for(const [type,model] of math) for(let n=3;n<13;n++){
 const [q,a,b,c,d,e]=model(n);
 const old=(type==='Juros simples'&&n===5)||(type==='Geometria plana'&&n===4);
 add('g','Matemática e Raciocínio Lógico · '+type,type+' '+n,q,[a,b,c,d].map(num),e,old?'analista':'',old?'Adaptada de prova anterior · Pindorama/SP, 2026':'Questão inédita');
}
function addConcepts(block,topic,source,raw,limit=5){
 const rows=words(raw);
 for(const [i,row] of rows.entries()){
  const [term,definition,example,reference]=row;
  const alternatives=shift(rows,i).slice(1,4);
  if(alternatives.length!==3) throw Error(topic+' exige ao menos quatro conceitos');
  const why=definition+'. '+(reference||'');
  const variants=[
   [`Qual conceito corresponde a esta descrição? ${definition}.`,[term,...alternatives.map(x=>x[0])]],
   [`Em ${topic}, qual opção explica melhor “${term}”?`,[definition,...alternatives.map(x=>x[1])]],
   [`Qual conceito se aplica ao caso a seguir? ${example}`,[term,...alternatives.map(x=>x[0])]],
   [`Qual situação ilustra “${term}”?`,[example,...alternatives.map(x=>x[2])]],
   [`Qual associação está correta no contexto de ${topic}?`,[term+' — '+definition,...alternatives.map((x,j)=>x[0]+' — '+alternatives[(j+1)%3][1])]]
  ];
  for(const [question,options] of variants.slice(0,limit)) add(block,topic,term,question,options,why,source);
 }
}
addConcepts('g','Informática','',`
Algoritmo|Sequência definida de instruções para resolver uma tarefa|Um roteiro computacional descreve, em ordem, como calcular e exibir a média
Variável|Nome associado a um valor manipulável em um programa|O programa atualiza o conteúdo identificado por total a cada parcela somada
Estrutura condicional|Seleção de um caminho conforme um teste lógico|O código imprime aprovado somente se a nota alcançar o mínimo
Laço de repetição|Execução reiterada de um bloco conforme condição ou sequência|O código percorre cada registro de uma lista e o contabiliza
Backup incremental|Cópia das alterações desde o último backup relevante, inclusive incremental|Após a cópia de terça, a rotina de quarta grava somente as mudanças posteriores
Backup completo|Cópia de todos os dados selecionados pela rotina|O procedimento arquiva diariamente a totalidade dos arquivos escolhidos
CSV|Formato textual para dados tabulares delimitados|Uma planilha é exportada como linhas de campos separados por delimitador
DNS|Serviço que resolve nomes de domínio em dados como endereços IP|Antes de se conectar ao servidor, o computador consulta o endereço associado ao nome do site
HTTPS|Protocolo de comunicação web protegido por TLS|O navegador negocia proteção criptográfica para trafegar dados com o servidor web
Firewall|Recurso que filtra tráfego conforme regras de segurança|A rede bloqueia conexões externas a portas que não estão autorizadas
Autenticação|Verificação da identidade apresentada por usuário ou sistema|O serviço valida a identidade usando senha e segundo fator
Autorização|Decisão sobre quais recursos ou operações uma identidade pode acessar|Após o login, o servidor nega a edição a quem só tem permissão de leitura
SaaS|Modelo de nuvem que disponibiliza software pronto para uso|A equipe usa um editor de documentos hospedado sem administrar o aplicativo
IaaS|Modelo que oferece infraestrutura virtualizada|A equipe aluga máquinas virtuais e gerencia nelas o próprio sistema operacional
PaaS|Modelo de nuvem que oferece plataforma gerenciada para desenvolver e implantar aplicações|A equipe publica o código em um ambiente gerenciado sem configurar os servidores
`);
addConcepts('g','Direito Administrativo e Constitucional','cf',`
Legalidade|Princípio que vincula a atuação administrativa ao ordenamento jurídico|O órgão procura a base legal antes de praticar um ato restritivo|CF, art. 37
Impessoalidade|Princípio que afasta favorecimentos pessoais e promoção de autoridades|A campanha institucional informa serviços sem promover o nome do gestor|CF, art. 37
Publicidade|Princípio de transparência e divulgação dos atos, observadas as hipóteses legais de sigilo|O órgão publica o extrato de um ato para possibilitar seu conhecimento público|CF, art. 37
Eficiência|Princípio de busca de bons resultados com uso adequado dos recursos|O órgão reorganiza o fluxo para reduzir retrabalho sem retirar garantias|CF, art. 37
Concurso público|Regra constitucional de seleção para ingresso em cargo ou emprego público, ressalvadas hipóteses constitucionais|Um município aplica prova para ingresso em cargo efetivo|CF, art. 37, II
Cargo em comissão|Cargo de livre nomeação e exoneração destinado às atribuições constitucionalmente previstas|A autoridade nomeia assessor para um cargo legalmente declarado de livre nomeação|CF, art. 37, II e V
Função de confiança|Função exercida exclusivamente por servidor ocupante de cargo efetivo|Uma servidora efetiva é designada para função de chefia sem ocupar novo cargo|CF, art. 37, V
Estabilidade|Garantia adquirida nas condições constitucionais pelo servidor nomeado para cargo efetivo em virtude de concurso|Após três anos de efetivo exercício e avaliação especial, a servidora adquire a garantia|CF, art. 41
Controle externo municipal|Fiscalização do município exercida pelo Legislativo municipal com auxílio do tribunal ou conselho de contas competente|A Câmara realiza fiscalização contábil com auxílio do Tribunal de Contas|CF, art. 31
Direito de petição|Faculdade de dirigir pedido aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso|Uma moradora protocola pedido à autoridade contra um ato abusivo sem pagar taxa|CF, art. 5º, XXXIV
Mandado de segurança|Remédio constitucional voltado a direito líquido e certo fora das hipóteses de habeas corpus ou habeas data|Pessoa impugna ato ilegal de autoridade com prova documental pré-constituída do direito alegado|CF, art. 5º, LXIX
Habeas corpus|Remédio constitucional de proteção à liberdade de locomoção|Pessoa pede tutela judicial contra ameaça ilegal de prisão|CF, art. 5º, LXVIII
Habeas data|Remédio constitucional destinado, entre outras hipóteses, ao conhecimento ou à retificação de informações pessoais em registros públicos ou de caráter público|Pessoa busca retificar dados próprios em banco de caráter público|CF, art. 5º, LXXII
Voto facultativo|Regime eleitoral aplicável, entre outros, a analfabetos e eleitores maiores de 70 anos|Uma pessoa de 75 anos decide se comparecerá à eleição|CF, art. 14, § 1º
Autonomia municipal|Faculdade de auto-organização municipal dentro dos limites constitucionais|A Câmara aprova sua Lei Orgânica na forma exigida pela Constituição|CF, arts. 18 e 29
`);
addConcepts('e','Regimento Interno de Quatro Barras','regimento',`
Comissão de Justiça e Redação|Comissão permanente que examina constitucionalidade, legalidade, regimentalidade e técnica legislativa|Um projeto recebe parecer sobre conformidade constitucional antes de seguir|Regimento, arts. 49 e 51
Comissão de Orçamento e Finanças|Comissão permanente que aprecia matérias orçamentárias e financeiras|Um colegiado permanente analisa a proposta orçamentária anual|Regimento, arts. 49 e 51
Comissão de Políticas Públicas e Administração|Comissão permanente com atuação em políticas públicas e administração municipal|Um projeto de organização administrativa é encaminhado ao colegiado da área|Regimento, arts. 49 e 51
Comissão de Educação, Cultura, Esporte e Lazer, Desenvolvimento Social e Família|Comissão permanente que congrega educação, cultura e desenvolvimento social|Um colegiado permanente analisa uma proposta para incentivar atividades culturais escolares|Regimento, arts. 49 e 51
Comissão de Saúde, Meio Ambiente e Segurança Pública|Comissão permanente voltada às áreas de saúde, meio ambiente e segurança pública|Uma proposta municipal de saúde ambiental chega ao colegiado temático|Regimento, arts. 49 e 51
Comissão Parlamentar de Inquérito|Comissão temporária destinada a apurar fato determinado por prazo certo|Vereadores instauram investigação parlamentar sobre um fato delimitado
Sessão extraordinária|Espécie de sessão fora do rito regular, com data, hora e Ordem do Dia fixadas para a ocasião|A Presidência convoca reunião especial para discutir e votar matéria fora da sessão ordinária, indicando a pauta|Regimento, art. 63
Suspensão da sessão|Interrupção temporária cujo tempo não é computado na duração da sessão|A Presidência interrompe os trabalhos para preservar a ordem e depois retoma a mesma reunião|Regimento, art. 65
Prorrogação da sessão|Extensão da duração mediante deliberação da Câmara, a requerimento verbal de vereador e com presença da maioria absoluta|Antes do fim da reunião, um vereador pede verbalmente mais tempo e a Câmara delibera com o quórum exigido|Regimento, art. 64
Maioria absoluta da comissão|Quórum superior à metade da composição do colegiado, exigido para abrir e deliberar em reunião deliberativa das comissões permanentes|Dos três membros da comissão, dois estão presentes e votam no mesmo sentido|Regimento, art. 50, § 10
`);
addConcepts('e','Processo legislativo','regimento',`
Iniciativa legislativa|Ato que dá início ao processo legislativo ao apresentar uma proposição|O titular competente protocola um projeto para iniciar sua tramitação
Discussão|Fase de debate sobre o mérito ou o texto de uma proposição|Os vereadores defendem posições diferentes antes de votar
Emenda supressiva|Proposta acessória para retirar parte de uma proposição|Uma vereadora propõe eliminar um inciso sem substituir seu conteúdo
Emenda aditiva|Proposta acessória que acrescenta conteúdo a outra proposição|Ao projeto é proposto um parágrafo adicional com regra nova
Emenda de redação|Correção de linguagem ou técnica sem alteração do sentido normativo|A redação é corrigida para eliminar um lapso gramatical, preservado o conteúdo
Destaque|Mecanismo para apreciar de forma separada parte de uma matéria em votação|Pede-se que um dispositivo seja votado à parte do restante do projeto
Sanção expressa|Concordância formal e manifestada pelo chefe do Executivo com o projeto aprovado|O prefeito assina o ato de concordância com o texto aprovado
Veto parcial|Discordância do Executivo que alcança parte admissível do projeto aprovado|O Executivo recusa integralmente um artigo e concorda com o restante
Promulgação|Ato que atesta a existência da lei e determina sua observância|Após a superação de veto, a autoridade competente atesta formalmente a existência da lei
Vacância da lei|Intervalo entre a publicação e o início da vigência quando previsto|A lei foi publicada hoje, mas sua vigência começa em 30 dias
`);
addConcepts('e','Técnica legislativa','tecnica',`
Epígrafe|Identificação inicial da espécie normativa, do número e da data|O cabeçalho identifica a lei pelo tipo, número e data|LC 95/1998, art. 4º
Ementa|Enunciado conciso do objeto do ato normativo|Logo abaixo da epígrafe, uma linha resume a matéria tratada na norma|LC 95/1998, art. 5º
Preâmbulo|Parte que indica o órgão ou instituição competente e a base legal do ato|A abertura indica a autoridade que edita o ato e o fundamento de sua competência|LC 95/1998, art. 6º
Artigo|Unidade básica de articulação do texto legal|Uma regra principal é identificada por Art. 1º no texto|LC 95/1998, art. 10
Parágrafo|Desdobramento que complementa uma regra do artigo ou apresenta exceção|Uma condição complementar ao caput é indicada após o sinal §|LC 95/1998, arts. 10 e 11
Inciso|Unidade de enumeração identificada por algarismos romanos|A lista de requisitos sob um artigo é organizada nos níveis I, II e III|LC 95/1998, art. 10
Alínea|Desdobramento de inciso indicado por letra minúscula|O inciso II enumera hipóteses em a, b e c|LC 95/1998, art. 10
Item|Desdobramento de alínea representado por algarismo arábico|A alínea a é dividida em entradas numeradas 1, 2 e 3|LC 95/1998, art. 10
Cláusula de vigência|Dispositivo que indica quando a norma começa a vigorar|Um artigo final estabelece que a lei entra em vigor após 60 dias|LC 95/1998, art. 8º
Cláusula de revogação|Dispositivo que enumera expressamente as leis ou disposições revogadas|O final da lei nova identifica nominalmente os dispositivos retirados do ordenamento|LC 95/1998, art. 9º
`);
addConcepts('e','Comunicações e atos oficiais','redacao',`
Ata|Registro formal das ocorrências e deliberações de uma reunião|O documento identifica presentes, registra os assuntos debatidos e informa o resultado das votações
Atestado|Documento que afirma a ocorrência de um fato ou o atendimento de determinada condição|A autoridade registra que uma pessoa compareceu a uma atividade em certo período
Certidão|Documento que certifica informação extraída de registros oficiais|O setor certifica que um processo consta do livro oficial com número e data
Ofício|Comunicação oficial utilizada para encaminhar solicitação, informação ou resposta entre órgãos ou autoridades|A Presidência solicita informações a outra instituição por correspondência formal
Circular|Comunicação de conteúdo uniforme dirigida a diversos destinatários|A mesma orientação administrativa é expedida simultaneamente a todas as unidades
Parecer|Manifestação técnica ou jurídica fundamentada que subsidia uma decisão|A assessoria analisa um processo e apresenta uma conclusão opinativa
Despacho|Ato pelo qual a autoridade encaminha ou decide questão em um processo|A autoridade determina a remessa dos autos a outro setor para análise
Edital|Instrumento de publicidade para convocar interessados ou divulgar condições de um procedimento|Um documento público anuncia inscrições, requisitos e critérios de seleção
Portaria|Ato administrativo frequentemente empregado para designações e providências internas|A Presidência designa por ato formal os integrantes de um grupo de trabalho administrativo
Relatório|Exposição organizada sobre atividades, fatos ou resultados apurados|O setor apresenta um balanço narrativo das atividades e resultados de um trimestre
`);
addConcepts('e','Orçamento e princípios','cf',`
Plano plurianual|Instrumento de planejamento de médio prazo com diretrizes, objetivos e metas para despesas de capital e programas continuados|A administração define metas regionalizadas para um ciclo de planejamento de vários exercícios|CF, art. 165
Lei de diretrizes orçamentárias|Lei que fixa metas e prioridades e orienta a elaboração do orçamento anual|Antes da proposta anual, aprova-se a lei que orientará sua elaboração|CF, art. 165
Lei orçamentária anual|Lei que estima receitas e fixa despesas para o exercício financeiro|O Poder Legislativo aprova a previsão de arrecadação e as dotações para o próximo exercício|CF, art. 165
Anualidade|Princípio segundo o qual o orçamento é elaborado para um período determinado, normalmente um exercício financeiro|As dotações aprovadas se referem ao exercício de janeiro a dezembro
Universalidade|Princípio de inclusão das receitas e despesas orçamentárias no orçamento|A apresentação orçamentária inclui todas as entradas e saídas de natureza orçamentária
Orçamento bruto|Princípio de registro de receitas e despesas pelos valores totais, sem deduções|Receita de 100 e transferência de 30 aparecem separadas, em vez de registro líquido de 70
Exclusividade|Princípio que veda na LOA matéria estranha à previsão da receita e fixação da despesa, ressalvadas exceções constitucionais|Um dispositivo alheio ao orçamento é excluído do projeto de LOA por contrariar a regra constitucional|CF, art. 165, § 8º
Crédito suplementar|Crédito adicional destinado a reforçar dotação existente|Uma despesa já autorizada recebe reforço por insuficiência da dotação|Lei 4.320/1964, art. 41
Crédito especial|Crédito adicional para despesa sem dotação específica|Um programa novo precisa de autorização orçamentária porque não possui dotação própria|Lei 4.320/1964, art. 41
Crédito extraordinário|Crédito adicional para despesas urgentes e imprevisíveis nas hipóteses legais|Uma calamidade imprevisível demanda abertura imediata de crédito próprio|Lei 4.320/1964, art. 41 e CF, art. 167
`);
addConcepts('e','Execução orçamentária e financeira','fin',`
Empenho|Ato de autoridade competente que cria obrigação de pagamento, pendente ou não de condição|A administração registra o compromisso orçamentário antes de executar a despesa|Lei 4.320/1964, art. 58
Liquidação da despesa|Verificação do direito adquirido pelo credor com base em títulos e documentos comprobatórios|Após a entrega, o setor confere contrato, nota fiscal, valor e credor para reconhecer o direito ao pagamento|Lei 4.320/1964, art. 63
Ordem de pagamento|Despacho da autoridade competente determinando que a despesa seja paga|Com a despesa liquidada, a autoridade determina que a tesouraria realize o pagamento|Lei 4.320/1964, art. 64
Pagamento da despesa|Saída financeira destinada a quitar obrigação após a regular liquidação e a ordem de pagamento|A tesouraria transfere ao fornecedor o valor já liquidado e autorizado|Lei 4.320/1964, arts. 62 e 65
Lançamento da receita|Ato que verifica a procedência do crédito fiscal e identifica a pessoa devedora|A repartição competente identifica o contribuinte e registra o débito tributário|Lei 4.320/1964, art. 53
Arrecadação|Recebimento de receita pública pelo agente arrecadador|O contribuinte quita a guia em instituição autorizada e o valor é recebido pelo agente
Recolhimento|Transferência do valor arrecadado para a conta do Tesouro|O banco repassa ao caixa do Tesouro os valores recebidos dos contribuintes
Restos a pagar|Despesas empenhadas e ainda não pagas até 31 de dezembro|Ao fechar o exercício, um compromisso empenhado e ainda não pago recebe registro próprio|Lei 4.320/1964, art. 36
Ingresso extraorçamentário|Entrada temporária de recursos de terceiros sujeita à devolução ou compensação|Uma caução recebida em dinheiro fica sob guarda do ente até ser restituída
Receita de capital|Categoria que inclui, entre outras origens, operações de crédito e alienação de bens|O ente vende um imóvel de seu patrimônio e classifica a entrada na categoria correspondente|Lei 4.320/1964, art. 11
`);
addConcepts('e','Finanças públicas e responsabilidade fiscal','lrf',`
Regime de caixa|Reconhecimento pelo momento em que ocorre o recebimento ou pagamento|Uma entrada só é registrada sob esse critério quando o dinheiro ingressa
Regime de competência|Reconhecimento pelo fato gerador, independentemente do movimento financeiro|A obrigação é reconhecida quando o serviço é prestado, embora o pagamento ocorra depois
Fluxo de caixa|Controle das entradas, saídas e disponibilidades financeiras ao longo do tempo|A tesouraria projeta se o saldo será suficiente para os desembolsos da semana
Conciliação bancária|Comparação dos registros internos com o extrato para identificar diferenças|O setor verifica depósitos em trânsito e tarifas presentes apenas no extrato
Imposto|Tributo cuja obrigação decorre de situação independente de atividade estatal específica relativa ao contribuinte|O município exige tributo em razão da propriedade imobiliária urbana
Taxa|Tributo vinculado ao poder de polícia ou à utilização de serviço público específico e divisível nas condições legais|A cobrança decorre do exercício regular do poder de polícia municipal
Contribuição de melhoria|Tributo ligado a obra pública da qual decorre valorização imobiliária|Uma obra pública valoriza imóveis e o ente institui a cobrança correspondente, observados os limites legais
Relatório Resumido da Execução Orçamentária|Relatório fiscal publicado até 30 dias após o encerramento de cada bimestre|Após encerrar o bimestre, publica-se demonstrativo resumido da execução orçamentária|LRF, art. 52
Relatório de Gestão Fiscal|Relatório que compara dados como despesa com pessoal e dívida com limites legais|O titular de Poder publica demonstrativo com comparativos de limites fiscais|LRF, arts. 54 e 55
Receita corrente líquida|Agregado de receitas correntes calculado com deduções legais e período móvel de doze meses|Para aferir limites fiscais, soma-se a arrecadação do mês e dos onze anteriores, sem duplicidades e com deduções|LRF, art. 2º
`);
addConcepts('e','Modalidades e contratação pública','lei',`
Pregão|Modalidade para aquisição de bens e serviços comuns nas hipóteses legais|O órgão licita material padronizado com especificações usuais de mercado|Lei 14.133/2021, arts. 6º e 29
Concorrência|Modalidade para bens e serviços especiais e obras e serviços de engenharia nas hipóteses legais|O órgão adota modalidade para licitar obra de alta complexidade, sem necessidade de diálogo competitivo|Lei 14.133/2021, arts. 6º e 28
Concurso|Modalidade para escolher trabalho técnico, científico ou artístico mediante prêmio ou remuneração|A administração promove competição de projetos artísticos com prêmio previsto em edital|Lei 14.133/2021, arts. 6º e 30
Leilão|Modalidade destinada à alienação de bens mediante maior lance nas hipóteses legais|Veículos inservíveis são vendidos a quem oferecer o maior lance|Lei 14.133/2021, arts. 6º e 31
Diálogo competitivo|Modalidade com diálogos prévios para desenvolver alternativas capazes de atender à necessidade e proposta final após encerrá-los|Diante de desafio complexo nas condições legais, a administração dialoga com licitantes selecionados antes de receber propostas finais|Lei 14.133/2021, arts. 6º e 32
Inexigibilidade|Contratação direta fundada na inviabilidade de competição|A administração comprova que só um fornecedor exclusivo comercializa o objeto pretendido|Lei 14.133/2021, art. 74
Dispensa|Contratação direta autorizada por hipótese legal específica em que licitar pode ser dispensado|Uma compra dentro do limite legal é realizada por contratação direta, depois de atendidos os requisitos aplicáveis|Lei 14.133/2021, art. 75
Habilitação|Fase de verificação de informações e documentos que demonstram a capacidade do licitante|A comissão examina a qualificação técnica e a regularidade fiscal do vencedor provisório|Lei 14.133/2021, art. 62
Julgamento|Fase de avaliação das propostas pelo critério definido no edital|O agente compara preços admissíveis para definir a ordem das propostas|Lei 14.133/2021, arts. 17 e 33
Homologação|Ato da autoridade superior que confirma a licitação após a conclusão regular de suas fases|Encerrados julgamento, habilitação e recursos, a autoridade confirma a regularidade do procedimento|Lei 14.133/2021, art. 71
`);
addConcepts('e','Atos no processo de contratação','lei',`
Adjudicação|Ato que atribui o objeto da licitação ao vencedor do certame|Encerrado o procedimento, a autoridade atribui formalmente o objeto ao primeiro colocado|Lei 14.133/2021, art. 71
Revogação|Retirada do certame por conveniência ou oportunidade decorrente de fato superveniente comprovado|Uma mudança posterior comprovada torna a aquisição inconveniente, embora o procedimento esteja regular|Lei 14.133/2021, art. 71
Anulação|Desfazimento decorrente de ilegalidade insanável|A autoridade identifica vício que não pode ser sanado e invalida o procedimento afetado|Lei 14.133/2021, art. 71
Recurso administrativo|Instrumento para impugnar decisões recorríveis dentro do procedimento|Um licitante contesta tempestivamente sua inabilitação pela via recursal prevista|Lei 14.133/2021, art. 165
Requisição de materiais|Formalização interna da necessidade de obtenção de itens para o setor|O almoxarifado informa o setor de compras de que determinado item precisa ser reposto
Pesquisa de preços|Levantamento de referências para estimar o valor da contratação|Antes de contratar, o órgão compara valores praticados para itens equivalentes|Lei 14.133/2021, art. 23
Recebimento definitivo|Aceite formal após verificação de atendimento às exigências contratuais|Concluída a verificação de qualidade e quantidade, formaliza-se o aceite final|Lei 14.133/2021, art. 140
Fiscalização contratual|Acompanhamento da execução por representante designado pela administração|O servidor indicado registra ocorrências da execução e exige regularização|Lei 14.133/2021, art. 117
Alteração unilateral|Modificação contratual determinada pela administração nos casos e limites legais|Após justificativa, o órgão determina acréscimo quantitativo dentro do limite permitido|Lei 14.133/2021, arts. 124 e 125
Extinção consensual|Encerramento do ajuste por acordo entre as partes, observado o interesse da administração|A administração e a contratada formalizam o encerramento acordado por causa justificada|Lei 14.133/2021, art. 138
`);
addConcepts('e','Princípios e instrumentos de licitação','lei',`
Vinculação ao edital|Dever de observar as regras regularmente estabelecidas no instrumento convocatório|Durante a avaliação, a comissão mantém os requisitos de classificação divulgados na convocação|Lei 14.133/2021, art. 5º
Julgamento objetivo|Avaliação com critérios verificáveis previamente definidos|Uma proposta recebe pontuação calculada por fórmula pública, sem preferência pessoal|Lei 14.133/2021, art. 5º
Segregação de funções|Distribuição de funções de risco para reduzir a concentração de poder no processo|Servidores distintos conduzem atividades de maior risco e verificam atos críticos|Lei 14.133/2021, arts. 5º e 7º
Competitividade|Princípio que protege a disputa e repele restrições indevidas à participação|O órgão retira uma exigência de participação que não se relaciona ao objeto e afasta concorrentes sem justificativa|Lei 14.133/2021, arts. 5º e 9º
Motivação|Indicação dos fundamentos de fato e de direito que sustentam a decisão|A autoridade explica documentalmente por que escolheu determinado encaminhamento|Lei 14.133/2021, art. 5º
Estudo técnico preliminar|Documento inicial de planejamento que caracteriza o problema e examina a melhor solução|A equipe descreve a necessidade e compara formas disponíveis de atendê-la|Lei 14.133/2021, arts. 6º e 18
Termo de referência|Documento que especifica a contratação de bens ou serviços e suas condições|A equipe detalha o objeto, os critérios de medição e as condições de execução para a futura contratação|Lei 14.133/2021, art. 6º
Portal Nacional de Contratações Públicas|Sítio oficial destinado à divulgação centralizada de atos exigidos pela Lei de Licitações|O órgão divulga o contrato na plataforma nacional de contratações|Lei 14.133/2021, arts. 94 e 174
Matriz de riscos|Cláusula contratual que distribui riscos e responsabilidades entre as partes|O contrato define previamente quem assume os impactos financeiros de eventos supervenientes|Lei 14.133/2021, arts. 6º e 103
Sistema de registro de preços|Conjunto de procedimentos para registro formal de preços relativos a contratações futuras|O órgão registra preços de itens para demandas futuras, respeitadas as regras da ata|Lei 14.133/2021, arts. 6º e 82
`);
const adapted = bank.find(q=>q.topic==='Princípios e instrumentos de licitação' && q.family==='Portal Nacional de Contratações Públicas');
Object.assign(adapted,{
 question:'Um órgão divulga seu edital, mas condiciona o acesso aos anexos à criação de cadastro complementar próprio. A Lei 14.133/2021 permite essa exigência para consultar o edital?',
 options:['Não. É vedado exigir registro cadastral complementar para acesso ao edital e anexos.','Sim, desde que o cadastro seja gratuito.','Sim, sempre que houver cadastro nacional.','Sim, desde que conste como requisito de habilitação.'],
 correct:'Não. É vedado exigir registro cadastral complementar para acesso ao edital e anexos.',
 explanation:'O art. 87, § 2º, da Lei 14.133/2021 veda essa condição de acesso.',
 source:'compras',
 origin:'Adaptada de prova anterior · Pindorama/SP, 2026'
});
if(typeof module!=='undefined') module.exports={bank,sources,labels};
const quotas = {p:10,g:10,e:20};
function shuffle(items, random=Math.random){
 const result=items.slice();
 for(let i=result.length-1;i>0;i--){
  const j=Math.floor(random()*(i+1));
  [result[i],result[j]]=[result[j],result[i]];
 }
 return result;
}
function draw(previous=[], random=Math.random){
 return Object.entries(quotas).flatMap(([block,count])=>{
  const candidates=shuffle(bank.filter(q=>q.block===block),random);
  const used=new Set();
  const selected=[];
  const previousIds=new Set(previous);
  const ordered=[...candidates.filter(q=>!previousIds.has(q.id)),...candidates.filter(q=>previousIds.has(q.id))];
  for(const q of ordered){
   if(used.has(q.family)) continue;
   used.add(q.family);
   selected.push({...q,options:shuffle(q.options,random)});
   if(selected.length===count) break;
  }
  return selected;
 });
}
function grade(questions,answers){
 const totals={p:0,g:0,e:0};
 for(const q of questions) if(answers[q.id]===q.correct) totals[q.block]++;
 const hits=totals.p+totals.g+totals.e;
 return {totals,hits,points:hits*2.5,pass:hits>=20 && totals.p+totals.g>0 && totals.e>0};
}
if(typeof module!=='undefined') module.exports={...module.exports,draw,grade};



const expansionContexts = words(`
arquivo|A equipe abriu o arquivo antes da reunião|O documento tinha duas páginas e foi arquivado após a conferência|A versão publicada era a segunda|duas páginas|arquivo
biblioteca|A bibliotecária conferiu o catálogo antes da abertura|O manual estava disponível apenas para consulta local|O manual continuou na biblioteca|consulta local|catálogo
plenário|O assessor levou a pauta ao plenário pela manhã|A sessão foi adiada para a tarde por falta de energia|A pauta seria discutida mais tarde|falta de energia|plenário
inventário|O almoxarife verificou o inventário antes da entrega|Faltavam três caixas e o recebimento ficou pendente|As caixas ainda precisavam ser entregues|três caixas|inventário
agenda|A equipe consultou a agenda antes de marcar a entrevista|A sala estava reservada até as quinze horas|A entrevista deveria ocorrer depois da reserva ou em outro local|quinze horas|entrevista
fotografia|A fotógrafa entregou as imagens depois da cerimônia|Dois registros ficaram desfocados e foram excluídos da seleção|Nem todas as fotos entraram na seleção|dois registros|cerimônia
malote|O motorista recolheu o malote no início do expediente|O trajeto foi interrompido por um desvio na estrada|Houve interrupção durante o trajeto|um desvio|motorista
inscrição|A candidata enviou o formulário ao portal pela manhã|O sistema confirmou o envio junto com o protocolo|Foi possível obter comprovação do envio|o protocolo|formulário
votação|A relatora leu o parecer no início da votação|Um integrante pediu vista e a deliberação ficou para depois|A deliberação não se encerrou naquela ocasião|um integrante|parecer
jardim|O zelador regou o jardim antes do evento|A equipe fechou o acesso lateral para proteger os canteiros|O acesso lateral ficou indisponível|os canteiros|jardim
balcão|A equipe organizou o balcão antes do atendimento|As senhas foram distribuídas na ordem de chegada|A chegada orientou a distribuição das senhas|as senhas|atendimento
mapa|O estudante observou o mapa durante a visita|O caminho menor estava interditado para manutenção|O trajeto mais curto estava indisponível|para manutenção|estudante
auditório|A equipe verificou o auditório depois do ensaio|Um microfone falhou e foi trocado antes da palestra|Houve substituição de equipamento|um microfone|auditório
planilha|O contador importou os dados no fim da tarde|Duas colunas chegaram sem cabeçalho e precisaram de revisão|A importação exigiu conferência adicional|duas colunas|contador
correio|A atendente separou a correspondência antes da coleta|As cartas registradas receberam um comprovante específico|O comprovante mencionado estava ligado às cartas registradas|um comprovante específico|correspondência
estoque|O fiscal consultou os registros depois da inspeção|Havia cinco unidades sem etiqueta no depósito|Uma parte das unidades precisava ser identificada|cinco unidades|depósito
transporte|O passageiro consultou o quadro de horários ao chegar|A linha permaneceu suspensa até o reparo do veículo|O funcionamento dependia do reparo|o reparo do veículo|passageiro
entrevista|A jornalista preparou as perguntas na noite anterior|O convidado solicitou que a conversa fosse gravada|O pedido de gravação partiu do convidado|o convidado|jornalista
amostra|A pesquisadora numerou as amostras antes do teste|Uma delas foi armazenada separadamente após a coleta|Pelo menos uma amostra ficou separada|após a coleta|pesquisadora
chave|O porteiro conferiu a chave no começo do turno|A fechadura do depósito havia sido substituída no dia anterior|A troca da fechadura já tinha ocorrido|no dia anterior|porteiro
impressora|A técnica ajustou a impressora durante a pausa|O equipamento voltou a operar depois da troca do cabo|A impressora voltou a funcionar após uma intervenção|o cabo|impressora
conferência|O organizador abriu o salão antes da conferência|Uma das mesas ficou reservada para credenciamento|Nem todas as mesas tinham uso livre|uma das mesas|conferência
prateleira|A auxiliar retirou os volumes mais pesados da prateleira|Os livros raros permaneceram na vitrine fechada|Os livros raros ficaram protegidos na vitrine|na vitrine fechada|prateleira
exposição|O curador percorreu a galeria antes da exposição|A iluminação de duas salas precisou de ajuste|Parte da iluminação exigiu ajuste|duas salas|galeria
obra|A engenheira visitou a obra no início da semana|O serviço na entrada foi suspenso durante a chuva|A atividade na entrada sofreu uma interrupção|durante a chuva|engenheira
`);
for (const [label,start,detail,conclusion,phrase] of expansionContexts){
 const family='Texto: '+label;
 const put=(topic,question,options,why)=>add('p',topic,family,question,options,why);
 const text=start+'. '+detail+'.';
 put('Compreensão',`Leia: “${text}” Qual conclusão tem apoio no texto?`,[conclusion,'A atividade terminou sem qualquer alteração','A equipe decidiu cancelar definitivamente todas as atividades','O fato informado só ocorreu na semana seguinte'],'A conclusão decorre dos fatos apresentados no trecho.');
 put('Localização de informação',`Do trecho “${text}”, qual expressão foi efetivamente empregada?`,[phrase,'às vinte e duas horas','no exercício seguinte','uma autorização judicial'],'A expressão aparece na segunda frase.');
 put('Coesão',`Qual conector dá sentido de conclusão à última frase do relato sobre ${label}? “${text} ___, ${conclusion[0].toLowerCase()+conclusion.slice(1)}.”`,['Portanto','Contudo','Por exemplo','Aliás'],'“Portanto” apresenta uma conclusão fundamentada no trecho anterior.');
 put('Pontuação',`Na frase sobre ${label}, qual versão pontua corretamente a expressão inicial de confirmação?`,[`Sim, a equipe verificou os dados.`,`Sim a equipe, verificou os dados.`,`Sim a, equipe verificou os dados.`,`Sim a equipe verificou, os dados.`],'A vírgula separa o marcador inicial “sim”, sem separar sujeito, verbo e complemento.');
 put('Formação de palavras',`No comunicado sobre ${label}, lê-se “reavaliar o procedimento”. O prefixo re- indica o quê?`,['Repetição da ação','Negação da ação','Tempo anterior ao fato','Redução do objeto'],'Reavaliar significa avaliar novamente.');
 put('Classes de palavras',`Em “A equipe examinou cuidadosamente o registro sobre ${label}”, qual é o papel de “cuidadosamente”?`,['Advérbio de modo','Adjetivo qualificativo','Substantivo abstrato','Pronome relativo'],'O advérbio caracteriza o modo como o exame foi feito.');
 put('Oração relativa',`Em “O relato sobre ${label}, que foi publicado ontem, recebeu correções”, que tipo de oração é “que foi publicado ontem”?`,['Subordinada adjetiva explicativa','Subordinada adjetiva restritiva','Subordinada adverbial causal','Coordenada conclusiva'],'As vírgulas isolam uma informação explicativa sobre o relato.');
 put('Regência verbal',`Na norma-padrão, como se completa “A equipe assistiu ___ apresentação sobre ${label}”, no sentido de presenciar?`,['à','a','há','às'],'No sentido de presenciar, assistir rege a preposição a, que se funde com o artigo feminino.');
 put('Colocação pronominal',`Qual versão observa a colocação pronominal da norma-padrão com “não”, na nota sobre ${label}?`,[`A equipe não se esqueceu do registro.`,`A equipe não esqueceu-se do registro.`,`A equipe não esqueceu se do registro.`,`A equipe não esqueceu do registro-se.`],'A palavra negativa “não” atrai o pronome átono para antes do verbo.');
 put('Tempos verbais',`Em “A equipe já havia registrado o ocorrido antes da comunicação sobre ${label}”, o que a locução “havia registrado” indica?`,['Uma ação anterior a outro momento passado','Uma ação a começar no futuro','Uma ordem para o presente','Um hábito que necessariamente continua hoje'],'A locução expressa anterioridade em relação a outro fato passado.');
 put('Semântica',`Qual reescrita preserva “${conclusion.replace(/[.]$/,'')} somente naquele contexto” quanto ao sentido de “somente” no texto sobre ${label}?`,['A expressão equivale a “apenas”.','A expressão equivale a “inclusive”.','A expressão equivale a “talvez”.','A expressão equivale a “frequentemente”.'],'“Somente” restringe o alcance da afirmação, assim como “apenas”.');
 put('Gêneros textuais',`O relato sobre ${label} foi seguido de um documento público que convoca interessados, fixa prazo e lista requisitos. Qual é o gênero desse segundo documento?`,['Edital','Crônica','Editorial','Conto'],'A convocação pública com regras e prazos caracteriza o edital.');
 put('Orações adverbiais',`Qual relação aparece em “Após conferir os registros sobre ${label}, a equipe comunicou o resultado”?`,['Tempo','Concessão','Condição','Proporção'],'A oração reduzida introduzida por “após” situa a comunicação no tempo.');
 put('Reescrita',`Como transformar “A equipe registrou o caso de ${label}” em voz passiva, mantendo tempo e sentido?`,[`O caso de ${label} foi registrado pela equipe.`,`O caso de ${label} era registrado pela equipe.`,`O caso de ${label} será registrado pela equipe.`,`A equipe foi registrada no caso de ${label}.`],'O objeto direto se torna sujeito da passiva e “foi registrado” mantém o tempo do verbo.');
 put('Inferência',`No aviso sobre ${label}, “até a supervisora revisou os registros”. O que o uso de “até” sugere?`,['A participação da supervisora era menos esperada.','A supervisora foi a única pessoa a revisar.','A supervisora recusou a revisão.','A revisão foi cancelada.'],'O operador “até” inclui um caso apresentado como pouco esperado.');
 put('Discurso indireto',`A relatora afirmou: “Vou conferir o registro sobre ${label}.” Qual versão relata a fala no discurso indireto, ajustando o tempo verbal?`,[`A relatora afirmou que conferiria o registro sobre ${label}.`,`A relatora perguntou se conferira o registro sobre ${label}.`,`A relatora negou que conferiria o registro sobre ${label}.`,`A relatora ordenou que outros conferissem o registro sobre ${label}.`],'O discurso indireto conserva a afirmação e usa o futuro do pretérito para o futuro em relação ao passado.');
 put('Paralelismo',`Qual redação tem paralelismo sintático na lista de tarefas relativa a ${label}?`,['Reunir os dados, conferir os registros e divulgar a decisão.','Reunir os dados, conferência dos registros e a decisão divulgada.','A reunião dos dados, conferir os registros e decisão.','Dados reunidos, conferência dos registros e divulgar a decisão.'],'As três tarefas começam com verbos no infinitivo.');
 put('Registro formal',`Qual frase é mais adequada a um ofício que solicita informações sobre ${label}?`,['Solicitamos o encaminhamento das informações até sexta-feira.','Manda aí o que vocês têm até sexta.','Vê se dá um jeito nisso daí.','Tô esperando o retorno logo.'],'A primeira opção usa linguagem formal e especifica o pedido.');
 put('Acentuação',`No material sobre ${label}, qual palavra é acentuada por ser proparoxítona?`,['público','também','papéis','saída'],'Pú-bli-co tem a antepenúltima sílaba tônica.');
 put('Classificação sintática',`Na expressão “o relato sobre ${label}”, qual é o núcleo do sintagma nominal?`,['relato',label,'sobre','o'],'“Relato” é o substantivo principal, modificado pela expressão introduzida por “sobre”.');
}
const formatNumber=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:4});
const newMath=[
 ['Geometria espacial',n=>[`Uma caixa retangular mede ${n} cm por ${n+2} cm por 4 cm. Qual é seu volume em cm³?`,n*(n+2)*4,[n*(n+2),2*n*(n+2),n*(n+2)*8],'Multiplique as três dimensões da caixa.']],
 ['Razão e proporção',n=>[`A razão entre vagas preenchidas e vagas abertas é 3:2. Se há ${n*5} vagas ao todo, quantas estão preenchidas?`,n*3,[n*2,n*4,n*5],'Divida o total em cinco partes iguais e tome três partes.']],
 ['Medidas de tendência central',n=>[`Cinco setores receberam ${n}, ${n+1}, ${n+1}, ${n+3} e ${n+5} pedidos. Qual é a média de pedidos?`,n+2,[n+1,n+3,n+5],'Some os cinco valores e divida por cinco.']],
 ['Conjuntos',n=>[`Em uma equipe, ${n+12} pessoas usam planilhas, ${n+8} usam editores de texto e ${n} usam ambos. Quantas usam pelo menos um dos dois tipos de programa?`,n+20,[2*n+20,n+8,n+12],'Some os totais de cada conjunto e subtraia a interseção.']],
 ['Juros simples e montante',n=>[`Um capital de R$ ${n*250} rende juros simples de 4% ao mês por 3 meses. Qual é o montante final, em reais?`,n*280,[n*260,n*270,n*30],'Some ao capital os juros de 12% do capital.']],
 ['Geometria e trigonometria',n=>[`Uma rampa reta forma 30° com o solo horizontal e tem ${n*2} metros de comprimento. Qual desnível vertical ela vence, em metros?`,n,[n*2,n*4,n+0.5],'O desnível é o cateto oposto. Multiplique a hipotenusa pelo seno de 30°, que vale 0,5.']],
 ['Variações percentuais',n=>[`Um item de R$ ${n*100} subiu 20% e depois caiu 20% sobre o preço reajustado. Qual o preço final, em reais?`,n*96,[n*100,n*80,n*104],'Multiplique o preço inicial por 1,2 e depois por 0,8.']],
 ['Combinatória e cargos',n=>[`Entre ${n+3} participantes serão escolhidas uma presidência e uma relatoria, ocupadas por pessoas distintas. Quantas escolhas são possíveis?`,(n+3)*(n+2),[(n+3)*(n+2)/2,(n+3)**2,n+3],'A ordem importa porque os cargos são diferentes. Há uma pessoa a menos disponível para o segundo cargo.']],
 ['Lógica proposicional',n=>[`Qual é a negação de “Todos os ${n} processos têm pelo menos um anexo assinado”?`,'Pelo menos um processo não tem anexo assinado.',['Nenhum processo tem anexo assinado.','Todos os processos têm exatamente um anexo assinado.','Pelo menos um processo tem anexo assinado.'],'A negação de uma afirmação universal exige ao menos um contraexemplo.']],
 ['Regra de três inversa',n=>[`Uma equipe de ${n} pessoas conclui um lote de trabalho em 12 horas. Em quanto tempo uma equipe de ${n*2} pessoas conclui o mesmo lote com produtividade individual constante?`,6,[3,12,24],'Ao dobrar o número de pessoas, reduz-se pela metade o tempo necessário.']]
];
for(const [topic,make] of newMath) for(let n=6;n<26;n++){
 const [question,answer,wrong,why]=make(n);
 add('g',topic,'Aplicação: '+topic,question,[answer,...wrong].map(v=>typeof v==='number'?formatNumber(v):v),why);
}
const outputTasks=[
 ['Python · divisão inteira',n=>[`print(${n*3+1} // 3)`,n,[n*3+1,n+1,n-1],'O operador // devolve o quociente inteiro neste caso.']],
 ['Python · resto da divisão',n=>[`print(${n*7+2} % 7)`,2,[7,0,n],'O operador % devolve o resto da divisão.']],
 ['Python · intervalos',n=>[`print(len(range(2, ${n+2})))`,n,[n-1,n+1,n+2],'range inclui o início e exclui o limite superior.']],
 ['Python · listas',n=>[`tarefas = [${n}, ${n+7}, ${n+11}]\nprint(tarefas[-1])`,n+11,[n,n+7,-1],'O índice −1 seleciona o último elemento da lista.']],
 ['Python · acumulação',n=>[`total = ${n}\nfor parcela in [2, 4, 6]:\n    total += parcela\nprint(total)`,n+12,[n+6,n+2,n*12],'O laço acrescenta sucessivamente 2, 4 e 6 ao valor inicial.']],
 ['JavaScript · vetores',n=>[`const fila = [${n}, ${n+10}];\nfila.push(${n+20});\nconsole.log(fila[2]);`,n+20,[n+10,n,2],'push acrescenta um elemento ao final. Os índices do vetor começam em zero.']],
 ['JavaScript · precedência',n=>[`console.log(${n} + 3 * 5);`,n+15,[(n+3)*5,n+8,n*15],'A multiplicação é avaliada antes da soma.']],
 ['JavaScript · função',n=>[`function dobro(x) { return x * 2; }\nconsole.log(dobro(${n}) - 3);`,n*2-3,[n*2,(n-3)*2,n*2+3],'Primeiro a função devolve o dobro. Em seguida é feita a subtração.']],
 ['JavaScript · condição',n=>[`const nota = ${n};\nconsole.log(nota >= ${n} ? nota + 1 : nota - 1);`,n+1,[n-1,n,0],'A igualdade satisfaz a comparação >=. Portanto, avalia-se o primeiro ramo do operador ternário.']],
 ['JavaScript · strings',n=>[`console.log('Doc-${n}'.slice(0, 3));`,'Doc',[`Doc-${n}`,'Doc-',`-${n}`],'slice começa no índice 0 e exclui o índice 3, preservando apenas os três primeiros caracteres.']]
];
for(const [topic,make] of outputTasks) for(let n=9;n<24;n++){
 const [code,answer,wrong,why]=make(n);
 add('g','Informática · '+topic,topic,`O que será exibido ao executar o trecho completo?\n\n${code}`,[answer,...wrong].map(String),why);
}

const original = bank.slice(0,1000);
function conceptsFromOriginal(block,topic){
 const concepts=new Map();
 for(const q of original){
  if(q.block!==block||q.topic!==topic) continue;
  if(q.question.startsWith('Qual conceito se aplica ao caso a seguir? ')){
   concepts.set(q.family,{name:q.correct,example:q.question.slice('Qual conceito se aplica ao caso a seguir? '.length),why:q.explanation,source:q.source});
  }
 }
 return [...concepts.values()];
}
function addComparison(block,topic,left,right,group,wrongLeft,wrongRight){
 const pair=(a,b)=>'I. '+a+'  /  II. '+b;
 add(block,topic,group,
  `Associe cada situação ao instituto que melhor a caracteriza.\n\nI. ${left.example}.\nII. ${right.example}.`,
  [pair(left.name,right.name),pair(right.name,left.name),pair(left.name,wrongRight.name),pair(wrongLeft.name,right.name)],
  `I. ${left.name} — ${left.why.trim()}\nII. ${right.name} — ${right.why.trim()}`,
  left.source===right.source?left.source:'');
}
const legal=conceptsFromOriginal('g','Direito Administrativo e Constitucional');
const info=conceptsFromOriginal('g','Informática');
for(const [i,left] of legal.entries()){
 for(let offset=0;offset<10;offset++){
  const right=info[(i+offset)%info.length];
  addComparison('g','Direito Administrativo e Constitucional · Informática',left,right,left.name,
   legal[(i+1)%legal.length],info[(i+offset+1)%info.length]);
 }
}
const pairs=[
 ['Regimento Interno de Quatro Barras','Processo legislativo'],
 ['Processo legislativo','Técnica legislativa'],
 ['Técnica legislativa','Comunicações e atos oficiais'],
 ['Comunicações e atos oficiais','Regimento Interno de Quatro Barras'],
 ['Orçamento e princípios','Execução orçamentária e financeira'],
 ['Execução orçamentária e financeira','Finanças públicas e responsabilidade fiscal'],
 ['Finanças públicas e responsabilidade fiscal','Orçamento e princípios'],
 ['Modalidades e contratação pública','Atos no processo de contratação'],
 ['Atos no processo de contratação','Princípios e instrumentos de licitação'],
 ['Princípios e instrumentos de licitação','Modalidades e contratação pública']
];
for(const [first,second] of pairs){
 const firstConcepts=conceptsFromOriginal('e',first);
 const secondConcepts=conceptsFromOriginal('e',second);
 for(const [i,left] of firstConcepts.entries()){
  for(const [j,right] of secondConcepts.entries()){
   addComparison('e',first+' · '+second,left,right,left.name,firstConcepts[(i+1)%firstConcepts.length],secondConcepts[(j+1)%secondConcepts.length]);
  }
 }
}


const drills = words(`
ata|atas|lavrou|lavraram|A secretária|na segunda-feira
certidão|certidões|emitiu|emitiram|A atendente|pela manhã
parecer|pareceres|examinou|examinaram|A consultora|na semana passada
edital|editais|publicou|publicaram|A comissão|em junho
ofício|ofícios|encaminhou|encaminharam|A servidora|depois da sessão
projeto|projetos|apresentou|apresentaram|A vereadora|na última reunião
registro|registros|atualizou|atualizaram|A supervisora|às dez horas
nota|notas|revisou|revisaram|A assessora|antes do almoço
inventário|inventários|conferiu|conferiram|A gestora|no mês passado
contrato|contratos|assinou|assinaram|A representante|na sexta-feira
fotografia|fotografias|selecionou|selecionaram|A fotógrafa|depois do evento
livro|livros|catalogou|catalogaram|A bibliotecária|durante o recesso
mapa|mapas|consultou|consultaram|A técnica|no começo da visita
guia|guias|imprimiu|imprimiram|A auxiliar|às oito horas
declaração|declarações|preparou|prepararam|A funcionária|à tarde
comunicado|comunicados|divulgou|divulgaram|A coordenadora|anteontem
balancete|balancetes|elaborou|elaboraram|A contadora|no trimestre anterior
procuração|procurações|recebeu|receberam|A advogada|de manhã
orçamento|orçamentos|comparou|compararam|A compradora|no início do expediente
documento|documentos|digitalizou|digitalizaram|A arquivista|ao fim do expediente
passagem|passagens|reservou|reservaram|A agente|na terça-feira
entrevista|entrevistas|transcreveu|transcreveram|A jornalista|após a gravação
amostra|amostras|identificou|identificaram|A pesquisadora|antes do teste
questionário|questionários|aplicou|aplicaram|A entrevistadora|na semana anterior
pedido|pedidos|protocolou|protocolaram|A cidadã|na quarta-feira
planilha|planilhas|preencheu|preencheram|A analista|na quinta-feira
painel|painéis|instalou|instalaram|A eletricista|ao amanhecer
ficha|fichas|separou|separaram|A monitora|no primeiro intervalo
cronograma|cronogramas|validou|validaram|A chefe|antes da publicação
convite|convites|distribuiu|distribuíram|A organizadora|na véspera
caderno|cadernos|numerou|numeraram|A fiscal|antes da prova
pauta|pautas|discutiu|discutiram|A relatora|na última sessão
equipe|equipes|convocou|convocaram|A supervisora|no sábado
inscrição|inscrições|homologou|homologaram|A banca|após os recursos
quadro|quadros|montou|montaram|A cenógrafa|depois do ensaio
equipamento|equipamentos|testou|testaram|A engenheira|às onze horas
formulário|formulários|validou|validaram|A plataforma|no envio
estatística|estatísticas|consolidou|consolidaram|A equipe|no fim do semestre
relato|relatos|resumiu|resumiram|A redatora|antes do fechamento
comprovante|comprovantes|anexou|anexaram|A candidata|na data-limite
voto|votos|contou|contaram|A mesária|após a votação
minuta|minutas|corrigiu|corrigiram|A revisora|antes da assinatura
aviso|avisos|afixou|afixaram|A porteira|na abertura
demonstrativo|demonstrativos|analisou|analisaram|A auditora|no começo do ano
cadastro|cadastros|verificou|verificaram|A assistente|na última tarde
texto|textos|traduziu|traduziram|A tradutora|durante a viagem
imagem|imagens|arquivou|arquivaram|A operadora|ao terminar a sessão
mensagem|mensagens|enviou|enviaram|A coordenadora|naquela manhã
depoimento|depoimentos|gravou|gravaram|A repórter|depois da coletiva
relatório|relatórios|redigiu|redigiram|A diretora|ontem
`);
const femaleNouns=new Set('ata certidão nota fotografia guia declaração procuração passagem entrevista amostra ficha pauta equipe inscrição estatística minuta imagem mensagem'.split(' '));
const cap=s=>s[0].toUpperCase()+s.slice(1);
for(const [noun,plural,verb,verbPlural,subject,time] of drills){
 const object=(femaleNouns.has(noun)?'a ':'o ')+noun;
 const sentence=`${subject} ${verb} ${object} ${time}`;
 const put=(topic,q,a,e)=>add('p',topic,'Análise de frase · '+noun,q,a,e);
 put('Adjunto adverbial',`Em “${sentence}”, que trecho situa o acontecimento no tempo?`,[time,subject,verb,object],'A expressão temporal localiza o fato narrado.');
 put('Transitividade',`Em “${sentence}”, qual é o objeto direto de “${verb}”?`,[object,subject,verb,time],'O complemento verbal vem diretamente, sem preposição exigida.');
 put('Concordância verbal',`Substitua “${subject}” por “As duas responsáveis” em “${sentence}”. Qual forma mantém a concordância e o pretérito perfeito?`,[verbPlural,verb,'haviam '+verb,'foram '+verb],'O sujeito plural pede a terceira pessoa do plural no mesmo tempo.');
 put('Flexão nominal',`No registro “${sentence}”, qual é a forma plural do substantivo “${noun}”?`,[plural,noun,noun+'z',noun+'zes'],`A forma de plural é “${plural}”.`);
 put('Pontuação',`Desloque “${time}” para o início de “${sentence}”, destacando o termo deslocado por vírgula. Qual versão está correta?`,[`${cap(time)}, ${subject.toLowerCase()} ${verb} ${object}.`,`${cap(time)} ${subject.toLowerCase()}, ${verb} ${object}.`,`${cap(time)} ${subject.toLowerCase()} ${verb}, ${object}.`,`${cap(time)}, ${subject.toLowerCase()}, ${verb} ${object}.`],'A vírgula destaca o adjunto deslocado sem separar sujeito, verbo e objeto.');
 put('Subordinação',`Que relação a oração introduzida por “para que” estabelece em “${subject} ${verb} ${object} para que o público tivesse acesso ao conteúdo”?`,['Finalidade','Concessão','Comparação','Tempo'],'A segunda oração explicita o propósito da ação principal.');
 put('Fato e opinião',`“${sentence}. Para mim, esse foi o melhor resultado do mês.” Qual passagem expressa avaliação pessoal?`,['esse foi o melhor resultado do mês',`${subject} ${verb} ${object}`,time,object],'“Melhor”, nesse contexto, exprime uma avaliação de quem fala.');
 put('Coesão referencial',`Em “${sentence}. Esse item foi revisado novamente”, a que “esse item” se refere?`,[object,subject,time,'a nova revisão'],'O segmento retoma o objeto da primeira frase.');
 put('Estrutura da oração',`No período “${sentence}”, qual alternativa identifica corretamente o verbo da oração?`,[verb,object,subject,time],`“${verb}” indica a ação e está flexionado no pretérito.`);
 put('Modalização',`Compare “${sentence}” com “Talvez ${subject.toLowerCase()} tenha feito isso”. Que efeito “talvez” produz na segunda frase?`,['Reduz a certeza sobre o fato','Transforma o texto em ordem','Confirma a data do fato','Nega categoricamente o fato'],'O advérbio introduz uma possibilidade.');
}
const numberTasks=[
 ['Coordenadas e distância',n=>[`Um ponto desloca-se ${3*n} unidades para leste e ${4*n} unidades para norte. Qual é a distância em linha reta entre o início e o fim?`,5*n,[7*n,12*n,n],'Aplique Pitágoras aos deslocamentos perpendiculares.']],
 ['Volume e capacidade',n=>[`Uma caixa contém ${n} recipientes de 750 mL totalmente cheios. Quantos litros de líquido há na caixa?`,.75*n,[.075*n,7.5*n,n],'Multiplique o número de recipientes por 0,75 litro.']],
 ['Estatística · moda',n=>[`Observações: ${n+3}, ${n}, ${n+2}, ${n+3}, ${n+5}, ${n+3}, ${n+2}. Qual é a moda?`,n+3,[n,n+2,n+5],'A moda é o valor de maior frequência.']],
 ['Probabilidade conjunta',n=>[`Uma urna tem ${n} fichas azuis e ${n+1} amarelas. Retiram-se duas fichas sucessivas, sem reposição. Qual é a probabilidade de ambas serem azuis?`,`${n}/${2*n+1} × ${n-1}/${2*n}`,[`${n}/${2*n+1} × ${n}/${2*n+1}`,`${n}/${2*n+1} × ${n-1}/${2*n+1}`,`${n+1}/${2*n+1} × ${n}/${2*n}`],'Após sair uma azul, há uma azul a menos e uma ficha a menos no total.']],
 ['Sistema linear por substituição',n=>[`Dois números x e y satisfazem x = 2y e x + y = ${3*n}. Quanto vale y?`,n,[n*2,n*3,n-1],'Substitua x por 2y para obter 3y igual ao total.']],
 ['Escala',n=>[`Um mapa está na escala 1:50.000. Uma distância de ${n} cm no mapa corresponde a quantos quilômetros reais?`,n/2,[n,n*5,n/20],'Cada centímetro corresponde a 50.000 centímetros, ou meio quilômetro.']],
 ['Progressão aritmética · soma',n=>[`Os cinco primeiros valores de uma PA começam em ${n} e têm razão 2. Qual é a soma desses cinco valores?`,5*n+20,[5*n+10,5*n+8,5*n+40],'Some os cinco termos ou multiplique o termo central por cinco.']],
 ['Regra de três composta',n=>[`${n} pessoas analisam ${20*n} solicitações em 4 horas. Mantido o ritmo individual, quantas solicitações ${n+3} pessoas analisam em 6 horas?`,30*(n+3),[20*(n+3),30*n,40*(n+3)],'Cada pessoa analisa cinco solicitações por hora. Multiplique pela nova quantidade de pessoas e horas.']],
 ['Sequência numérica',n=>[`Observe a sequência ${n}, ${n+1}, ${n+4}, ${n+9}, ${n+16}. Mantendo o padrão de acrescentar quadrados sucessivos a ${n}, qual é o próximo valor?`,n+25,[n+20,n+24,n+36],'O próximo quadrado é 5² = 25.']],
 ['Contagem pelo produto',n=>[`Há ${n} modelos de capa, 3 cores e 4 acabamentos. Cada item combina um modelo, uma cor e um acabamento. Quantas combinações são possíveis?`,12*n,[7*n,4*n,3*n],'Multiplique as quantidades de escolhas independentes.']]
];
for(const [topic,make] of numberTasks) for(let n=31;n<51;n++){
 const [question,correct,wrong,why]=make(n);
 add('g','Matemática · '+topic,topic,question,[correct,...wrong].map(v=>typeof v==='number'?formatNumber(v):v),why);
}
const codeTasks=[
 ['Python · soma condicional',n=>[`print(sum(x for x in [${n}, ${n+2}, ${n+4}] if x > ${n}))`,2*n+6,[3*n+6,n+4,2*n+4],'O filtro exclui o primeiro valor e a função soma os dois restantes.']],
 ['Python · dicionário',n=>[`dados = {"a": ${n}, "b": ${n+1}}\nprint(dados.get("c", ${n+3}))`,n+3,[n,n+1,0],'Como a chave c está ausente, get devolve o valor padrão informado.']],
 ['Python · fatiamento',n=>[`itens = [${n}, ${n+1}, ${n+2}, ${n+3}]\nprint(itens[1:3])`,`[${n+1}, ${n+2}]`,[`[${n}, ${n+1}]`,`[${n+1}, ${n+2}, ${n+3}]`,`[${n+2}, ${n+3}]`],'O intervalo começa no índice 1 e exclui o índice 3.']],
 ['Python · atualização de tupla',n=>[`a, b = ${n}, ${n+8}\na, b = b, a\nprint(a - b)`,8,[-8,2*n+8,0],'A atribuição troca os valores. O maior passa a ocupar a variável a.']],
 ['Python · conjuntos',n=>[`print(len({${n}, ${n+1}, ${n}, ${n+2}, ${n+1}}))`,3,[2,4,5],'Um conjunto armazena cada valor distinto apenas uma vez.']],
 ['JavaScript · filtro de lista',n=>[`const a = [${n}, ${n+2}, ${n+6}];\nconsole.log(a.filter(x => x >= ${n+2}).length);`,2,[0,1,3],'Dois elementos atendem à condição.']],
 ['JavaScript · transformação de lista',n=>[`const a = [${n}, ${n+3}, ${n+8}];\nconsole.log(a.map(x => x - 2)[1]);`,n+1,[n-2,n+3,n+6],'map subtrai dois de cada elemento. O índice 1 aponta para o segundo.']],
 ['JavaScript · tamanho da lista',n=>[`const a = [${n}, ${n+4}, ${n+8}];\na.pop();\nconsole.log(a.length);`,2,[0,1,3],'pop remove o último elemento e reduz o tamanho da lista em um.']],
 ['JavaScript · toFixed',n=>[`console.log(typeof (${n} / 10).toFixed(2));`,'string',['number','object','boolean'],'toFixed formata o resultado como uma string.']],
 ['JavaScript · interpolação',n=>[`const protocolo = ${n};\nconsole.log("QB-" + (protocolo + 1));`,`QB-${n+1}`,[`QB-${n}1`,`QB-${n}`,n+1],'Os parênteses fazem a soma numérica antes da concatenação.']]
];
for(const [topic,make] of codeTasks) for(let n=31;n<46;n++){
 const [code,correct,wrong,why]=make(n);
 add('g','Informática · '+topic,topic,`Qual é o resultado exibido?\n\n${code}`,[correct,...wrong].map(String),why);
}
function compareGroups(block,topic,groupA,groupB,countPerConcept,offsetStart=0){
 for(const [i,left] of groupA.entries()){
  for(let k=0;k<countPerConcept;k++){
   const j=(i+k+offsetStart)%groupB.length;
   const right=groupB[j];
   let otherLeft=groupA[(i+1)%groupA.length];
   let otherRight=groupB[(j+1)%groupB.length];
   if(otherLeft.name===right.name) otherLeft=groupA[(i+2)%groupA.length];
   if(otherRight.name===left.name) otherRight=groupB[(j+2)%groupB.length];
   addComparison(block,topic,left,right,left.name,otherLeft,otherRight);
  }
 }
}
compareGroups('g','Direito Administrativo e Constitucional',legal,legal,5,1);
compareGroups('g','Informática',info,info,5,1);
for(const [i,[first]] of pairs.entries()){
 const second=pairs[(i+4)%pairs.length][0];
 compareGroups('e',first+' · '+second,conceptsFromOriginal('e',first),conceptsFromOriginal('e',second),10);
}
for(const q of bank){
 if(!q.question.startsWith('Qual associação está correta no contexto de ')) continue;
 const terms=q.options.map(option=>option.split(' — ')[0]).sort((a,b)=>a.localeCompare(b,'pt-BR'));
 q.question='Em '+q.topic+', qual associação entre conceito e definição está correta? Conceitos em análise: '+terms.join(', ')+'.';
}
