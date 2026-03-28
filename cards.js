/*
 * ============================================================
 *  KARTEN-DATEN  —  cards.js
 * ============================================================
 *
 *  Alle Fächer sind im SUBJECTS-Array definiert.
 *  Jedes Fach hat:
 *    name:        Anzeigename (z.B. "Anatomie")
 *    icon:        Emoji für die Fachauswahl
 *    description: Kurzbeschreibung (optional)
 *    kk:          Karteikarten-Array für dieses Fach
 *    lt:          Lückentext-Array für dieses Fach
 *    theory:      Theorie-Array für dieses Fach
 *
 * ============================================================
 *  ID-VERKNÜPFUNG
 * ============================================================
 *
 *  KK, LT und Theorie-Einträge werden über eine gemeinsame ID
 *  verknüpft. Ein Eintrag mit id:1 in kk[], lt[] und theory[]
 *  gehört zum selben Thema. Die ID muss dabei nicht in allen
 *  drei Arrays vorhanden sein — nur wenn eine ID in theory[]
 *  existiert, erscheint der „📖 Theorie"-Button.
 *
 *  IDs pro Fach bei 1 starten, fortlaufend hochzählen.
 *
 * ============================================================
 *  NEUES FACH HINZUFÜGEN
 * ============================================================
 *
 *  Einfach einen neuen Block ans Ende des SUBJECTS-Arrays
 *  einfügen (vor dem ];), Komma nach dem vorherigen Eintrag:
 *
 *    {
 *      name: "Mein Fach",
 *      icon: "📖",
 *      description: "Kurze Beschreibung",
 *      kk: [
 *        {id:1, question: "Frage?", answer: "Antwort", category: "Thema"},
 *      ],
 *      lt: [
 *        {id:1, category:"Thema", question:"Frage?", answer:"Antwort mit {{Lücke}}."},
 *      ],
 *      theory: [
 *        {id:1, title:"Thema-Titel", html:`<h2>Überschrift</h2><p>Text...</p>`},
 *      ]
 *    },
 *
 * ============================================================
 *  KARTEIKARTEN-FORMAT (kk)
 * ============================================================
 *
 *    {id: 1, question: "Frage?", answer: "Antwort", category: "Kategorie"}
 *
 *  Mehrzeilige Antworten mit \n:
 *    answer: "- Punkt 1\n- Punkt 2\n- Punkt 3"
 *
 * ============================================================
 *  LÜCKENTEXT-FORMAT (lt)
 * ============================================================
 *
 *    {id: 1, category: "Kategorie", question: "Frage?", answer: "Antwort"}
 *
 *  Lücken mit {{Wort}} markieren:
 *    answer: "Die {{Mitose}} ist eine Form der {{Zellteilung}}."
 *    → "Mitose" und "Zellteilung" werden zu Eingabefeldern.
 *    → Der erste Buchstabe wird als Tipp angezeigt.
 *
 *  Ohne {{...}}: automatische Lückenwahl.
 *
 * ============================================================
 *  THEORIE-FORMAT (theory)
 * ============================================================
 *
 *    {id: 1, title: "Thema-Titel", html: `<h2>...</h2><p>...</p>`}
 *
 *  Verfügbare HTML-Tags in html: h2, h3, p, ul/ol/li, strong,
 *  em, code, table, hr
 *
 *  Ein theory-Eintrag mit id:N verknüpft sich automatisch mit
 *  kk- und lt-Einträgen mit derselben id:N. Ist kein theory-
 *  Eintrag für eine ID vorhanden, erscheint kein Theorie-Button.
 *
 * ============================================================
 */

const SUBJECTS = [

 /* ── SUBJECT: Public Economics (Comprehensive Edition) ─────── */
{
  name: "Public Economics",
  icon: "🏛️",
  description: "Advanced Theory and Applications: Inequality, Rent-Seeking, and Impure Public Goods",

  theory: [
    {id: 1, title: "Definitions of Income and Equivalence Scales", html: `
      <h2>Definitions of Income</h2>
      <p>Measuring income is complex because income is a <strong>flow</strong> that is typically measured over a specific period of time.</p>

      <h3>Simons (1938) Definition</h3>
      <p>Simons introduced a comprehensive and backward-looking definition of personal income. According to Simons, personal income is the sum of:</p>
      <ul>
        <li>the value of <strong>consumption</strong>, and</li>
        <li>the <strong>change in the value of the store of wealth</strong>.</li>
      </ul>
      <p>A key implication of this definition is that <strong>capital gains are treated as income even when they have not yet been realized</strong>.</p>

      <h3>Hicks (1939) Definition</h3>
      <p>Hicks proposed a forward-looking and welfare-based concept of income. He defined income as the <strong>maximum amount a person can consume during a week and still expect to be as well-off at the end of the week as at the beginning</strong>.</p>
      <p>This approach focuses more strongly on welfare and expectations. Although uncertainty can be incorporated, <strong>unexpected gains are generally not treated as income</strong>.</p>

      <h3>Practical Relevance</h3>
      <p>In practice, the definitions of income that are used in tax systems rarely correspond exactly to either the Simons or the Hicks definition.</p>

      <hr>

      <h2>Equivalence Scales</h2>
      <p>Households differ in size and demographic composition, for example in the number of adults, the number of children, and the ages of household members.</p>
      <p>Because a larger household needs more income than a smaller household to achieve the same level of welfare, observed household income must be <strong>adjusted</strong> to make households comparable. This adjustment is made using <strong>equivalence scales</strong>.</p>

      <h3>Minimum Needs Scale</h3>
      <p>This approach is based on the cost of a <strong>basic bundle of goods and services</strong>, which differs depending on the household’s demographic composition.</p>
      <p>For example, in the Rowntree scale, <strong>$60 for a single person is considered equivalent to $100 for a couple</strong>.</p>

      <h3>Engel Scale</h3>
      <p>The Engel scale is based on the hypothesis that the <strong>share of expenditure devoted to food</strong> reflects a household’s welfare level.</p>
      <p>Two households are treated as having equivalent incomes if, despite demographic differences, they spend the <strong>same proportion of their budget on food</strong>.</p>

      <h3>Adult Good Scale</h3>
      <p>This method adjusts for the presence of children by focusing on goods that are consumed <strong>only by adults</strong>.</p>
      <p>Households are considered equivalent if their incomes generate the <strong>same level of demand for adult-specific goods</strong>.</p>

      <h3>General Approach</h3>
      <p>To overcome the limitations of the previous methods, a more general approach defines the equivalence scale as the <strong>minimum cost required to achieve a given utility level</strong> for a household with a particular demographic structure.</p>
      <p>This method assumes the existence of a formal <strong>household utility function</strong>, which can be used to derive equivalent budget lines for different household types.</p>
      `
    },
    {id: 2, title: "Inequality Measures", html: `
        <h2>Inequality</h2>
        <p>Inequality refers to an <strong>unequal distribution of income or wealth</strong> across a population.</p>
        <p>To quantify inequality, economists use <strong>inequality measures</strong>. These are single numbers that usually assign a value between <strong>0</strong> and <strong>1</strong> to a given distribution, where:</p>
        <ul>
          <li><strong>0</strong> indicates complete equality,</li>
          <li><strong>1</strong> indicates complete inequality.</li>
        </ul>

        <h3>The Pigou-Dalton Principle</h3>
        <p>A fundamental requirement for any credible inequality measure is the <strong>Pigou-Dalton Principle of Transfers</strong>.</p>
        <p>This principle states that an inequality index must <strong>decrease</strong> if income is transferred from a richer household to a poorer household, as long as:</p>
        <ul>
          <li>their relative rankings remain unchanged, and</li>
          <li>total income stays constant.</li>
        </ul>
        <p>Measures that do not satisfy this principle are generally seen as less suitable, because they are not sufficiently sensitive to redistributions within the income distribution.</p>

        <hr>

        <h2>Statistical Measures of Inequality</h2>

        <h3>The Range (R)</h3>
        <p>The <strong>Range</strong> is the simplest inequality measure. It is calculated as the difference between the <strong>highest</strong> and the <strong>lowest</strong> income, divided by the <strong>mean income</strong>.</p>
        <p>Its main weakness is that it ignores all incomes between the two extremes.</p>

        <h3>Relative Mean Deviation (D)</h3>
        <p>The <strong>Relative Mean Deviation</strong> takes all incomes into account.</p>
        <p>However, it is <strong>insensitive to transfers</strong> between households that are both on the same side of the mean income level, meaning it does not fully reflect some redistributions.</p>

        <h3>Coefficient of Variation (C)</h3>
        <p>The <strong>Coefficient of Variation</strong> satisfies the <strong>Pigou-Dalton Principle</strong>.</p>
        <p>Unlike the Range or the Relative Mean Deviation, it responds appropriately to redistributions from richer to poorer households.</p>
        <p>However, its effect depends only on the <strong>income difference</strong> between households. Some economists argue that transfers should have a larger effect when they occur at <strong>lower income levels</strong>.</p>

        <hr>

        <h2>The Lorenz Curve and the Gini Coefficient</h2>

        <h3>The Lorenz Curve</h3>
        <p>The <strong>Lorenz Curve</strong> is the most common graphical representation of inequality.</p>
        <p>It shows:</p>
        <ul>
          <li>the cumulative proportion of the <strong>population</strong> (ranked from poorest to richest), and</li>
          <li>the cumulative proportion of <strong>total income</strong> received by that population share.</li>
        </ul>
        <p>In a perfectly equal society, the Lorenz Curve would coincide with the <strong>45-degree diagonal</strong>.</p>
        <p>The further the Lorenz Curve lies below this diagonal, the <strong>greater the degree of inequality</strong>.</p>

        <h3>The Gini Coefficient (G)</h3>
        <p>The <strong>Gini Coefficient</strong> is the most common numerical measure of inequality.</p>
        <p>Geometrically, it is defined as <strong>twice the area between the Lorenz Curve and the 45-degree diagonal</strong>.</p>
        <p>The Gini Coefficient:</p>
        <ul>
          <li>provides a complete ranking of distributions, and</li>
          <li>satisfies the <strong>Pigou-Dalton Principle</strong>.</li>
        </ul>
        <p>However, it is a <strong>linear</strong> measure. This means its response to a transfer depends only on the <strong>rank positions</strong> of the households involved, not on their absolute income levels.</p>

        <hr>

        <h2>The Atkinson Measure</h2>
        <p>While statistical measures contain only <em>implicit</em> welfare assumptions, the <strong>Atkinson Measure</strong> makes welfare judgments <strong>explicit</strong> by starting from a <strong>social welfare function</strong>.</p>

        <h3>MEDE</h3>
        <p>The Atkinson approach uses the concept of <strong>Equally Distributed Equivalent Income (MEDE)</strong>.</p>
        <p>This is the level of income which, if received equally by everyone, would generate the <strong>same total utility</strong> as the actual unequal income distribution.</p>

        <h3>The Measure (A)</h3>
        <p>The Atkinson inequality measure is calculated as:</p>
        <p><code>A = 1 − MEDE / M̄</code></p>
        <p>where <code>M̄</code> is mean income.</p>

        <h3>Parameter e</h3>
        <p>The parameter <strong>e</strong> reflects the degree of <strong>social concern for equity</strong>.</p>
        <p>As <strong>e</strong> increases, the utility function becomes more <strong>concave</strong>, which means that society gives relatively more weight to income transfers benefiting the <strong>very poor</strong>.</p>

        <hr>

        <h2>Market Inequality vs. Net Inequality</h2>
        <p>In applied research, especially in studies by the <strong>OECD</strong>, economists distinguish between:</p>
        <ul>
          <li><strong>market inequality</strong> — inequality before taxes and transfers, and</li>
          <li><strong>net inequality</strong> — inequality after taxes and transfers.</li>
        </ul>
        <p>These studies show that tax and transfer systems are generally <strong>redistributive</strong>.</p>
        <p>At the same time, market inequality has increased over time in many countries.</p>
        <p>Researchers often control for <strong>age</strong>, for example by focusing on people <strong>under age 60</strong>, in order to avoid distortions caused by early retirement when analyzing labor market inequality.</p>
`},
   {id: 3, title: "Poverty, Equality of Opportunity, and Intergenerational Mobility", html: `
      <h2>Poverty</h2>
      <p>Poverty is defined as the possession of <strong>fewer resources than necessary to attain an acceptable standard of living</strong>.</p>
      <p>Poverty must be distinguished from <strong>inequality</strong>. Inequality refers to the overall distribution of resources across the population, whereas poverty focuses specifically on the existence of <strong>very low incomes</strong>.</p>

      <h3>Concepts and Delineation of Poverty</h3>
      <p>To determine who is poor and who is not, economists use a <strong>poverty line</strong>, denoted by <strong>z</strong>.</p>
      <p>There are two main approaches to defining this poverty line:</p>

      <h3>Absolute Poverty</h3>
      <p><strong>Absolute poverty</strong> assumes that there is a fixed minimum level of consumption that defines poverty, regardless of time or place.</p>
      <p>An example is the <strong>United States</strong>, where the poverty line is based on a package of minimum needs.</p>

      <h3>Relative Poverty</h3>
      <p><strong>Relative poverty</strong> is defined in relation to the standards of a specific society and period of time.</p>
      <p>An example is the <strong>United Kingdom</strong>, where the poverty line is defined as a proportion of the minimum benefit level.</p>

      <hr>

      <h2>Measuring Poverty</h2>
      <p>Economists use different poverty indices, ranging from simple counts to more comprehensive welfare-based measures.</p>

      <h3>Headcount Ratio (E)</h3>
      <p>The <strong>Headcount Ratio</strong> is the simplest poverty measure.</p>
      <p>It is calculated as the number of poor households or individuals <strong>q</strong> divided by the total population <strong>H</strong>.</p>
      <p>This measure is easy to compute, but it does <strong>not capture the depth of poverty</strong>.</p>

      <h3>Aggregate Poverty Gap (V)</h3>
      <p>The <strong>Aggregate Poverty Gap</strong> is the sum of all income shortfalls of those below the poverty line.</p>
      <p>For a poor household <strong>h</strong>, the poverty gap is:</p>
      <p><code>g_h = z − M_h</code></p>
      <p>This measure shows the <strong>total amount of income required to eliminate poverty</strong>.</p>
      <p>However, it does not account for the number of poor people or for transfers among the poor.</p>

      <h3>Income Gap Ratio (I)</h3>
      <p>The <strong>Income Gap Ratio</strong> measures the <strong>average shortfall</strong> of poor households relative to the poverty line.</p>
      <p>A weakness of this measure is that it can produce a paradoxical result: if one household is lifted out of poverty, the average poverty gap among the remaining poor may increase, making poverty appear worse even though one household has improved.</p>

      <h3>Sen Measure (S)</h3>
      <p>The <strong>Sen Measure</strong> is a more comprehensive poverty index.</p>
      <p>It combines:</p>
      <ul>
        <li>the <strong>headcount ratio</strong>,</li>
        <li>the <strong>average income shortfall</strong>, and</li>
        <li>the <strong>Gini coefficient among the poor</strong> (<code>G_p</code>).</li>
      </ul>
      <p>This measure is designed to satisfy important axioms and gives <strong>greater weight to the poorest households</strong>.</p>

      <h3>FGT Class (P<sub>α</sub>)</h3>
      <p>The <strong>FGT class of poverty measures</strong> forms a family of indices that satisfy <strong>subgroup consistency</strong>.</p>
      <p>This means that overall poverty rises whenever poverty rises in any subgroup of the population.</p>
      <p>Depending on the value of the parameter <strong>α</strong>, the FGT measure takes different forms:</p>
      <ul>
        <li><strong>α = 0</strong>: the measure is the <strong>Headcount Ratio</strong>,</li>
        <li><strong>α = 1</strong>: the measure combines the headcount and the poverty gap,</li>
        <li><strong>α &gt; 1</strong>: the measure becomes increasingly sensitive to the <strong>poorest households</strong>.</li>
      </ul>

      <hr>

      <h2>Equality of Opportunity</h2>
      <p><strong>Equality of Opportunity</strong> is a non-welfarist policy concept that focuses not only on outcomes, but also on <strong>how those outcomes are generated</strong>.</p>
      <p>It distinguishes between two main sources of inequality:</p>

      <h3>Effort</h3>
      <p><strong>Effort</strong> includes factors for which individuals are personally responsible.</p>
      <p>If inequality arises from different levels of effort, it is generally argued that policy <strong>should not compensate</strong> for these differences.</p>

      <h3>Circumstances</h3>
      <p><strong>Circumstances</strong> include factors beyond individual control, such as:</p>
      <ul>
        <li>family background,</li>
        <li>race,</li>
        <li>gender,</li>
        <li>place of birth.</li>
      </ul>
      <p>Inequality arising from such circumstances <strong>should be compensated</strong> according to the equality of opportunity view. This idea provides an important justification for <strong>affirmative action</strong>.</p>

      <h3>Measurement</h3>
      <p>Equality of opportunity is formally measured using <strong>stochastic dominance</strong>.</p>
      <p>Equality of opportunity exists when no set of circumstances is preferred by all individuals.</p>
      <p>The standard criterion is <strong>first-order stochastic dominance</strong>:</p>
      <p><code>F(x | s) ≤ F(x | s′)</code></p>
      <p>In addition, <strong>second-order stochastic dominance</strong> and <strong>Gini-type indices</strong> can also be used to detect inequality of opportunity.</p>

      <hr>

      <h2>Intergenerational Inequality and Mobility</h2>
      <p><strong>Social mobility</strong> occurs when children achieve a different social status from their parents.</p>
      <p>Formally, this means that there is no strong correlation between the <strong>education</strong> or <strong>earnings</strong> of parents and those of their children.</p>

      <h3>Measurement</h3>
      <p>Intergenerational mobility is measured using <strong>correlations</strong> and <strong>elasticities</strong>.</p>
      <p>An elasticity greater than <strong>1</strong> indicates that inequality is becoming stronger across generations.</p>

      <h3>Transition Matrices</h3>
      <p><strong>Transition matrices</strong> are used to estimate mobility at particular points of the income distribution.</p>
      <p>For example, in the United States, around <strong>40%</strong> of sons born to fathers in the lowest quintile remain in that same quintile.</p>

      <h3>Contributing Factors</h3>
      <p>Intergenerational mobility is influenced by both <strong>nature</strong> and <strong>nurture</strong>.</p>
      <p>Important contributing factors include:</p>
      <ul>
        <li>education,</li>
        <li>credit constraints,</li>
        <li>social segregation.</li>
      </ul>
      <p>These factors can reinforce attitudes and structures that help sustain inequality over time.</p>
    `},
    {id: 4, title: "Rent-Seeking", html: `
    <h2>Rent-Seeking</h2>
    <p><strong>Rent-seeking</strong>, also called <strong>privilege-seeking</strong>, refers to the <strong>unproductive activity of attempting to capture an existing income flow rather than creating a new one</strong>.</p>
    <p>This distinguishes rent-seeking from <strong>profit-seeking</strong>. In the ideal case, profit-seeking is socially beneficial because it creates new opportunities and generates <strong>innovation rents</strong>. By contrast, rent-seeking uses resources to create or preserve profitable opportunities that are <strong>socially harmful</strong>, for example by hiring lawyers or lobbyists to block substitute imports in order to protect a monopoly position.</p>

    <hr>

    <h2>Rent-Seeking Games</h2>
    <p>Rent-seeking games analyze how many resources will be wasted in the attempt to win a specific <strong>prize</strong> or <strong>rent</strong>, denoted by <strong>V</strong>.</p>
    <p>The resources spent in these games, such as lobbying expenditures or legal fees, are effectively <strong>burnt</strong>. They represent a <strong>net loss to society</strong> because they do not create additional output.</p>

    <h3>The Deterministic Game</h3>
    <p>In the <strong>deterministic game</strong>, there is no uncertainty. A marginally higher bid always guarantees victory.</p>

    <h3>Equilibrium</h3>
    <p>There is <strong>no pure-strategy equilibrium</strong> in this setting, because each competitor always has an incentive to bid slightly more than the rival in order to secure the entire prize.</p>
    <p>Instead, the equilibrium is in <strong>mixed strategies</strong>, where players choose bids according to a probability distribution with density <strong>1 / V</strong>.</p>

    <h3>Complete Dissipation Theorem</h3>
    <p>The <strong>Complete Dissipation Theorem</strong> states that if there are <strong>two or more competitors</strong> in a deterministic rent-seeking game, the <strong>total expected resources expended are exactly equal to the value of the prize V</strong>.</p>
    <p>As a result, the existence of the prize yields <strong>no net social benefit</strong>, because its entire value is dissipated in the rent-seeking process.</p>

    <h3>The Probabilistic Game</h3>
    <p>In the <strong>probabilistic game</strong>, a higher bid increases the probability of winning, but it does <strong>not guarantee success</strong>.</p>

    <h3>Logic of the Model</h3>
    <p>The usual assumption is that an individual's probability of winning is equal to that individual's <strong>share of total rent-seeking expenditure</strong>.</p>

    <h3>Partial Dissipation Theorem</h3>
    <p>In a probabilistic game with <strong>n competitors</strong>, the <strong>total expected resources expended</strong> equal the fraction:</p>
    <p><code>(n − 1) / n · V</code></p>
    <p>This means that full dissipation does not occur, but the total waste increases as the number of competitors grows.</p>

    <h3>Outcome</h3>
    <p>Although society does not lose the full value of the prize when the number of competitors is finite, the fraction of the prize wasted becomes larger as <strong>n</strong> increases and tends toward <strong>1</strong>.</p>

    <hr>

    <h2>Social and Economic Consequences</h2>

    <h3>Monopoly Cost</h3>
    <p>Rent-seeking theory changes the assessment of the <strong>social cost of monopoly</strong>.</p>
    <p>In standard economic analysis, the cost of monopoly is usually limited to the <strong>deadweight loss</strong>, denoted by <strong>d</strong>.</p>
    <p>Rent-seeking analysis argues that the true social cost is much larger:</p>
    <p><code>π + d</code></p>
    <p>Here, <strong>π</strong> represents monopoly profits, which may be fully dissipated by competitors trying to secure or defend the monopoly position.</p>

    <h3>Resource Misallocation</h3>
    <p>Rent-seeking leads to <strong>resource misallocation</strong> because it shifts resources away from productive uses and toward unproductive activities such as lobbying, legal protection, and privilege-seeking.</p>

    <h3>Reduction in Potential Output</h3>
    <p>By diverting labor and other resources away from production, rent-seeking reduces the economy’s <strong>potential output</strong>.</p>
    <p>In terms of production theory, the <strong>production possibility frontier (PPF)</strong> shifts inward.</p>

    <hr>

    <h2>Informative Lobbying</h2>
    <p><strong>Lobbying</strong> is a major form of rent-seeking. It can make a positive contribution only if lobbyists are <strong>better informed than the policy-maker</strong> and are able to provide <strong>credible information</strong>.</p>

    <h3>Credibility Condition</h3>
    <p>A policy-maker will accept a lobbyist’s report as honest only if the divergence in preferences between the two is sufficiently small.</p>
    <p>Let <strong>Δ</strong> denote this preference divergence. In a two-state model, the condition for an honest report is:</p>
    <p><code>Δ ≤ 2 / (q_h − q_l)</code></p>
    <p>If this condition is satisfied, truthful communication is possible.</p>

    <h3>Failure of Honest Reporting</h3>
    <p>If this condition is <strong>not</strong> satisfied, the lobbyist has a rational incentive to <strong>misreport</strong> information.</p>
    <p>In that case, the policy-maker will ignore the report and choose a policy that is likely to be <strong>incorrect in both possible states of the world</strong>.</p>
`},
    {id: 5, title: "Informative Lobbying", html: `
      <h2>Informative Lobbying</h2>
      <p><strong>Informative lobbying</strong> occurs when a lobbyist, who is better informed about the future state of the world than the policy-maker, communicates <strong>credible information</strong> that improves policy decisions.</p>
      <p>Although lobbying is often seen as an <strong>unproductive rent-seeking activity</strong>, it can make a positive contribution if it helps solve the problem of <strong>information transmission</strong>.</p>

      <hr>

      <h2>The Conflict of Interest</h2>
      <p>The central difficulty of informative lobbying is that the <strong>preferences of the lobbyist and the policy-maker are not usually identical</strong>.</p>
      <p>In economic models, this disagreement is represented by the parameter <strong>Δ</strong>, which measures the <strong>divergence of preferences</strong>.</p>

      <h3>The Policy-Maker</h3>
      <p>The <strong>policy-maker</strong> wants to choose a policy, denoted by <strong>p</strong> or <strong>π</strong>, that matches the true state of the world, denoted by <strong>q</strong> or <strong>θ</strong>.</p>
      <p>The objective is to maximize <strong>social welfare</strong> by selecting the policy that is appropriate for the actual state.</p>

      <h3>The Lobbyist</h3>
      <p>The <strong>lobbyist</strong> knows the true state of the world, but does not share the same objective as the policy-maker.</p>
      <p>Instead, the lobbyist prefers a policy shifted in their own favor, namely <strong>q + Δ</strong>.</p>

      <hr>

      <h2>The Condition for Credibility</h2>
      <p>A policy-maker will only rely on a lobbyist’s message if that message is <strong>credible</strong>.</p>
      <p>In the basic model, there are two possible states of the world:</p>
      <ul>
        <li>a <strong>low state</strong> <code>q_l</code>, and</li>
        <li>a <strong>high state</strong> <code>q_h</code>.</li>
      </ul>
      <p>The problem is that the lobbyist may have an incentive to report the <strong>high state</strong> even when the true state is low, because this can induce the policy-maker to choose a higher policy level.</p>

      <h3>Truthful Reporting</h3>
      <p>Lobbying is informative only if the lobbyist has <strong>no rational incentive to lie</strong>.</p>
      <p>In the two-state model, truthful reporting can be sustained only if:</p>
      <p><code>Δ ≤ (q_h − q_l) / 2</code></p>
      <p>This means that the disagreement between the lobbyist and the policy-maker must be sufficiently small.</p>
      <p>More precisely, the preference divergence <strong>Δ</strong> must be less than or equal to <strong>half the distance between the two states</strong>.</p>

      <h3>Failure of Credibility</h3>
      <p>If <strong>Δ</strong> is too large, the lobbyist will always prefer to report the <strong>high state</strong>, regardless of the truth.</p>
      <p>Once the policy-maker understands this, the report loses credibility and is ignored.</p>
      <p>The policy-maker then chooses a <strong>default policy</strong>, which is likely to be incorrect in both possible states of the world.</p>

      <hr>

      <h2>Many States and Partial Revelation</h2>
      <p>When the number of possible states increases, the differences between neighboring states, such as <code>q_(i+1) − q_i</code>, become smaller.</p>
      <p>This makes credible communication more difficult, because even a small preference divergence <strong>Δ</strong> may become too large relative to the distance between states.</p>

      <h3>Partial Revelation</h3>
      <p>To address this problem, models of informative lobbying often rely on <strong>partial revelation</strong> instead of full revelation.</p>

      <h3>Partitioning</h3>
      <p>The possible states are grouped into broader <strong>partitions</strong>, for example:</p>
      <ul>
        <li>a <strong>Low</strong> group (<strong>L</strong>), and</li>
        <li>a <strong>High</strong> group (<strong>H</strong>).</li>
      </ul>

      <h3>Group Reporting</h3>
      <p>The lobbyist does not report the exact state, but only indicates <strong>which partition</strong> the true state belongs to.</p>
      <p>This reduces the temptation to misreport, because the communicated information is less precise.</p>

      <h3>Honesty Range</h3>
      <p>The lobbyist reports the partition honestly only if <strong>Δ</strong> lies within a certain interval:</p>
      <p><code>(q_(i+1) − p(H) − p(L)) / 2 ≤ Δ ≤ (q_i − p(H) − p(L)) / 2</code></p>
      <p>Here, <code>p(L)</code> and <code>p(H)</code> are the policies chosen by the policy-maker after receiving a low or high report.</p>
      <p>Even under partial revelation, credible information transmission is possible only when the divergence of preferences remains sufficiently limited.</p>
`},
 {id: 6, title: "Club Goods", html: `
      <h2>Club Goods</h2>
      <p>A <strong>club good</strong> is a type of <strong>impure public good</strong> that is either <strong>nonrivalrous</strong> or only <strong>partly rivalrous</strong>, but for which <strong>exclusion</strong> of non-members is possible.</p>
      <p>This distinguishes club goods from <strong>pure public goods</strong>, where providers cannot prevent individuals from consuming the good.</p>
      <p>In the case of club goods, access can be restricted either through <strong>literal exclusion</strong>, such as membership checks, or through <strong>legal exclusion</strong>, such as formal entitlement rules.</p>
      <p>Typical examples include <strong>sports clubs</strong>, <strong>shared facilities</strong>, and international organizations such as <strong>NATO</strong>.</p>

      <hr>

      <h2>Preference Revelation</h2>
      <p>A special feature of club goods is that the problem of <strong>preference revelation</strong> is largely absent.</p>
      <p>Because individuals must actively decide whether to <strong>join the club</strong> and pay a <strong>membership fee</strong>, their decision reveals their willingness to pay for the good provided.</p>
      <p>The collection of membership fees also ensures that the club can, in principle, <strong>break even financially</strong>.</p>

      <hr>

      <h2>The Fundamental Trade-off</h2>
      <p>According to the <strong>Buchanan Model (1965)</strong>, internal efficiency in a club is achieved by balancing two opposing effects.</p>

      <h3>Cost Sharing</h3>
      <p>When more members are admitted, existing members benefit because the <strong>total cost of providing the good is shared among more people</strong>.</p>
      <p>This lowers the <strong>individual fee</strong> or cost burden for each member.</p>

      <h3>Congestion</h3>
      <p>At the same time, adding more members can reduce utility because it leads to <strong>congestion</strong>.</p>
      <p>Congestion means that the club good or facility becomes <strong>overcrowded</strong> or <strong>over-utilized</strong>, which lowers the benefit each member receives.</p>

      <hr>

      <h2>Optimization Conditions</h2>
      <p>Efficiency in a <strong>single-product club</strong> is achieved when two conditions are satisfied.</p>

      <h3>Optimal Provision</h3>
      <p>The first condition is a variant of the <strong>Samuelson condition</strong>.</p>
      <p>The sum of the <strong>marginal rates of substitution</strong> of all club members must equal the <strong>marginal cost</strong> of providing the good:</p>
      <p><code>n × MRS = MC</code></p>
      <p>This determines the <strong>optimal quantity of the club good</strong>.</p>

      <h3>Optimal Membership</h3>
      <p>The second condition determines the <strong>optimal number of members</strong>.</p>
      <p>Efficiency requires that the <strong>marginal utility cost of an additional member</strong>—that is, the utility loss caused by congestion—must be exactly equal to the <strong>benefit from improved cost sharing</strong>.</p>
      <p>This condition can be written as:</p>
      <p><code>MRS_n,x = −C(G) / n²</code></p>

      <hr>

      <h2>Economy-wide Efficiency</h2>
      <p>Even if individual clubs are internally efficient, this does <strong>not automatically guarantee efficiency for the economy as a whole</strong>.</p>

      <h3>Small Clubs</h3>
      <p>If the <strong>optimal club size is small</strong> relative to the total population, the economy will tend toward efficiency as the number of optimally sized clubs increases.</p>
      <p>In the limit, the population can be divided into many clubs operating close to their efficient size.</p>

      <h3>Large Clubs</h3>
      <p>If the <strong>optimal membership size is large</strong> relative to the total population, an <strong>integer problem</strong> arises.</p>
      <p>In this case, it is impossible to divide the population into a set of clubs that all have the exact efficient size.</p>
      <p>As a result, some individuals may be <strong>excluded</strong>, or some clubs may have to operate with <strong>inefficient membership levels</strong>.</p>
`},
   {id: 7, title: "Local Public Goods and the Tiebout Hypothesis", html: `
      <h2>Local Public Goods</h2>
      <p><strong>Local public goods</strong> are a specific type of <strong>impure public good</strong> that are defined mainly by <strong>geographic restriction</strong>.</p>
      <p>They provide benefits only to individuals living within a particular <strong>area</strong> or <strong>locality</strong>.</p>
      <p>Unlike pure public goods, where exclusion is often impossible, exclusion from a local public good is usually a matter of <strong>policy</strong>.</p>
      <p>For example, local governments may use <strong>residency requirements</strong> or <strong>immigration controls</strong> to restrict access.</p>

      <hr>

      <h2>Dynamics of Local Public Goods</h2>
      <p>The provision of local public goods involves a basic economic trade-off related to <strong>population size</strong>.</p>

      <h3>Cost Sharing</h3>
      <p>As the population of a locality increases, the <strong>cost per resident</strong> of financing the public good falls.</p>
      <p>This is because the total cost of provision, denoted by <strong>G</strong>, is divided among a larger number of residents, denoted by <strong>h</strong>.</p>

      <h3>Congestion</h3>
      <p>At the same time, a larger population can create <strong>congestion</strong>.</p>
      <p>Congestion means crowding or the dilution of fixed local resources, which reduces the <strong>utility of individual residents</strong>.</p>

      <h3>Efficiency Rule</h3>
      <p>A locality achieves optimal provision when it satisfies a local variant of the <strong>Samuelson rule</strong>.</p>
      <p>This condition requires that the sum of the marginal rates of substitution equals <strong>1</strong>:</p>
      <p><code>h · U_G / U_x = 1</code></p>

      <h3>Free Location Choice</h3>
      <p>In a system without enforced exclusion, individuals can move freely between jurisdictions.</p>
      <p>Population will then redistribute itself until an equilibrium is reached in which <strong>no consumer has an incentive to move</strong>.</p>
      <p>However, free mobility alone does <strong>not guarantee efficiency</strong>, because the movement of one individual affects the welfare of both the locality they leave and the locality they join.</p>
      <p>These effects are examples of <strong>non-market linkages</strong>.</p>

      <hr>

      <h2>The Tiebout Hypothesis</h2>
      <p>The <strong>Tiebout Hypothesis</strong>, developed by <strong>Charles Tiebout in 1956</strong>, argues that the usual inefficiencies associated with public goods, especially the <strong>free-rider problem</strong>, do not necessarily apply at the local level.</p>

      <h3>Core Mechanism: Voting with Feet</h3>
      <p>The central idea is that if there are enough communities offering different combinations of <strong>taxes</strong> and <strong>public goods</strong>, consumers will behave like <strong>competitive buyers</strong> in a private market.</p>
      <p>By choosing to live in the community that best matches their preferences, consumers effectively <strong>vote with their feet</strong>.</p>
      <p>This process replaces the normal market test of willingness to pay and forces individuals to reveal their preferences through their <strong>location choice</strong>.</p>
      <p>As a result, the information problem that usually complicates the provision of national public goods may be reduced at the local level.</p>

      <hr>

      <h2>The Seven Assumptions for Efficiency</h2>
      <p>For the Tiebout model to generate a market-like efficient outcome, seven strong assumptions are required.</p>

      <h3>1. Full Mobility</h3>
      <p>Consumer-voters are completely free to move to the community that best satisfies their preferences.</p>

      <h3>2. Full Knowledge</h3>
      <p>Consumers possess perfect information about the <strong>revenue</strong> and <strong>expenditure patterns</strong> of all communities.</p>

      <h3>3. Large Number of Communities</h3>
      <p>There must be many communities so that individuals have a wide range of options to choose from.</p>

      <h3>4. No Employment Restrictions</h3>
      <p>Location decisions must not be determined by employment.</p>
      <p>This requires either that income comes from <strong>rents or dividends</strong>, or that employment opportunities are identical across communities.</p>

      <h3>5. No Externalities</h3>
      <p>Public services provided by one community must not create benefits or costs for neighboring communities.</p>

      <h3>6. Optimal Community Size</h3>
      <p>For every bundle of public services, there is an <strong>optimal population size</strong> at which average cost is minimized.</p>

      <h3>7. Community Adaptation</h3>
      <p>Communities below their optimal size try to attract new residents in order to reduce average costs.</p>
      <p>Communities above the optimum attempt to limit further growth, for example through <strong>zoning laws</strong>, or try to reduce population.</p>

      <hr>

      <h2>Limitations and Empirical Evidence</h2>

      <h3>Limitations</h3>
      <p>The Tiebout Hypothesis has important limitations in practice.</p>
      <p>Real-world mobility is constrained by factors such as <strong>housing market frictions</strong> and the fact that many people are tied to a location because of their <strong>employment</strong>.</p>

      <h3>Tax Capitalization</h3>
      <p>An important empirical study by <strong>Oates (1969)</strong> found that house prices in New Jersey were higher in communities that provided more local public goods.</p>
      <p>This suggests that the benefits of local public services are <strong>capitalized into property values</strong>.</p>

      <h3>Preference Sorting</h3>
      <p><strong>Gramlich and Rubinfeld (1982)</strong> found evidence from Michigan suburbs that residents sort themselves according to their preferences.</p>
      <p>Variation in demand within a given location was much smaller than variation across locations, which supports the idea of <strong>preference sorting</strong>.</p>

      <h3>Overall Assessment</h3>
      <p>Tiebout’s argument is ultimately that, although the model is highly abstract, local government may represent a part of the public sector in which the allocation of public goods can reflect individual preferences <strong>almost as effectively as private markets</strong>.</p>
`},
  ],

  kk: [
    /* ID 1 — Income Definitions and Equivalence Scales */
    {id:1, question:"How does Simons (1938) define personal income?", answer:"The sum of (1) value of consumption and (2) change in value of store of wealth.", category:"Inequality"},
    {id:1, question:"What is the Hicks (1939) income definition?", answer:"The maximum value one can consume in a week and expect to be as well-off at the end as at the beginning.", category:"Inequality"},
    {id:1, question:"What is the Rowntree equivalence scale ratio?", answer:"$60 for a single person is equivalent to $100 for a couple.", category:"Inequality"},
    {id:1, question:"What is the underlying hypothesis of the Engel scale?", answer:"The expenditure share of food is proportional to welfare.", category:"Inequality"},
    {id:1, question:"How does the 'Adult Good' scale work?", answer:"It adjusts income for children by keeping the consumption of goods used only by adults constant.", category:"Inequality"},

    /* ID 2 — Inequality Measures */
    {id:2, question:"Define the Range (R) as an inequality measure.", answer:"R = (MH - M1) / HM̄; it measures the gap between extreme incomes relative to the mean.", category:"Inequality"},
    {id:2, question:"What is the main weakness of the Relative Mean Deviation (D)?", answer:"It is insensitive to transfers between households on the same side of the mean.", category:"Inequality"},
    {id:2, question:"State the Pigou-Dalton Principle of Transfers.", answer:"Inequality must decrease if income is transferred from a rich to a poor household without changing their rank.", category:"Inequality"},
    {id:2, question:"What are the axes of a Lorenz Curve?", answer:"Proportion of population (x-axis) vs. proportion of total income (y-axis).", category:"Inequality"},
    {id:2, question:"What is the geometric interpretation of the Gini coefficient?", answer:"It is twice the area between the Lorenz curve and the 45-degree diagonal.", category:"Inequality"},
    {id:2, question:"Why is the Gini coefficient described as 'linear'?", answer:"The response to a transfer depends only on rank positions i and j, not on absolute income levels.", category:"Inequality"},
    {id:2, question:"What does Atkinson's Theorem (14.2) state?", answer:"If Lorenz curves don't cross, every symmetric and concave welfare function prefers the distribution closer to the diagonal.", category:"Inequality"},
    {id:2, question:"Define Equally Distributed Equivalent Income (MEDE).", answer:"The income level which, if held by everyone, yields the same total utility as the current distribution.", category:"Inequality"},
    {id:2, question:"What does the Atkinson parameter 'e' represent?", answer:"Social concern for equity; a higher 'e' makes the utility function more concave.", category:"Inequality"},
    {id:2, question:"How is the Atkinson measure (A) calculated?", answer:"A = 1 - MEDE / M̄.", category:"Inequality"},
    {id:2, question:"What does market inequality measure according to the OECD study?", answer:"Inequality levels before the tax-transfer system (taxes and transfers) are applied.", category:"Inequality"},
    {id:2, question:"Why control for 'under age 60' in inequality studies?", answer:"To remove the effects of early retirement and focus on labor market inequality.", category:"Inequality"},

    /* ID 3 — Poverty and Opportunity */
    {id:3, question:"Absolute vs. Relative Poverty?", answer:"Absolute: fixed minimum consumption. Relative: defined by the standards of a specific society and time.", category:"Poverty"},
    {id:3, question:"Define the Headcount Ratio (E).", answer:"E = q/H, where q is the number of poor and H is the total population.", category:"Poverty"},
    {id:3, question:"What is the Aggregate Poverty Gap (V)?", answer:"The sum of all income gaps (gh = z - Mh) for those below the poverty line.", category:"Poverty"},
    {id:3, question:"Limitation of the Income Gap Ratio (I)?", answer:"It can show increased poverty if a transfer raises a poor household out of poverty.", category:"Poverty"},
    {id:3, question:"What components does the Sen Measure combine?", answer:"Headcount ratio, income shortfall (gap ratio), and the Gini coefficient of the poor.", category:"Poverty"},
    {id:3, question:"What is 'Subgroup Consistency'?", answer:"A measure is consistent if aggregate poverty rises when poverty in one subgroup increases.", category:"Poverty"},
    {id:3, question:"What is the FGT P-alpha measure when alpha = 1?", answer:"The product of the headcount ratio and the income gap ratio (E * I).", category:"Poverty"},
    {id:3, question:"Equality of Opportunity: Compensating for 'Circumstances'?", answer:"Inequality from factors beyond individual control (race, background) should be compensated.", category:"Equity"},
    {id:3, question:"How is Inequality of Opportunity measured?", answer:"Via first or second-order stochastic dominance of outcome distributions based on circumstances.", category:"Equity"},
    {id:3, question:"Definition of Intergenerational Mobility?", answer:"A lack of correlation between the status (earnings/education) of parents and children.", category:"Equity"},
    {id:3, question:"What is the '1 - correlation' measure?", answer:"A measure of intergenerational mobility.", category:"Equity"},
    {id:3, question:"Use of Transition Matrices in mobility?", answer:"To estimate mobility at specific points in the income distribution (e.g., quintiles).", category:"Equity"},

    /* ID 4 — Rent-Seeking Games */
    {id:4, question:"Innovation Rent vs. Situation Rent?", answer:"Innovation: consumers benefit from new products. Situation: consumers suffer from restricted alternatives.", category:"Rent-Seeking"},
    {id:4, question:"Profit-seeking vs. Rent-seeking (resources)?", answer:"Profit-seeking is productive and beneficial; Rent-seeking is an unproductive expenditure to capture wealth.", category:"Rent-Seeking"},
    {id:4, question:"Equilibrium in Deterministic RS games?", answer:"Only exists in mixed strategies; players play each value with probability 1/V.", category:"Rent-Seeking"},
    {id:4, question:"The Complete Dissipation Theorem?", answer:"In a deterministic game with 2+ players, total resources expended exactly equal the prize value V.", category:"Rent-Seeking"},
    {id:4, question:"What is the symmetric expenditure in a Probabilistic game?", answer:"B* = [(n-1)/n²] * V.", category:"Rent-Seeking"},
    {id:4, question:"The Partial Dissipation Theorem?", answer:"In a probabilistic game, resources expended are a fraction (n-1)/n of the prize V.", category:"Rent-Seeking"},
    {id:4, question:"Why is the social cost of monopoly π + d?", answer:"Standard loss (d) plus the monopoly profit (π) wasted in rent-seeking to get the monopoly.", category:"Rent-Seeking"},
    {id:4, question:"Lobbying and the PPF?", answer:"Lobbying shifts the Production Possibility Frontier inward as labor is diverted from production.", category:"Rent-Seeking"},
    {id:4, question:"Equilibrium output with successful tariff lobbying?", answer:"Falls at the rate of the tariff squared (τ²).", category:"Rent-Seeking"},

    /* ID 5 — Informative Lobbying */
    {id:5, question:"Informative Lobbying: Preference Divergence (Δ)?", answer:"Honest reports require Δ to be small enough so the lobbyist doesn't benefit from lying.", category:"Rent-Seeking"},
    {id:5, question:"Truth-telling condition for lobbyist (2 states)?", answer:"Δ ≤ (qh - ql) / 2.", category:"Rent-Seeking"},
    {id:5, question:"What is 'Partial Revelation'?", answer:"Partitioning states into reports (Low/High) when truth-telling is impossible for every state.", category:"Rent-Seeking"},
    {id:5, question:"How can Rent-Seeking be controlled?", answer:"Transparency, registering lobbyists, limiting campaign budgets, and non-discriminatory policies.", category:"Rent-Seeking"},
    {id:5, question:"Why might a policy-maker ignore a lobbyist?", answer:"When Δ is too large, the lobbyist always reports the high state, making the report not credible.", category:"Rent-Seeking"},

    /* ID 6 — Club Goods */
    {id:6, question:"Definition 7.1: Club Good?", answer:"A good that is nonrivalrous or partly rivalrous but where exclusion is possible.", category:"Club Goods"},
    {id:6, question:"How do clubs reveal consumer preferences?", answer:"Through the consumer's choice to join (revealed preference).", category:"Club Goods"},
    {id:6, question:"The Buchanan Model tradeoff?", answer:"Increasing membership spreads costs but increases congestion facilities.", category:"Club Goods"},
    {id:6, question:"Club Provision Condition (MRS)?", answer:"n * MRS(G, x) = MC(G).", category:"Club Goods"},
    {id:6, question:"Club Membership Condition?", answer:"MRS(n, x) = -C(G)/n² (marginal utility cost = cost sharing benefit).", category:"Club Goods"},
    {id:6, question:"Clubs and the Economy: Congestion case?", answer:"Efficient if optimal membership is small relative to population (limiting case).", category:"Club Goods"},
    {id:6, question:"The problem with 'Large Clubs'?", answer:"Allocation problems; some consumers excluded or clubs have inefficient membership.", category:"Club Goods"},
    {id:6, question:"Strategic consideration in clubs (Fees)?", answer:"Small clubs may offer low fees to attract members; efficient clubs may charge more.", category:"Club Goods"},
    {id:6, question:"Clubs and Monopoly Markets analogy?", answer:"Small groups can affect their utility by forming efficiently sized clubs.", category:"Club Goods"},
    {id:6, question:"Internal vs. Economy-wide Efficiency?", answer:"Clubs always reach internal efficiency, but not always economy-wide efficiency.", category:"Club Goods"},
    {id:6, question:"Role of James Buchanan (1965)?", answer:"Originator of the theory of clubs.", category:"Club Goods"},

    /* ID 7 — Local Public Goods / Tiebout */
    {id:7, question:"Definition 7.2: Local Public Good?", answer:"A good whose benefits are restricted to a specific geographical area.", category:"Local Public Goods"},
    {id:7, question:"LPG: Cost per person?", answer:"G/h, where h is the locality population.", category:"Local Public Goods"},
    {id:7, question:"Why do population flows fail efficiency in LPG?", answer:"Non-market linkages: one person's move affects both localities' welfare.", category:"Local Public Goods"},
    {id:7, question:"The Tiebout Hypothesis core claim?", answer:"Consumers 'vote with their feet' among communities to reveal preferences and reach efficiency.", category:"Local Public Goods"},
    {id:7, question:"Tiebout's view on the LPG externality?", answer:"It is a small-numbers issue that a large market of communities can solve.", category:"Local Public Goods"},
    {id:7, question:"Tiebout: Housing Market Requirement?", answer:"No frictions in housing markets.", category:"Local Public Goods"},
    {id:7, question:"Tiebout: Income Source Requirement?", answer:"Incomes from rents or replicated employment opportunities across communities.", category:"Local Public Goods"},
    {id:7, question:"Oates (1969) empirical test?", answer:"Higher public good provision leads to higher house prices (capitalization).", category:"Local Public Goods"},
    {id:7, question:"Gramlich and Rubinfeld (1982) test?", answer:"Preference sorting: demand variation within locations is less than variation across locations.", category:"Local Public Goods"},
    {id:7, question:"Equilibrium condition in LPG?", answer:"No incentive for any consumer to move between localities.", category:"Local Public Goods"},
    {id:7, question:"Samuelson rule for Local Public Goods?", answer:"h * (UG / Ux) = 1.", category:"Local Public Goods"}
  ],

  lt: [
    {id:1, category:"Inequality", question:"Explain the two main income definitions.", answer:"Simons (1938) focuses on the sum of {{consumption}} and wealth change. Hicks (1939) focuses on the maximum value one can consume to remain equally {{well-off}} at the end of the week."},

    {id:2, category:"Inequality", question:"How do statistical measures quantify inequality?", answer:"The {{Range}} only uses extreme incomes. The {{Gini coefficient}} equals twice the area under the {{Lorenz curve}}. The {{Atkinson}} measure uses {{MEDE}} and parameter {{e}} to reflect equity concerns."},

    {id:3, category:"Poverty", question:"How do advanced poverty measures function?", answer:"The {{Sen}} measure combines headcount and gap ratios. For {{subgroup consistency}}, economists use the {{FGT}} class of measures (P-alpha)."},

    {id:4, category:"Rent-Seeking", question:"What are the theorems of dissipated rents?", answer:"The {{Complete Dissipation}} theorem applies to {{deterministic}} games (total waste = V). The {{Partial Dissipation}} theorem applies to {{probabilistic}} games (total waste = (n-1)/n * V)."},

    {id:5, category:"Lobbying", question:"When is lobbying credible?", answer:"Reports are honest if divergence {{Δ}} is small. If there are many states, the lobbyist uses {{partial revelation}} by {{partitioning}} states into groups."},

    {id:6, category:"Club Goods", question:"How is efficient club size reached?", answer:"Efficiency balances {{cost sharing}} against {{congestion}}. Internal efficiency follows the {{Samuelson}} rule variant: n * {{MRS}} = {{MC}}."},

    {id:7, category:"Tiebout", question:"What is the Tiebout mechanism?", answer:"Consumers {{vote with their feet}} among communities. This reveals {{preferences}} and achieves efficiency if there are no frictions in {{housing markets}} or employment."}
  ]
},

  /* ── WEITERES FACH HIER EINFÜGEN ─────────────────────── */
  
  {
    name: "Microeconomics 2",
    icon: "",
    description: "Beschreibung",
    kk: [
      {id: 1, category: "Axioms of Choice", question: "What does the axiom of completeness assume about a consumer's ability to choose?", answer: "It assumes that for any two bundles A and B, an individual can always rank them as A⪰B, B⪰A, or both (indifference)."},
      {id: 1, category: "Axioms of Choice", question: "When is a preference relation defined as \"rational\" in microeconomic theory?", answer: "A preference relation is rational if it satisfies both completeness and transitivity."},
      {id: 1, category: "Axioms of Choice", question: "In preference theory, what is considered the \"primitive\" concept and what are the \"derived\" concepts?", answer: "The weak preference relation (⪰) is the primitive concept. The strict preference relation (≻) and the indifference relation (∼) are derived from it."},

      {id: 2, category: "Continuity and Lexicographic Preferences", question: "Why do lexicographic preferences (⪰L) violate the axiom of continuity?", answer: "Because an infinitesimal change in the quantity of the primary good can cause a sudden, massive jump in preference, rather than a smooth transition."},
      {id: 2, category: "Continuity and Lexicographic Preferences", question: "Give a real-world example of a lexicographic ordering.", answer: "Sports tiebreakers: Teams are ranked first by points; only if points are equal is the second criterion (goal difference) considered."},
      {id: 2, category: "Continuity and Lexicographic Preferences", question: "What are two real-world examples where lexicographic preference orderings are commonly applied?", answer: "(1) Sports tiebreakers, where teams are ranked first by points and only then by goal difference. (2) Job candidate rankings, where applicants are first filtered by degree type and then by GPA."},

      {id: 3, category: "Defining the Utility Function", question: "What does it mean for utility to be an \"ordinal\" concept?", answer: "It means the numbers only provide a ranking of bundles; the specific numerical values do not measure how much more one bundle is liked than another."},
      {id: 3, category: "Defining the Utility Function", question: "What is the effect of an order-preserving (monotone) transformation on a utility function?", answer: "It represents the exact same preferences because the ranking of any two bundles remains unchanged."},
      {id: 3, category: "Defining the Utility Function", question: "Beyond physical goods, what other arguments can be included in a utility function to model complex human behavior?", answer: "Utility functions can include peer group consumption (status), personal experiences (habits), leisure, and consumption in different time periods (dynamic models)."},

      {id: 4, category: "Monotonicity and Desirability", question: "How does Strong Monotonicity (SM) differ from Monotonicity (M)?", answer: "SM requires strict preference if at least one good increases and none decrease, whereas M only requires strict preference if all goods in the bundle increase."},
      {id: 4, category: "Monotonicity and Desirability", question: "If preferences satisfy strong monotonicity, can a commodity be a bad or a neuter?", answer: "No. Under SM, more of any good must strictly increase utility, ruling out goods that decrease utility (bads) or have no effect (neuters)."},
      {id: 4, category: "Monotonicity and Desirability", question: "Why does strong monotonicity (SM) specifically rule out the existence of a bad commodity?", answer: "A bad is something where more is strictly worse; however, SM dictates that adding more of any good, holding others constant, must strictly improve preference."},

      {id: 5, category: "Substitutability and Indifference Curves", question: "What is the Marginal Rate of Substitution (MRSx,y)?", answer: "It is the negative slope of the indifference curve, measuring a consumer's willingness to trade y for x while staying at the same utility level."},
      {id: 5, category: "Substitutability and Indifference Curves", question: "Why is it logically impossible for two indifference curves to intersect?", answer: "Intersecting curves would violate transitivity and monotonicity, as a bundle on a higher curve would simultaneously be indifferent to a bundle on a lower curve."},
      {id: 5, category: "Substitutability and Indifference Curves", question: "What does the curvature of an indifference curve indicate about the relationship between two goods?", answer: "The more curved an indifference curve is, the harder it is for the consumer to substitute one good for the other while maintaining the same utility."},

      {id: 6, category: "Convexity and Diminishing MRS", question: "What is the intuition behind the convexity of preferences?", answer: "It represents a love of variety, where consumers prefer a balanced mix of goods over extreme bundles."},
      {id: 6, category: "Convexity and Diminishing MRS", question: "What does a diminishing MRS imply about the shape of the indifference curve?", answer: "It implies the curve is bowed toward the origin, becoming flatter as the quantity of good x increases."},
      {id: 6, category: "Convexity and Diminishing MRS", question: "What is the graphical meaning of the Upper Contour Set (UCS)?", answer: "The UCS is the region on or above, typically to the upper-right of, a specific indifference curve, representing all bundles at least as good as the reference bundle."},

      {id: 7, category: "Cobb-Douglas and Linear Utility", question: "What characterizes the indifference curves of perfect substitutes (linear utility)?", answer: "They are straight lines with a constant slope, and they cut the axes."},
      {id: 7, category: "Cobb-Douglas and Linear Utility", question: "For Cobb-Douglas utility u(x,y)=x^α y^β, what is the MRSx,y?", answer: "The MRS is (α/β) · (y/x)."},
      {id: 7, category: "Cobb-Douglas and Linear Utility", question: "Why is it common to normalize the exponents in a Cobb-Douglas utility function so they sum to 1?", answer: "Because utility is ordinal, raising the function to the power 1/(α+β) is an order-preserving transformation that simplifies calculations without changing preference rankings."},

      {id: 8, category: "Perfect Complements (Leontief)", question: "What is the shape of indifference curves for Leontief utility u(x,y)=min{αx,βy}?", answer: "They are L-shaped (right-angled)."},
      {id: 8, category: "Perfect Complements (Leontief)", question: "Is Leontief utility strongly monotone?", answer: "No. It only satisfies weak monotonicity because increasing only one good, beyond the required proportion, adds zero utility."},
      {id: 8, category: "Perfect Complements (Leontief)", question: "Using the shoe analogy, why does Leontief utility fail Strong Monotonicity?", answer: "If you have 5 left shoes and 5 right shoes, adding a 6th right shoe adds zero utility; because more of one good does not strictly improve preference, it is not strongly monotone."},

      {id: 9, category: "CES, Homothetic, and Quasilinear", question: "What defines homothetic preferences?", answer: "Preferences where the MRS depends only on the ratio y/x, meaning the slope of indifference curves is constant along any ray from the origin."},
      {id: 9, category: "CES, Homothetic, and Quasilinear", question: "What is unique about the indifference curves of quasilinear utility u(x,y)=x+f(y)?", answer: "They are vertical translations of each other, and the MRS depends only on the quantity of one good."},
      {id: 9, category: "CES, Homothetic, and Quasilinear", question: "How does the parameter δ in a CES utility function determine the substitutability of goods?", answer: "A higher δ, closer to 1, means higher substitutability, while a lower δ, approaching −∞, means goods are more complementary."},

      {id: 10, category: "Budget Constraints and Sets", question: "What is the slope of the budget line px x + py y = I?", answer: "The slope is the relative price ratio −px/py."},
      {id: 10, category: "Budget Constraints and Sets", question: "How does the budget set change if income I increases while prices remain constant?", answer: "The budget line shifts parallel outward, expanding the feasible set without changing the slope."},
      {id: 10, category: "Budget Constraints and Sets", question: "What does the slope of the budget line represent in economic terms?", answer: "It represents the relative market price or the rate at which the market allows a consumer to trade one good for another (−px/py)."},

      {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What is the tangency condition for an interior solution in utility maximization?", answer: "The MRS must equal the price ratio: MRS = px/py."},
      {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What is the economic interpretation of the condition MUx/px = MUy/py?", answer: "The consumer is getting the same marginal utility per dollar spent on every good (the equimarginal principle)."},
      {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What is the economic interpretation of the Lagrange multiplier (ω) in utility maximization?", answer: "It represents the marginal utility of income, or how much additional utility the consumer would gain if their budget increased by one euro or dollar."},

      {id: 12, category: "Marshallian Demand and Indirect Utility", question: "What do Marshallian demand functions x(p,I) describe?", answer: "They show the optimal quantities of goods chosen as functions of prices and income."},
      {id: 12, category: "Marshallian Demand and Indirect Utility", question: "What is the Indirect Utility Function V(p,I)?", answer: "It identifies the maximum utility achievable given prices and income."},
      {id: 12, category: "Marshallian Demand and Indirect Utility", question: "What is the main difference between a utility function u(x,y) and an indirect utility function V(p,I)?", answer: "u(x,y) measures utility from quantities of goods, whereas V(p,I) measures the maximum achievable utility given prices and income."},

      {id: 13, category: "Hicksian Demand", question: "What is the goal of the Expenditure Minimization Problem (EMP)?", answer: "To find the cheapest way to achieve a target utility level ū."},
      {id: 13, category: "Hicksian Demand", question: "Why is Hicksian demand called compensated demand?", answer: "Because it assumes income is adjusted to keep the consumer at the same utility level as prices change, isolating the substitution effect."},
      {id: 13, category: "Hicksian Demand", question: "Why is Hicksian demand called compensated demand?", answer: "Because it assumes that as prices change, the consumer is compensated with enough income to remain at the exact same utility level."},

      {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "What does the expenditure function E(p,ū) calculate?", answer: "The minimum total cost required to reach utility ū at prices p."},
      {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "State Shephard's Lemma.", answer: "The partial derivative of the expenditure function with respect to a good's price equals the Hicksian demand for that good."},
      {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "How does the Expenditure Minimization Problem (EMP) define its opportunity set?", answer: "The opportunity set for the EMP is the Upper Contour Set—the set of all bundles that meet or exceed the target utility level ū."},

      {id: 15, category: "Duality", question: "In duality theory, how are the Indirect Utility and Expenditure functions related?", answer: "They are mathematical inverses of each other."},
      {id: 15, category: "Duality", question: "What is the result of V(p,E(p,ū))?", answer: "It equals ū, the target utility level."},
      {id: 15, category: "Duality", question: "What identity allows you to derive Marshallian demand directly from the indirect utility function?", answer: "Roy's Identity, which involves taking the negative ratio of the partial derivatives of V with respect to price and income."},

      {id: 16, question: "Consider u(x,y) = αx + βy and û(x,y) = x^α y^β. For which preferences is substitutability higher?", answer: "For linear utility u = αx + βy, the MRS = α/β is constant — goods are perfect substitutes (the IC is a straight line). For Cobb-Douglas û = x^α y^β, the MRS = (α/β)(y/x) is diminishing and ICs are curved. Hence substitutability is higher for linear utility: the consumer is always willing to trade goods at a fixed rate.", category: "Microeconomics Ch3"},
      {id: 17, question: "Show that MRS_{x,y} is independent of the units of measurement of u(x,y), i.e., is the same for u and f(u) when f'(·) > 0.", answer: "For f(u(x,y)): MRS = [∂f/∂x] / [∂f/∂y] = [f'(u)·u_x] / [f'(u)·u_y] = u_x / u_y. The f'(u) > 0 cancels, so MRS is the same for u and f(u). This confirms MRS is ordinal and unit-free.", category: "Microeconomics Ch3"},
      {id: 18, question: "How can we analytically show that MRS_{x,y} is diminishing?", answer: "Compute MRS = u_x/u_y as a function of x (holding utility constant via the IC). Then differentiate MRS with respect to x along the IC (i.e., using the constraint u(x,y)=ū to express y as y(x)). If d(MRS)/dx < 0, MRS is diminishing. Equivalently, check the bordered Hessian condition for strict quasiconcavity.", category: "Microeconomics Ch3"},
      {id: 19, question: "Define upper contour sets analytically and show them graphically.", answer: "The upper contour set of (x',y') is UCS(x',y') = {(x,y) ∈ X : (x,y) ≽ (x',y')} = {(x,y) : u(x,y) ≥ u(x',y')}. Graphically, it is the set of all bundles on or above a given indifference curve — the region to the upper-right of the IC (under monotonicity).", category: "Microeconomics Ch3"},
      {id: 20, question: "Define convex sets analytically and show them graphically.", answer: "A set S ⊆ ℝ^N is convex if for any two points a, b ∈ S and any λ ∈ [0,1], the convex combination λa + (1-λ)b ∈ S. Graphically, a convex set is one where the line segment between any two points lies entirely within the set (no 'dents' or holes).", category: "Microeconomics Ch3"},
      {id: 21, question: "Suppose ≽ is convex but not strictly convex. Discuss this case graphically.", answer: "Convex but not strictly convex preferences allow flat segments on indifference curves (linear portions). For example, linear utility u = αx + βy gives straight-line ICs. Any convex combination of two points on the same IC yields a bundle that is indifferent (not strictly preferred) to the endpoints. Upper contour sets are still convex, but MRS is constant (not strictly diminishing) along the flat segment.", category: "Microeconomics Ch3"},
      {id: 22, question: "For u(x,y) = √(xy) = x^(1/2)y^(1/2): (a) Find IC for ū=10.", answer: "(a) x^(1/2)y^(1/2) = 10 ⟹ xy = 100 ⟹ y(x) = 100/x. The IC is a rectangular hyperbola.", category: "Microeconomics Ch3"},
      {id: 23, question: "For u(x,y) = √(xy): (b) Calculate MRS generally and at x=5 (point A) and x=20 (point B).", answer: "MRS_{x,y} = u_x/u_y = [(1/2)x^(-1/2)y^(1/2)] / [(1/2)x^(1/2)y^(-1/2)] = y/x. On IC ū=10: y=100/x. At x=5: y=20, MRS=20/5=4. At x=20: y=5, MRS=5/20=0.25.", category: "Microeconomics Ch3"},
      {id: 24, question: "For u(x,y) = √(xy): (c) Is MRS diminishing?", answer: "Yes. MRS = y/x = (100/x)/x = 100/x^2, which is strictly decreasing in x. So MRS is diminishing.", category: "Microeconomics Ch3"},
      {id: 25, question: "For u(x,y) = √(xy): (d) What does diminishing MRS tell us about ≽?", answer: "Diminishing MRS implies that preferences are strictly convex: the consumer values variety, and balanced bundles are strictly preferred to extreme ones. The upper contour sets are strictly convex sets and u is strictly quasiconcave.", category: "Microeconomics Ch3"},
      {id: 26, question: "Check convexity for u(x,y) = x^(1/2)y^(1/2).", answer: "MRS = (1/2·x^(-1/2)y^(1/2))/(1/2·x^(1/2)y^(-1/2)) = y/x. As x increases along an IC (y falls), y/x decreases strictly. MRS is strictly diminishing ⟹ preferences are strictly convex.", category: "Microeconomics Ch3"},
      {id: 27, question: "Check convexity for u(x,y) = x + xy + y.", answer: "u_x = 1 + y, u_y = 1 + x. MRS = (1+y)/(1+x). Along an IC, as x increases, y must fall. Check if MRS falls: d(MRS)/dx = [(dy/dx)(1+x) - (1+y)] / (1+x)^2. Along IC, dy/dx = -MRS = -(1+y)/(1+x). Substituting: numerator = [-(1+y)/(1+x)](1+x) - (1+y) = -(1+y) - (1+y) = -2(1+y) < 0. So MRS is strictly diminishing ⟹ preferences are strictly convex.", category: "Microeconomics Ch3"},
      {id: 28, question: "Check convexity for u(x,y) = sqrt(x^2 + y^2).", answer: "u_x = x/sqrt(x^2+y^2), u_y = y/sqrt(x^2+y^2). MRS = x/y. Along an IC (circle of radius r), y = sqrt(r^2 - x^2), so MRS = x/sqrt(r^2-x^2), which is increasing in x. So MRS is increasing, not diminishing ⟹ preferences are NOT convex (they are concave — the consumer prefers extremes).", category: "Microeconomics Ch3"},
      {id: 29, question: "For Cobb-Douglas u(x,y) = x^α y^β: Do such utility functions express (strongly) monotone preferences?", answer: "Yes, strongly monotone. u_x = αx^(α-1)y^β > 0 and u_y = βx^α y^(β-1) > 0 for x,y > 0 and α,β > 0. Any increase in either good strictly increases utility.", category: "Microeconomics Ch3"},
      {id: 30, question: "For Cobb-Douglas: Draw indifference curves. Do they cut the axes?", answer: "ICs are hyperbolic curves y = (ū/x^α)^(1/β), asymptotic to both axes. They do NOT cut the axes (they approach but never touch the x- or y-axis), since u=0 if x=0 or y=0 when α,β>0.", category: "Microeconomics Ch3"},
      {id: 31, question: "For Cobb-Douglas: Calculate MRS_{x,y}.", answer: "MRS_{x,y} = u_x/u_y = (αx^(α-1)y^β)/(βx^α y^(β-1)) = (α/β)·(y/x).", category: "Microeconomics Ch3"},
      {id: 32, question: "For Cobb-Douglas: Are preferences (strictly) convex?", answer: "Yes, strictly convex. MRS = (α/β)(y/x) is strictly diminishing along any IC (as x increases and y falls, y/x decreases). Equivalently, u is strictly quasiconcave.", category: "Microeconomics Ch3"},
      {id: 33, question: "Why is it allowed to normalize α+β=1 for Cobb-Douglas?", answer: "Because v(x,y) = u(x,y)^(1/(α+β)) is a monotone increasing transformation of u, and therefore represents the same preferences (ordinal utility). After normalization, the exponents sum to 1 but the preference ranking is unchanged.", category: "Microeconomics Ch3"},
      {id: 34, question: "For Linear Utility u(x,y) = αx + βy: Do such utility functions express (strongly) monotone preferences?", answer: "Yes, monotone (and strongly monotone). u_x = α > 0 and u_y = β > 0 for α,β > 0. More of either good strictly increases utility.", category: "Microeconomics Ch3"},
      {id: 35, question: "For Linear Utility: Draw indifference curves. What do you observe? Do they cut the axes?", answer: "ICs are straight lines with slope -α/β. They do cut the axes: set y=0 ⟹ x = ū/α; set x=0 ⟹ y = ū/β. Goods are perfect substitutes at a constant rate.", category: "Microeconomics Ch3"},
      {id: 36, question: "For Linear Utility: Calculate MRS_{x,y}.", answer: "MRS_{x,y} = u_x/u_y = α/β. It is constant everywhere.", category: "Microeconomics Ch3"},
      {id: 37, question: "For Linear Utility: Are preferences (strictly) convex?", answer: "Convex but NOT strictly convex. MRS is constant (not strictly diminishing), so ICs are linear. Upper contour sets are convex (half-planes), but mixed bundles are only indifferent to, not strictly preferred over, extreme bundles.", category: "Microeconomics Ch3"},
      {id: 38, question: "Is it allowed to normalize α+β=1 for linear utility?", answer: "No, unlike Cobb-Douglas, a linear transformation (multiplying by a constant 1/(α+β)) does preserve preferences — so technically the normalized version represents the same preferences. However, normalizing α+β=1 changes the MRS value (α/β), which affects the specific rate of substitution. The ranking is preserved but the normalization is somewhat less natural for linear utility since the cardinal values matter less here; it is technically allowed for ordinal purposes.", category: "Microeconomics Ch3"},
      {id: 39, question: "For Leontief Utility u(x,y) = min{αx, βy}: Do such utility functions express (strongly) monotone preferences?", answer: "Monotone but NOT strongly monotone. Utility increases only when the binding constraint increases. If αx < βy (y is not the binding input), increasing y alone does not increase utility. So increasing a single good may not increase utility ⟹ not strongly monotone. But increasing all goods strictly (x >> x') will eventually increase utility ⟹ satisfies weak monotonicity.", category: "Microeconomics Ch3"},
      {id: 40, question: "For Leontief Utility: Draw indifference curves. What do you observe?", answer: "ICs are L-shaped (right angles) with the kink at αx = βy, i.e., at y/x = α/β. More of one good beyond the kink adds no utility. Goods are perfect complements.", category: "Microeconomics Ch3"},
      {id: 41, question: "For Leontief Utility: Calculate MRS_{x,y}.", answer: "MRS is not well-defined at the kink. On the horizontal part of the IC (where αx < βy), increasing x adds utility so MRS → ∞ (effectively 0 from the y-for-x trade perspective). On the vertical part (αx > βy), MRS = 0. At the kink, MRS is undefined (any value from 0 to ∞ is consistent).", category: "Microeconomics Ch3"},
      {id: 42, question: "For Leontief Utility: Are preferences (strictly) convex?", answer: "Convex but NOT strictly convex. The kink means that any convex combination of two points on the same IC is at least as good (weakly preferred), satisfying convexity. But it is not strictly convex because points on the flat segments of the IC are indifferent to, not strictly preferred over, each other.", category: "Microeconomics Ch3"},
      {id: 43, question: "For CES Utility: Graphically illustrate cases for further values of δ.", answer: "δ=1: straight-line ICs (perfect substitutes). δ→0: Cobb-Douglas-shaped ICs (smooth, bowed toward origin). δ between 0 and 1: ICs intermediate between linear and Cobb-Douglas. δ<0: ICs more curved than Cobb-Douglas, approaching L-shape. δ→-∞: Leontief L-shaped ICs (perfect complements). The more negative δ, the less substitutable the goods.", category: "Microeconomics Ch3"},
      {id: 44, question: "Show: as δ→0, CES → Cobb-Douglas.", answer: "Take logs of U = (αx^δ + βy^δ)^(1/δ). As δ→0, apply L'Hôpital's rule to (1/δ)·ln(αx^δ + βy^δ). Differentiating numerator and denominator with respect to δ yields [α·x^δ·ln x + β·y^δ·ln y]/(αx^δ + βy^δ). As δ→0, x^δ→1 and y^δ→1, so this limit → (α ln x + β ln y)/(α+β). Exponentiating: U → exp((α ln x + β ln y)/(α+β)) = x^(α/(α+β)) · y^(β/(α+β)), which is Cobb-Douglas.", category: "Microeconomics Ch3"},
      {id: 45, question: "Do all CES utility functions represent homothetic preferences?", answer: "Yes. For CES, MRS_{x,y} = (α/β)·(x/y)^(δ-1), which depends only on the ratio y/x (equivalently x/y), not on the absolute levels of x and y. Therefore all CES utility functions represent homothetic preferences.", category: "Microeconomics Ch3"},
      {id: 46, question: "Does a Cobb-Douglas utility function represent homothetic preferences?", answer: "Yes. MRS = (α/β)·(y/x) depends only on the ratio y/x. So Cobb-Douglas preferences are homothetic.", category: "Microeconomics Ch3"},
      {id: 47, question: "Does a linear utility function represent homothetic preferences?", answer: "Yes. MRS = α/β is constant, which trivially depends only on y/x (or equivalently is independent of levels). Linear preferences are homothetic.", category: "Microeconomics Ch3"},
      {id: 48, question: "Do all utility functions represent homothetic preferences?", answer: "No. A counterexample is quasilinear utility u(x,y) = x + ln y. Its MRS = u_x/u_y = 1/(1/y) = y, which depends only on y, not the ratio y/x. So it is non-homothetic: as we move along a ray through the origin (doubling both x and y), MRS changes.", category: "Microeconomics Ch3"},
      {id: 49, question: "For Quasilinear Utility u(x,y) = x + ln y: Do such utility functions express (strongly) monotone preferences?", answer: "Yes, (strongly) monotone. u_x = 1 > 0 and u_y = 1/y > 0 for y > 0. More of either good strictly increases utility.", category: "Microeconomics Ch3"},
      {id: 50, question: "For Quasilinear Utility: Draw indifference curves. What do you observe? Do they cut the axes?", answer: "ICs are vertical translations of each other: y(x) = e^(ū - x). They are decreasing and convex, asymptotic to the x-axis (y→0 as x→∞) but never touching it. They do NOT cut the x-axis (y>0 always) but can cut the y-axis (set x=0: y=e^ū).", category: "Microeconomics Ch3"},
      {id: 51, question: "For Quasilinear Utility: Calculate MRS_{x,y}.", answer: "MRS = u_x/u_y = 1/(1/y) = y. The MRS depends only on y, not on x.", category: "Microeconomics Ch3"},
      {id: 52, question: "Are quasilinear preferences homothetic?", answer: "No. MRS = y depends only on y, not on the ratio y/x. Along a ray through the origin (where y/x is fixed but levels scale up), y changes, so MRS changes. Therefore quasilinear preferences are NOT homothetic.", category: "Microeconomics Ch3"},
    ],

lt: [
    {id: 1, category: "Axioms of Choice", question: "What does transitivity mean in consumer theory?", answer: "{{Transitivity}} ensures internal consistency by stating that if A⪰B and B⪰C, then it must follow that A⪰C."},
    {id: 1, category: "Axioms of Choice", question: "Why is the axiom of completeness criticized?", answer: "Economists criticize the axiom of {{completeness}} because individuals may face {{uncertainty}} or lack information, making it difficult to rank disparate options like a vacation vs. a career move."},
    {id: 1, category: "Axioms of Choice", question: "When is a preference relation rational?", answer: "A preference relation is rational if it is both {{complete}} and {{transitive}}. This rationality implies that individual choices are {{internally consistent}}."},

    {id: 2, category: "Continuity and Lexicographic Preferences", question: "What does continuity imply for demand?", answer: "The assumption of {{continuity}} implies that small changes in prices or income will result in {{small changes}} in demand."},
    {id: 2, category: "Continuity and Lexicographic Preferences", question: "How does lexicographic ordering work?", answer: "In a {{lexicographic}} preference ordering, the consumer ranks choices by a primary criterion first and only uses secondary criteria to {{break ties}}."},
    {id: 2, category: "Continuity and Lexicographic Preferences", question: "Why do lexicographic preferences violate continuity?", answer: "Lexicographic preferences violate the axiom of {{continuity}} because even an infinitesimal change (ϵ) in the primary good can cause a {{sudden jump}} in preference ranking."},

    {id: 3, category: "Defining the Utility Function", question: "How does a utility function rank bundles?", answer: "A utility function u(x,y) assigns a {{real number}} to every choice such that preferred choices receive {{higher}} values."},
    {id: 3, category: "Defining the Utility Function", question: "What can appear as arguments in a utility function?", answer: "Examples of arguments in a utility function include physical goods, {{leisure}}, habits, and {{peer group}} status."},
    {id: 3, category: "Defining the Utility Function", question: "What does it mean that utility is ordinal?", answer: "Utility is an {{ordinal}} concept, meaning it only provides a {{ranking}} of bundles; any {{order-preserving transformation}} will represent the exact same underlying preferences."},

    {id: 4, category: "Monotonicity and Desirability", question: "What is the intuition behind monotonicity?", answer: "The economic intuition behind {{monotonicity}} is the simple idea that \"{{more}} is better\"."},
    {id: 4, category: "Monotonicity and Desirability", question: "What is a neuter good?", answer: "If a consumer is indifferent to more of good x, then x is called a {{neuter}}."},
    {id: 4, category: "Monotonicity and Desirability", question: "How is strong monotonicity stricter than weak monotonicity?", answer: "Strong monotonicity is {{stricter}} than weak monotonicity because it requires utility to increase if at least {{one}} good increases, while weak monotonicity only requires an increase if {{all}} goods increase."},

    {id: 5, category: "Substitutability and Indifference Curves", question: "What does an indifference curve show?", answer: "An {{indifference curve}} connects all consumption bundles (x,y) that yield the same {{utility level}}."},
    {id: 5, category: "Substitutability and Indifference Curves", question: "How many indifference curves describe preferences?", answer: "Graphically, preferences are described by {{infinitely many}} indifference curves, one for each possible level of satisfaction."},
    {id: 5, category: "Substitutability and Indifference Curves", question: "Why can indifference curves not intersect?", answer: "If preferences are monotone and transitive, indifference curves {{cannot intersect}} because intersection would create a {{logical contradiction}} regarding which bundle is preferred."},

    {id: 6, category: "Convexity and Diminishing MRS", question: "What is the upper contour set?", answer: "Preferences are convex if the {{upper contour set}} (the set of bundles at least as good as bundle A) is a {{convex set}}."},
    {id: 6, category: "Convexity and Diminishing MRS", question: "What does strict convexity imply about balanced bundles?", answer: "For strictly convex preferences, a {{balanced bundle}} (weighted average) is strictly preferred to extreme bundles."},
    {id: 6, category: "Convexity and Diminishing MRS", question: "How are strictly convex preferences described mathematically?", answer: "A consumer who prefers a {{balanced bundle}} over an extreme one is said to have {{strictly convex}} preferences, which is mathematically represented by a utility function that is {{strictly quasiconcave}}."},

    {id: 7, category: "Cobb-Douglas and Linear Utility", question: "What is special about linear utility?", answer: "In the case of {{linear utility}}, the Marginal Rate of Substitution is {{constant}} everywhere."},
    {id: 7, category: "Cobb-Douglas and Linear Utility", question: "How do Cobb-Douglas indifference curves behave near the axes?", answer: "Indifference curves for the {{Cobb-Douglas}} utility function are hyperbolas that approach but {{never touch}} the axes."},
    {id: 7, category: "Cobb-Douglas and Linear Utility", question: "What type of optimum is common under linear utility?", answer: "For {{linear utility}}, the optimal consumption bundle is typically a {{corner solution}} where the consumer spends all income on the good with the lower {{price per unit of utility}}."},

    {id: 8, category: "Perfect Complements (Leontief)", question: "What are perfect complements?", answer: "Goods that must be consumed in fixed proportions are called {{perfect complements}}."},
    {id: 8, category: "Perfect Complements (Leontief)", question: "What happens to the MRS at the kink of a Leontief curve?", answer: "At the kink of a Leontief indifference curve, the Marginal Rate of Substitution is {{undefined}}."},
    {id: 8, category: "Perfect Complements (Leontief)", question: "What defines Leontief preferences?", answer: "Leontief goods are called {{perfect complements}} and are always consumed in {{fixed proportions}}; their indifference curves are {{L-shaped}} with a kink where αx=βy."},

    {id: 9, category: "CES, Homothetic, and Quasilinear", question: "What does the CES function generalize?", answer: "The {{CES}} utility function is a major generalization that nests linear, {{Cobb-Douglas}}, and Leontief forms as special cases."},
    {id: 9, category: "CES, Homothetic, and Quasilinear", question: "Why are quasilinear preferences non-homothetic?", answer: "Quasilinear preferences are generally {{non-homothetic}} because the MRS depends on absolute levels, not just the {{ratio}} of goods."},
    {id: 9, category: "CES, Homothetic, and Quasilinear", question: "What defines homothetic preferences?", answer: "Preferences are {{homothetic}} if the MRS depends only on the {{ratio}} of the goods (y/x); while Cobb-Douglas and CES are homothetic, {{quasilinear}} utility is generally not."},

    {id: 10, category: "Budget Constraints and Sets", question: "What does the budget set contain?", answer: "The {{budget set}} includes all bundles that are affordable given the consumer's {{income}} and market prices."},
    {id: 10, category: "Budget Constraints and Sets", question: "How many units of x can be bought if all income is spent on x?", answer: "If a consumer spends all income on good x, they can purchase {{I / p_x}} units."},
    {id: 10, category: "Budget Constraints and Sets", question: "What are the intercepts of the budget line?", answer: "If a consumer has an income I and prices p_x, p_y, the horizontal intercept of the budget line is {{I / p_x}} and the vertical intercept is {{I / p_y}}."},

    {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What does ω represent in the Lagrange method?", answer: "In the {{Lagrange method}}, the variable ω represents the {{Lagrange multiplier}}."},
    {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What is an interior solution?", answer: "An {{interior solution}} occurs when the consumer chooses to consume {{positive}} amounts of all goods."},
    {id: 11, category: "Optimal Choice and Tangency Conditions", question: "What must hold at an interior optimum?", answer: "At an {{interior optimum}}, the tangency condition requires that the consumer's {{subjective}} marginal rate of substitution equals the {{objective}} market price ratio."},

    {id: 12, category: "Marshallian Demand and Indirect Utility", question: "How is the indirect utility function derived?", answer: "By substituting Marshallian demands back into the original {{utility function}}, we derive the {{indirect utility}} function."},
    {id: 12, category: "Marshallian Demand and Indirect Utility", question: "What does Roy's Identity do?", answer: "{{Roy's Identity}} allows us to find Marshallian demand by differentiating the {{indirect utility}} function."},
    {id: 12, category: "Marshallian Demand and Indirect Utility", question: "Why is Marshallian demand called uncompensated?", answer: "Marshallian demand functions are often called {{uncompensated}} demand because they reflect both {{substitution}} and income effects as prices change."},

    {id: 13, category: "Hicksian Demand", question: "What does Hicksian demand depend on?", answer: "Unlike Marshallian demand, {{Hicksian}} demand functions x^c(p, ū) depend on a target {{utility level}} rather than income."},
    {id: 13, category: "Hicksian Demand", question: "What effect does Hicksian demand isolate?", answer: "Hicksian demand only accounts for the {{substitution effect}}."},
    {id: 13, category: "Hicksian Demand", question: "How does Hicksian demand differ from Marshallian demand?", answer: "While Marshallian demand is a function of income (I), {{Hicksian}} demand is a function of a target {{utility level}} (ū)."},

    {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "What do we get when differentiating the expenditure function with respect to px?", answer: "Differentiating E(p, ū) with respect to p_x yields the {{Hicksian demand}} function for x."},
    {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "How is the expenditure function related to indirect utility?", answer: "The {{expenditure function}} is the dual counterpart to the {{indirect utility}} function."},
    {id: 14, category: "Expenditure Function and Shephard's Lemma", question: "What does Shephard's Lemma state?", answer: "According to {{Shephard's Lemma}}, if you take the partial derivative of the {{expenditure function}} with respect to price p_x, you obtain the {{Hicksian demand}} for good x."},

    {id: 15, category: "Duality", question: "What is duality?", answer: "The concept of {{duality}} shows that utility maximization and {{expenditure minimization}} are two sides of the same optimization problem."},
    {id: 15, category: "Duality", question: "What happens when solving E(p,V(p,I))?", answer: "Solving E(p,V(p,I)) results in the original {{income}} level I."},
    {id: 15, category: "Duality", question: "How are the indirect utility and expenditure functions related?", answer: "The concepts of utility maximization and expenditure minimization are {{duals}} of each other, meaning the indirect utility function and the expenditure function are {{mathematical inverses}}."},
    
    ],
    theory: [
      {id: 1, title: "Axioms of Choice: Completeness, Transitivity, and Rationality", html: `
  <h2>Preferences and Fundamental Assumptions</h2>
  <p>The foundation of consumer theory is the <strong>weak preference relation</strong> <code>⪰</code>, which is treated as a primitive concept from which other choice relations are derived.</p>
  <p><strong>Completeness</strong> means that for any two consumption bundles <code>A</code> and <code>B</code>, the consumer can compare them and say either <code>A ⪰ B</code>, <code>B ⪰ A</code>, or both, in which case the consumer is indifferent.</p>
  <p><strong>Transitivity</strong> requires internal consistency of choice. If a consumer prefers <code>A</code> to <code>B</code> and <code>B</code> to <code>C</code>, then the consumer must also prefer <code>A</code> to <code>C</code>.</p>
  <p>A preference relation is called <strong>rational</strong> if it satisfies both <strong>completeness</strong> and <strong>transitivity</strong>.</p>
  <p>From the weak preference relation, two additional relations are derived:</p>
  <ul>
    <li><strong>Strict preference</strong>: <code>A ≻ B</code></li>
    <li><strong>Indifference</strong>: <code>A ∼ B</code></li>
  </ul>
  <p>Example: A student comparing universities is complete if they can compare every pair of schools. Their preferences are transitive if, when they prefer Graz to Vienna and Vienna to Salzburg, they must also prefer Graz to Salzburg.</p>
`},

{id: 2, title: "Continuity and Lexicographic Preferences", html: `
  <h2>Preferences and Fundamental Assumptions</h2>
  <p><strong>Continuity</strong> is the assumption that if bundle <code>A</code> is preferred to bundle <code>B</code>, then any bundle <code>A′</code> that is sufficiently close to <code>A</code> must also be preferred to <code>B</code>.</p>
  <p>This assumption is important because it ensures that small changes in prices or income lead to small changes in behavior rather than sudden jumps, and it supports the existence of utility functions.</p>
  <p>A well-known violation of continuity occurs with <strong>lexicographic preferences</strong> <code>⪰<sub>L</sub></code>.</p>
  <p>Under lexicographic preferences for two goods <code>(x₁, x₂)</code>, the consumer first compares only the amount of <code>x₁</code>. Only if the two bundles have the same amount of <code>x₁</code> does the consumer compare <code>x₂</code>.</p>
  <p>Example: A safety-obsessed car buyer may rank cars only by safety rating. If Car A is even slightly safer than Car B, Car A is chosen regardless of price or color. Only if safety is identical does price matter. This violates continuity because an infinitesimally small change in safety can completely reverse the ranking.</p>
`},

{id: 3, title: "Defining the Utility Function", html: `
  <h2>The Concept of Utility and its Properties</h2>
  <p>A <strong>utility function</strong> <code>u(x,y)</code> assigns real numbers to consumption bundles such that more preferred bundles receive higher numbers.</p>
  <p>In modern microeconomics, utility is understood as an <strong>ordinal</strong> concept. The numerical value itself does not measure how much more a bundle is preferred; it only indicates the ranking.</p>
  <p>Therefore, any <strong>monotone transformation</strong> of a utility function represents the same preferences, as long as the order of bundles is preserved.</p>
  <p>The arguments of the utility function may include not only physical goods, but also leisure, habits, or the consumption of others when status matters.</p>
  <p>Example: If preferences are represented by <code>u(x,y)=x<sup>α</sup>y<sup>β</sup></code>, they can also be represented by <code>v(x,y)=αlnx+βlny</code>. Since the natural logarithm is strictly increasing, both functions generate the same ranking of bundles.</p>
`},

{id: 4, title: "Monotonicity and Desirability", html: `
  <h2>The Concept of Utility and its Properties</h2>
  <p><strong>Monotonicity</strong> expresses the idea that more of a good thing is preferred to less.</p>
  <p>Under <strong>Strong Monotonicity (SM)</strong>, if bundle <code>x</code> has at least as much of every good as bundle <code>x′</code> and strictly more of at least one good, then <code>x ≻ x′</code>.</p>
  <p>This rules out the existence of <strong>bads</strong> and <strong>neuters</strong>. A bad lowers utility, while a neuter has no effect on utility.</p>
  <p><strong>Weak Monotonicity (M)</strong> is less restrictive. It requires only that <code>x ≻ x′</code> if <code>x</code> contains strictly more of every good than <code>x′</code>.</p>
  <p>Example: If a consumer is offered the same amount of pizza and one extra soda, strong monotonicity requires that they strictly prefer the new bundle. If the bundle also contains packaging waste, and the consumer is indifferent to the amount of waste, this violates strong monotonicity because the waste acts as a neuter.</p>
`},

{id: 5, title: "Substitutability and Indifference Curves", html: `
  <h2>The Concept of Utility and its Properties</h2>
  <p><strong>Substitutability</strong> describes the trade-offs a consumer is willing to make between goods while maintaining the same level of utility.</p>
  <p>This idea is represented by <strong>indifference curves</strong>, which connect all bundles <code>(x,y)</code> that yield the same utility level <code>ū</code>.</p>
  <p>The <strong>Marginal Rate of Substitution</strong> <code>MRS<sub>x,y</sub></code> is the negative slope of the indifference curve and is given by:</p>
  <p><code>MRS<sub>x,y</sub> = MU<sub>x</sub> / MU<sub>y</sub></code></p>
  <p>It measures how much of good <code>y</code> the consumer is willing to give up for one more unit of good <code>x</code>.</p>
  <p>A key implication of transitivity and monotonicity is that indifference curves for different utility levels <strong>cannot intersect</strong>.</p>
  <p>Example: If a consumer is willing to give up 4 units of juice for 1 extra unit of curry, their MRS is 4. As they get more curry, the willingness to sacrifice juice usually falls, so the indifference curve becomes flatter.</p>
`},

{id: 6, title: "Convexity and Diminishing MRS", html: `
  <h2>The Concept of Utility and its Properties</h2>
  <p><strong>Convexity</strong> captures the idea that consumers usually prefer balanced bundles to extreme ones.</p>
  <p>Preferences are <strong>strictly convex</strong> if any weighted average of two indifferent bundles is strictly preferred to either of the original bundles.</p>
  <p>This is equivalent to saying that the <strong>upper contour set</strong> is convex.</p>
  <p>Analytically, strict convexity implies a <strong>diminishing marginal rate of substitution</strong>. As the quantity of good <code>x</code> increases, the consumer is willing to give up less and less of good <code>y</code> for an additional unit of <code>x</code>.</p>
  <p>Example: If bundles <code>A=(5,20)</code> and <code>B=(20,5)</code> are indifferent, a convex consumer prefers the balanced bundle <code>C=(12.5,12.5)</code>. For the utility function <code>u=√(xy)</code>, the MRS falls as <code>x</code> increases, showing diminishing willingness to substitute.</p>
`},

{id: 7, title: "Cobb-Douglas and Linear Utility", html: `
  <h2>Common Mathematical Models of Utility</h2>
  <p>The <strong>Cobb-Douglas utility function</strong> is:</p>
  <p><code>u(x,y)=x<sup>α</sup>y<sup>β</sup></code></p>
  <p>It is widely used because it represents smooth, strictly monotone, and strictly convex preferences.</p>
  <p>Its indifference curves are hyperbolic and approach the axes without touching them.</p>
  <p>By contrast, <strong>linear utility</strong> takes the form:</p>
  <p><code>u(x,y)=αx+βy</code></p>
  <p>This represents <strong>perfect substitutes</strong>. The MRS is constant at <code>α/β</code>, so the consumer is always willing to substitute one good for the other at a fixed rate.</p>
  <p>Example: If Pepsi and Coca-Cola are seen as identical, utility can be written as <code>u=x+y</code>. The consumer will always trade one for the other at a 1:1 rate, which gives straight-line indifference curves.</p>
`},

{id: 8, title: "Perfect Complements (Leontief)", html: `
  <h2>Common Mathematical Models of Utility</h2>
  <p><strong>Leontief utility</strong> is written as:</p>
  <p><code>u(x,y)=min{ax,by}</code></p>
  <p>This represents <strong>perfect complements</strong>, meaning goods must be consumed in fixed proportions.</p>
  <p>The indifference curves are <strong>L-shaped</strong> with a kink where <code>ax=by</code>.</p>
  <p>At the kink, the MRS is undefined because the slope changes abruptly.</p>
  <p>These preferences are <strong>weakly monotone</strong> but not strongly monotone, because additional units of one good alone do not increase utility once the required proportion has already been met.</p>
  <p>Example: Left and right shoes are perfect complements. If someone has 5 left shoes and 10 right shoes, utility is still only 5. Utility rises only if more left shoes are also added.</p>
`},

{id: 9, title: "Generalizations: CES, Homothetic, and Quasilinear", html: `
  <h2>Common Mathematical Models of Utility</h2>
  <p>A major generalization is the <strong>CES utility function</strong>:</p>
  <p><code>U(x,y)=[αx<sup>δ</sup>+βy<sup>δ</sup>]<sup>1/δ</sup></code></p>
  <p>The parameter <code>δ</code> determines the degree of substitutability:</p>
  <ul>
    <li>as <code>δ → 1</code>, the function becomes linear,</li>
    <li>as <code>δ → 0</code>, it approaches Cobb-Douglas,</li>
    <li>as <code>δ → −∞</code>, it approaches Leontief.</li>
  </ul>
  <p>Preferences are <strong>homothetic</strong> if the MRS depends only on the ratio <code>y/x</code>. Graphically, indifference curves then have identical slopes along any ray from the origin.</p>
  <p><strong>Quasilinear utility</strong> has the form <code>u=x+f(y)</code>. In this case, indifference curves are vertical translations of one another, and the MRS depends only on one good.</p>
  <p>Example: For <code>u(x,y)=x+lny</code>, the MRS depends only on <code>y</code>. The willingness to trade <code>y</code> for <code>x</code> is the same regardless of how much <code>x</code> the consumer already has.</p>
`},

{id: 10, title: "Budget Constraints and Sets", html: `
  <h2>Utility Maximization (Marshallian Demand)</h2>
  <p>The consumer faces the <strong>budget constraint</strong>:</p>
  <p><code>p<sub>x</sub>x + p<sub>y</sub>y ≤ I</code></p>
  <p>where <code>p<sub>x</sub></code> and <code>p<sub>y</sub></code> are prices and <code>I</code> is income.</p>
  <p>The <strong>budget line</strong> contains all bundles that exactly exhaust income, while the <strong>budget set</strong> contains all affordable bundles on or below the line.</p>
  <p>The slope of the budget line is the relative price ratio:</p>
  <p><code>−p<sub>x</sub> / p<sub>y</sub></code></p>
  <p>The intercepts are <code>I/p<sub>x</sub></code> on the x-axis and <code>I/p<sub>y</sub></code> on the y-axis.</p>
  <p>Example: If income is 100, the price of pizza is 10 and the price of soda is 5, then the budget constraint is <code>10x+5y=100</code>. The consumer can buy at most 10 pizzas or 20 sodas. The slope is <code>−2</code>, so 1 pizza costs 2 sodas in market terms.</p>
`},

{id: 11, title: "Optimal Choice and Tangency Conditions", html: `
  <h2>Utility Maximization (Marshallian Demand)</h2>
  <p>The <strong>Utility Maximization Problem (UMP)</strong> asks which affordable bundle places the consumer on the highest attainable indifference curve.</p>
  <p>For smooth and convex preferences, the optimum is usually an <strong>interior solution</strong> where the budget line is tangent to the indifference curve.</p>
  <p>At this point:</p>
  <p><code>MRS = p<sub>x</sub> / p<sub>y</sub></code></p>
  <p>Equivalently, the first-order condition is:</p>
  <p><code>MU<sub>x</sub> / MU<sub>y</sub> = p<sub>x</sub> / p<sub>y</sub></code></p>
  <p>Example: If a consumer's MRS is 3 but the market price ratio is 2, the consumer values one more pizza more highly than the market does. They should consume more pizza until their MRS falls to 2.</p>
`},

{id: 12, title: "Marshallian Demand and Indirect Utility", html: `
  <h2>Utility Maximization (Marshallian Demand)</h2>
  <p>Solving the utility maximization problem for all prices and income levels yields the <strong>Marshallian demand functions</strong>:</p>
  <p><code>x(p<sub>x</sub>,p<sub>y</sub>,I)</code> and <code>y(p<sub>x</sub>,p<sub>y</sub>,I)</code></p>
  <p>These are also called <strong>uncompensated demand functions</strong>.</p>
  <p>Substituting the optimal bundle back into the utility function gives the <strong>indirect utility function</strong>:</p>
  <p><code>V(p<sub>x</sub>,p<sub>y</sub>,I)</code></p>
  <p>This shows the maximum utility achievable at given prices and income.</p>
  <p><strong>Roy's Identity</strong> makes it possible to recover Marshallian demand directly from the indirect utility function.</p>
  <p>Example: For <code>u=√(xy)</code>, the Marshallian demands are <code>x=I/(2p<sub>x</sub>)</code> and <code>y=I/(2p<sub>y</sub>)</code>. Substituting these into utility yields the indirect utility function.</p>
`},

{id: 13, title: "Hicksian (Compensated) Demand", html: `
  <h2>Expenditure Minimization and Duality</h2>
  <p>The <strong>Expenditure Minimization Problem (EMP)</strong> is the dual problem to utility maximization.</p>
  <p>Instead of maximizing utility subject to a budget, the consumer minimizes expenditure subject to achieving a target utility level <code>ū</code>.</p>
  <p>The solution gives the <strong>Hicksian demand functions</strong>:</p>
  <p><code>x<sup>c</sup>(p<sub>x</sub>,p<sub>y</sub>,ū)</code> and <code>y<sup>c</sup>(p<sub>x</sub>,p<sub>y</sub>,ū)</code></p>
  <p>These are called <strong>compensated demands</strong> because income is adjusted to keep utility constant when prices change.</p>
  <p>Therefore, Hicksian demand isolates the <strong>substitution effect</strong>.</p>
  <p>Example: For perfect complements <code>u=min{x,4y}</code>, the consumer must consume in fixed proportions. Hicksian demand for <code>y</code> is <code>y<sup>c</sup>=ū/4</code>.</p>
`},

{id: 14, title: "The Expenditure Function and Shephard's Lemma", html: `
  <h2>Expenditure Minimization and Duality</h2>
  <p>The <strong>expenditure function</strong> <code>E(p<sub>x</sub>,p<sub>y</sub>,ū)</code> gives the minimum cost required to reach utility level <code>ū</code> at given prices.</p>
  <p>It is calculated as total spending on the Hicksian demand bundle:</p>
  <p><code>E = p<sub>x</sub>x<sup>c</sup> + p<sub>y</sub>y<sup>c</sup></code></p>
  <p>A central result is <strong>Shephard's Lemma</strong>, which states that the partial derivative of the expenditure function with respect to a price equals the corresponding Hicksian demand.</p>
  <p>Example: If <code>E(p<sub>x</sub>,p<sub>y</sub>,ū)=2ū√(p<sub>x</sub>p<sub>y</sub>)</code>, then differentiating with respect to <code>p<sub>x</sub></code> yields the Hicksian demand for <code>x</code>.</p>
`},

{id: 15, title: "Relationships and Inverses: Duality", html: `
  <h2>Expenditure Minimization and Duality</h2>
  <p>The UMP and EMP are connected by the principle of <strong>duality</strong>.</p>
  <p>The <strong>indirect utility function</strong> <code>V(p,I)</code> and the <strong>expenditure function</strong> <code>E(p,ū)</code> are mathematical inverses of each other.</p>
  <p>This means:</p>
  <p><code>V(p,E(p,ū)) = ū</code></p>
  <p>and</p>
  <p><code>E(p,V(p,I)) = I</code></p>
  <p>Thus, if one knows the expenditure needed to achieve a target utility, plugging that expenditure into the indirect utility function returns the same target utility. Conversely, plugging the maximum achievable utility into the expenditure function returns the original income.</p>
  <p>Example: If <code>V=I/(2√(p<sub>x</sub>p<sub>y</sub>))</code>, then solving for <code>I</code> gives the expenditure function <code>E=2ū√(p<sub>x</sub>p<sub>y</sub>)</code>, confirming the inverse relationship.</p>
`},
   {id: 16, title: "Substitutability: Linear vs. Cobb-Douglas", html: `
    <h2>Substitutability: Linear vs. Cobb-Douglas</h2>
    <p>Substitutability is higher for linear utility u(x, y) = αx + βy.</p>
    <p>The degree of substitutability is captured by the MRS and the curvature of the indifference curves:</p>
    <p><strong>For linear utility:</strong> MRS<sub>x,y</sub> = α/β, a constant. The consumer is always willing to trade goods at the fixed rate α/β, regardless of how much of each good they currently have. The IC is a straight line — perfectly flat (or straight). Goods are perfect substitutes.</p>
    <p><strong>For Cobb-Douglas utility:</strong> MRS<sub>x,y</sub> = (α/β)(y/x), which diminishes as x increases along an IC. The IC is strictly convex (bowed toward the origin). As the consumer has more x relative to y, they become less willing to trade y for additional x. Substitution becomes progressively harder.</p>
    <p>Economically, the more curved the indifference curve, the harder it is to substitute one good for another. Straight ICs represent the extreme case of perfect substitutability, while the Leontief (L-shaped) IC represents perfect complementarity (no substitutability at all). Cobb-Douglas lies between these extremes.</p>
  `},
  {id: 17, title: "MRS is Independent of Utility Units", html: `
    <h2>MRS is Independent of Utility Units</h2>
    <p>Let v(x, y) = f(u(x, y)) where f is a strictly increasing function (f' > 0). We compute the MRS for v:</p>
    <p>MRS<sup>v</sup><sub>x,y</sub> = ∂v/∂x / ∂v/∂y</p>
    <p>By the chain rule:</p>
    <ul>
      <li>∂v/∂x = f'(u) · u<sub>x</sub></li>
      <li>∂v/∂y = f'(u) · u<sub>y</sub></li>
    </ul>
    <p>Therefore: MRS<sup>v</sup><sub>x,y</sub> = [f'(u) · u<sub>x</sub>] / [f'(u) · u<sub>y</sub>] = u<sub>x</sub> / u<sub>y</sub> = MRS<sup>u</sup><sub>x,y</sub></p>
    <p>The f'(u) > 0 cancels exactly from numerator and denominator. The MRS is unchanged by any strictly increasing transformation of utility.</p>
    <p>This result confirms that the MRS is a purely ordinal concept: it captures the relative marginal valuation of goods (the rate at which the consumer is willing to substitute), which depends only on the shape of the indifference curves, not on the specific utility numbers assigned to them.</p>
  `},
  {id: 18, title: "Analytically Showing Diminishing MRS", html: `
    <h2>Analytically Showing Diminishing MRS</h2>
    <p>There are two main approaches:</p>
    <h3>Approach 1 — Direct differentiation along the IC</h3>
    <p>Compute MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> as a function of x, using the constraint u(x, y) = ū to express y as a function y(x). Then differentiate MRS with respect to x:</p>
    <p>d(MRS)/dx = d/dx [u<sub>x</sub>(x, y(x)) / u<sub>y</sub>(x, y(x))]</p>
    <p>where dy/dx = −MRS along the IC. If this derivative is negative for all (x, y) on the IC, MRS is diminishing.</p>
    <h3>Approach 2 — Bordered Hessian / Quasiconcavity</h3>
    <p>Preferences are strictly convex (equivalently, MRS is strictly diminishing) if and only if u is strictly quasiconcave. Strict quasiconcavity can be checked via the bordered Hessian H̄:</p>
    <p>MRS is strictly diminishing if and only if det(H̄) > 0. This is the standard second-order condition for strict quasiconcavity in two variables.</p>
    <p>In practice, for simple utility functions, the direct approach (substituting y(x) into MRS and differentiating) is most straightforward.</p>
  `},
  {id: 19, title: "Upper Contour Sets", html: `
    <h2>Upper Contour Sets</h2>
    <p>The upper contour set of a bundle (x', y') is the set of all bundles that are at least as good as (x', y'):</p>
    <p>UCS(x', y') = {(x, y) ∈ X : (x, y) ≽ (x', y')} = {(x, y) ∈ X : u(x, y) ≥ u(x', y')}</p>
    <p>It is the set of all consumption bundles yielding utility at least as high as the reference bundle.</p>
    <p>Graphically (under monotonicity), the UCS of a point P on indifference curve IC₀ is the region on or above (and to the upper-right of) the IC passing through P. It is the "at-least-as-good-as" region: all bundles that lie on the same IC or on higher ICs.</p>
    <p>The UCS is bounded below by the indifference curve itself (the boundary) and extends outward/upward indefinitely (since more goods mean higher utility under monotonicity).</p>
    <p>The shape of UCS is directly tied to convexity of preferences: preferences are (weakly) convex if and only if all upper contour sets are convex sets.</p>
  `},
  {id: 20, title: "Convex Sets", html: `
    <h2>Convex Sets</h2>
    <p>A set S ⊆ ℝᴺ is called convex if, for any two points a, b ∈ S and any scalar λ ∈ [0, 1], the convex combination (weighted average) also belongs to S:</p>
    <p>λa + (1 − λ)b ∈ S for all λ ∈ [0, 1]</p>
    <p>In words: the entire line segment connecting any two points in S lies within S.</p>
    <h3>Graphically in ℝ²</h3>
    <ul>
      <li>A <strong>convex set</strong> has no "dents" or "indentations" — it is a "fat" region. Examples: a disk, a rectangle, a half-plane, a triangle (including interior).</li>
      <li>A <strong>non-convex set</strong> has at least one pair of points whose connecting segment partially lies outside the set. Example: a crescent shape, a star, or a set with a hole.</li>
    </ul>
    <p>The relevance to economics: upper contour sets being convex captures the idea that "averages are preferred to extremes." If bundle A and bundle B are both at least as good as some reference bundle C, then any convex combination λA + (1−λ)B is also at least as good as C. This is the formal statement of convex preferences.</p>
  `},
  {id: 21, title: "Convex but Not Strictly Convex Preferences", html: `
    <h2>Convex but Not Strictly Convex Preferences</h2>
    <p>Convex (but not strictly convex) preferences allow indifference curves to contain flat (linear) segments.</p>
    <p>Strict convexity requires that any convex combination of two distinct bundles on the same IC is strictly preferred to both. Non-strict convexity only requires that the combination is at least as good (weakly preferred).</p>
    <p>A flat segment on an IC means there exist two distinct bundles A and B with A ~ B, but λA + (1−λ)B ~ A ~ B (the mixture is indifferent to, not strictly better than, the endpoints). The consumer gains nothing from variety over that range.</p>
    <p>The key example is <strong>linear utility</strong> u(x, y) = αx + βy: the entire IC is a straight line. Every mixture of two bundles on the same IC yields the same utility. Upper contour sets are half-planes (convex), but MRS = α/β is constant, not strictly diminishing.</p>
    <p><strong>Leontief utility</strong> offers another illustration: along the flat portions of the L-shaped IC (horizontal and vertical arms), the MRS is constant (0 or ∞), so preferences are convex but not strictly convex there.</p>
    <p>In summary: convex but not strictly convex preferences permit perfect substitute-like behavior over some ranges, while still satisfying the weaker convexity requirement.</p>
  `},
  {id: 22, title: "u(x,y) = √(xy): Indifference Curve for ū = 10", html: `
    <h2>u(x,y) = √(xy): Indifference Curve for ū = 10</h2>
    <p>Setting u(x, y) = ū = 10:</p>
    <p>√(xy) = 10 ⟹ xy = 100 ⟹ y(x) = 100/x</p>
    <p>The indifference curve for ū = 10 is the rectangular hyperbola y = 100/x.</p>
    <p>This curve is strictly decreasing and strictly convex, asymptotic to both coordinate axes (y → ∞ as x → 0, and y → 0 as x → ∞). It passes through points such as (5, 20), (10, 10), and (20, 5). The curve never touches either axis because x = 0 or y = 0 would give u = 0, which is below ū = 10.</p>
  `},
  {id: 23, title: "u(x,y) = √(xy): MRS Generally and at x=5, x=20", html: `
    <h2>u(x,y) = √(xy): MRS Generally and at x=5, x=20</h2>
    <p>Computing the partial derivatives:</p>
    <ul>
      <li>u<sub>x</sub> = (1/2) x<sup>−1/2</sup> y<sup>1/2</sup></li>
      <li>u<sub>y</sub> = (1/2) x<sup>1/2</sup> y<sup>−1/2</sup></li>
    </ul>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = y/x</p>
    <p>This is the general formula: MRS = y/x. On the IC ū = 10, we have y = 100/x, so: MRS = (100/x)/x = 100/x²</p>
    <p><strong>At x = 5 (point A):</strong> y = 100/5 = 20, MRS = 20/5 = 4. (The consumer is willing to give up 4 units of y for 1 unit of x at this point.)</p>
    <p><strong>At x = 20 (point B):</strong> y = 100/20 = 5, MRS = 5/20 = 0.25. (The consumer is only willing to give up 0.25 units of y for 1 unit of x — much less than at point A.)</p>
    <p>The sharp decline from MRS = 4 to MRS = 0.25 as x increases from 5 to 20 illustrates the rapidly diminishing marginal rate of substitution.</p>
  `},
  {id: 24, title: "u(x,y) = √(xy): Is MRS Diminishing?", html: `
    <h2>u(x,y) = √(xy): Is MRS Diminishing?</h2>
    <p>Yes, MRS is strictly diminishing.</p>
    <p>From the IC ū = 10, MRS = 100/x². Differentiating with respect to x:</p>
    <p>d(MRS)/dx = −200/x³ &lt; 0 for all x &gt; 0.</p>
    <p>This is strictly negative for all positive x, confirming that MRS strictly decreases as x increases (with y adjusting to remain on the IC).</p>
    <p>More generally, MRS = y/x, and as we move along any IC (increasing x implies y falls proportionally), the ratio y/x declines. This is because the IC y = ū²/x implies y/x = ū²/x², which is strictly decreasing in x.</p>
  `},
  {id: 25, title: "u(x,y) = √(xy): What Diminishing MRS Tells Us", html: `
    <h2>u(x,y) = √(xy): What Diminishing MRS Tells Us About ≽</h2>
    <p>Diminishing MRS implies that the preference relation ≽ is <strong>strictly convex</strong>.</p>
    <p>Strictly convex preferences have three equivalent characterizations:</p>
    <ol>
      <li>MRS is strictly diminishing as x increases along any IC.</li>
      <li>Upper contour sets are strictly convex sets.</li>
      <li>The utility function u is strictly quasiconcave.</li>
    </ol>
    <p>All three hold for u = √(xy):</p>
    <ul>
      <li>MRS = y/x is strictly diminishing.</li>
      <li>Any convex combination of two distinct bundles on the same IC lies strictly above that IC (strictly preferred to the endpoints).</li>
      <li>√(xy) is a strictly quasiconcave function.</li>
    </ul>
    <p>Economically, strict convexity means the consumer has a "love of variety": balanced bundles (moderate amounts of both x and y) are strictly preferred to extreme bundles (a lot of one and very little of the other), holding utility constant. This is why optimum consumption bundles under budget constraints typically involve positive quantities of both goods when preferences are strictly convex.</p>
  `},
  {id: 26, title: "Convexity Check: u(x,y) = x^(1/2)y^(1/2)", html: `
    <h2>Convexity Check: u(x,y) = x<sup>1/2</sup>y<sup>1/2</sup></h2>
    <p>This is a Cobb-Douglas utility function with α = β = 1/2, so it represents the same preferences as √(xy).</p>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub>/u<sub>y</sub> = [(1/2)x<sup>−1/2</sup>y<sup>1/2</sup>] / [(1/2)x<sup>1/2</sup>y<sup>−1/2</sup>] = y/x.</p>
    <p>Along an indifference curve, y = ū²/x (from x<sup>1/2</sup>y<sup>1/2</sup> = ū, squaring: xy = ū², so y = ū²/x). Then:</p>
    <p>MRS = (ū²/x)/x = ū²/x²</p>
    <p>This is strictly decreasing in x (d(MRS)/dx = −2ū²/x³ &lt; 0).</p>
    <p><strong>Conclusion:</strong> MRS is strictly diminishing. Therefore, preferences represented by u = x<sup>1/2</sup>y<sup>1/2</sup> are <strong>strictly convex</strong>. ✓</p>
  `},
  {id: 27, title: "Convexity Check: u(x,y) = x + xy + y", html: `
    <h2>Convexity Check: u(x,y) = x + xy + y</h2>
    <p>Compute the partial derivatives:</p>
    <ul>
      <li>u<sub>x</sub> = 1 + y</li>
      <li>u<sub>y</sub> = 1 + x</li>
    </ul>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = (1 + y) / (1 + x)</p>
    <p>To determine if MRS is diminishing, differentiate with respect to x along an IC (using dy/dx = −MRS):</p>
    <p>d/dx [(1+y)/(1+x)] = [(dy/dx)(1+x) − (1+y)] / (1+x)²</p>
    <p>Substituting dy/dx = −MRS = −(1+y)/(1+x):</p>
    <p>Numerator = [−(1+y)/(1+x)] · (1+x) − (1+y) = −(1+y) − (1+y) = −2(1+y)</p>
    <p>Since y &gt; 0 in the relevant domain, (1+y) &gt; 0, so the numerator = −2(1+y) &lt; 0.</p>
    <p><strong>Conclusion:</strong> d(MRS)/dx &lt; 0, so MRS is strictly diminishing. Preferences represented by u = x + xy + y are <strong>strictly convex</strong>. ✓</p>
  `},
  {id: 28, title: "Convexity Check: u(x,y) = √(x² + y²)", html: `
    <h2>Convexity Check: u(x,y) = √(x² + y²)</h2>
    <p>Compute the partial derivatives:</p>
    <ul>
      <li>u<sub>x</sub> = x / √(x² + y²)</li>
      <li>u<sub>y</sub> = y / √(x² + y²)</li>
    </ul>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = x / y</p>
    <p>The IC is u = ū, meaning √(x² + y²) = ū, i.e., x² + y² = ū² — a circle of radius ū.</p>
    <p>On this circle, y = √(ū² − x²), so: MRS = x / √(ū² − x²)</p>
    <p>Differentiating: d(MRS)/dx = ū² / (ū² − x²)<sup>3/2</sup> &gt; 0</p>
    <p>MRS is <strong>strictly increasing</strong> in x along the IC — the opposite of diminishing MRS.</p>
    <p><strong>Conclusion:</strong> Preferences represented by u = √(x² + y²) are <strong>NOT convex</strong>. Upper contour sets (the interior and boundary of circles beyond radius ū) are non-convex. These preferences exhibit a "love of extremes": bundles concentrated heavily on one good are preferred to balanced bundles. ✗</p>
  `},
  {id: 29, title: "Cobb-Douglas: Strong Monotonicity", html: `
    <h2>Cobb-Douglas u(x,y) = x<sup>α</sup>y<sup>β</sup>: Strong Monotonicity</h2>
    <p>Yes, Cobb-Douglas preferences are strongly monotone on the strictly positive orthant X = ℝ²₊₊ = {(x,y) : x &gt; 0, y &gt; 0}.</p>
    <p>The partial derivatives are:</p>
    <ul>
      <li>u<sub>x</sub> = α x<sup>α−1</sup> y<sup>β</sup> &gt; 0 (since α &gt; 0, x &gt; 0, y &gt; 0)</li>
      <li>u<sub>y</sub> = β x<sup>α</sup> y<sup>β−1</sup> &gt; 0 (since β &gt; 0, x &gt; 0, y &gt; 0)</li>
    </ul>
    <p>Both marginal utilities are strictly positive. Therefore, increasing either good (holding the other fixed) strictly increases utility. If x ≥ x' and x ≠ x' (at least one component is strictly larger), then u(x) &gt; u(x'), so x ≻ x'. This is precisely strong monotonicity.</p>
    <p><em>Note:</em> On the boundary of the positive orthant (when x = 0 or y = 0), utility equals zero regardless of the other good. So strong monotonicity holds in the interior but needs care at the axes.</p>
  `},
  {id: 30, title: "Cobb-Douglas: Indifference Curves and Axes", html: `
    <h2>Cobb-Douglas: Indifference Curves and Axes</h2>
    <p>The indifference curve for utility level ū &gt; 0 is given by:</p>
    <p>x<sup>α</sup> y<sup>β</sup> = ū ⟹ y = (ū)<sup>1/β</sup> · x<sup>−α/β</sup></p>
    <p>This is a strictly decreasing, strictly convex curve (a generalized hyperbola).</p>
    <h3>Key properties of the IC</h3>
    <ul>
      <li>As x → 0⁺, y → +∞: the curve rises steeply near the y-axis.</li>
      <li>As x → +∞, y → 0⁺: the curve flattens near the x-axis.</li>
      <li>The curve is <strong>asymptotic to both axes</strong> — it approaches but never touches them.</li>
    </ul>
    <p>Therefore, Cobb-Douglas ICs do <strong>NOT cut the axes</strong>. This reflects the fact that u(0, y) = 0 and u(x, 0) = 0 for any ū &gt; 0 — having none of either good yields zero utility, which is below any positive ū. To maintain positive utility, the consumer always needs strictly positive quantities of both goods.</p>
  `},
  {id: 31, title: "Cobb-Douglas: MRS_{x,y}", html: `
    <h2>Cobb-Douglas: MRS<sub>x,y</sub></h2>
    <p>Using MRS = u<sub>x</sub> / u<sub>y</sub>:</p>
    <ul>
      <li>u<sub>x</sub> = α x<sup>α−1</sup> y<sup>β</sup></li>
      <li>u<sub>y</sub> = β x<sup>α</sup> y<sup>β−1</sup></li>
    </ul>
    <p>MRS<sub>x,y</sub> = (α x<sup>α−1</sup> y<sup>β</sup>) / (β x<sup>α</sup> y<sup>β−1</sup>) = (α/β) · (y/x)</p>
    <p>The MRS equals (α/β) times the ratio of the quantities y and x. It is:</p>
    <ul>
      <li><strong>Strictly diminishing:</strong> as x increases along an IC (y decreases), the ratio y/x decreases, so MRS falls.</li>
      <li><strong>Proportional to α/β:</strong> the coefficients α and β reflect the relative importance of the goods.</li>
      <li><strong>Homogeneous of degree 0 in (x, y):</strong> MRS depends only on the ratio y/x, confirming that Cobb-Douglas preferences are homothetic.</li>
    </ul>
  `},
  {id: 32, title: "Cobb-Douglas: Strict Convexity", html: `
    <h2>Cobb-Douglas: Strict Convexity</h2>
    <p>Yes, Cobb-Douglas preferences are <strong>strictly convex</strong>.</p>
    <p>The MRS = (α/β)(y/x) is strictly diminishing along every indifference curve:</p>
    <p>As x increases along an IC (with y falling to keep u constant), the ratio y/x decreases strictly, so MRS = (α/β)(y/x) decreases strictly.</p>
    <p>Formally, d(MRS)/dx along the IC:</p>
    <p>d(MRS)/dx = (α/β) · d(y/x)/dx = (α/β) · [(dy/dx)·x − y]/x²</p>
    <p>With dy/dx = −MRS = −(α/β)(y/x):</p>
    <p>Numerator = (α/β)[−(α/β)(y/x)·x − y] = (α/β)(−αy/β − y) = −(α/β)y(α/β + 1) &lt; 0</p>
    <p>So d(MRS)/dx &lt; 0. MRS is strictly diminishing, confirming strict convexity.</p>
    <p>Equivalently, u = x<sup>α</sup> y<sup>β</sup> is strictly quasiconcave for α, β &gt; 0, and all upper contour sets are strictly convex sets.</p>
  `},
  {id: 33, title: "Cobb-Douglas: Normalizing α+β=1", html: `
    <h2>Cobb-Douglas: Why Normalizing α+β=1 is Allowed</h2>
    <p>Because the transformation v(x,y) = u(x,y)<sup>1/(α+β)</sup> is a strictly increasing monotone transformation, and therefore v represents the same preferences as u.</p>
    <p>Specifically:</p>
    <p>v(x,y) = [x<sup>α</sup> y<sup>β</sup>]<sup>1/(α+β)</sup> = x<sup>α/(α+β)</sup> · y<sup>β/(α+β)</sup></p>
    <p>Let α' = α/(α+β) and β' = β/(α+β). Then α' + β' = (α+β)/(α+β) = 1. So v has the same Cobb-Douglas form with exponents summing to 1.</p>
    <p>Since f(t) = t<sup>1/(α+β)</sup> is a strictly increasing function for t &gt; 0 and 1/(α+β) &gt; 0, the transformation preserves the preference ordering:</p>
    <p>u(x,y) ≥ u(x',y') ⟺ v(x,y) ≥ v(x',y')</p>
    <p>Therefore v represents the same ≽ as u. The normalization is purely cosmetic — it simplifies expressions (e.g., expenditure shares equal α' and β') without changing any economic predictions about demand, MRS, or comparative statics.</p>
  `},
  {id: 34, title: "Linear Utility: Strong Monotonicity", html: `
    <h2>Linear Utility u(x,y) = αx + βy: Strong Monotonicity</h2>
    <p>Yes, linear utility functions express strongly monotone preferences (for α, β &gt; 0).</p>
    <ul>
      <li>u<sub>x</sub> = α &gt; 0</li>
      <li>u<sub>y</sub> = β &gt; 0</li>
    </ul>
    <p>Both partial derivatives are strictly positive constants. Therefore:</p>
    <ul>
      <li>Increasing x alone (holding y fixed) strictly increases utility by α &gt; 0.</li>
      <li>Increasing y alone (holding x fixed) strictly increases utility by β &gt; 0.</li>
      <li>If x ≥ x' and x ≠ x', then u(x) = αx₁ + βx₂ &gt; αx₁' + βx₂' = u(x') (at least one component is strictly larger and contributes positively).</li>
    </ul>
    <p>This satisfies the definition of strong monotonicity: (x ≥ x') ∧ (x ≠ x') ⟹ x ≻ x'. Neither good can be a neuter or a bad as long as α &gt; 0 and β &gt; 0.</p>
  `},
  {id: 35, title: "Linear Utility: Indifference Curves and Axes", html: `
    <h2>Linear Utility: Indifference Curves and Axes</h2>
    <p>The indifference curve for utility level ū is:</p>
    <p>αx + βy = ū ⟹ y = ū/β − (α/β)x</p>
    <p>This is a straight line with slope −α/β and y-intercept ū/β.</p>
    <h3>Key observations</h3>
    <ul>
      <li>ICs are <strong>parallel straight lines</strong> with the same slope −α/β. As ū increases, the IC shifts outward (higher intercept).</li>
      <li>ICs <strong>DO cut both axes</strong>: setting x = 0 gives y = ū/β (y-axis intercept), and setting y = 0 gives x = ū/α (x-axis intercept). The consumer can achieve any utility level with either good alone.</li>
      <li>The constant slope reflects <strong>perfect substitutability</strong>: the consumer always trades x for y at the fixed rate α/β, regardless of current consumption.</li>
      <li>Unlike Cobb-Douglas, there is no need for strictly positive quantities of both goods to achieve any given utility level.</li>
    </ul>
  `},
  {id: 36, title: "Linear Utility: MRS_{x,y}", html: `
    <h2>Linear Utility: MRS<sub>x,y</sub></h2>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = α / β</p>
    <p>The MRS is <strong>constant</strong> — it equals α/β everywhere in the consumption space, regardless of x and y.</p>
    <p><strong>Economic interpretation:</strong> the consumer is always willing to trade β/α units of y for 1 unit of x (or equivalently, α/β units of x for 1 unit of y). This rate does not change with the quantities consumed. The consumer does not value variety — a bundle with all x (and no y) is just as good as any other bundle with the same total value.</p>
    <p>This constant MRS reflects that x and y are <strong>perfect substitutes</strong>: the consumer is indifferent about how the total utility is allocated between the two goods, as long as the total is the same.</p>
  `},
  {id: 37, title: "Linear Utility: Convexity", html: `
    <h2>Linear Utility: Convexity</h2>
    <p>Linear preferences are <strong>convex but NOT strictly convex</strong>.</p>
    <p>Since MRS = α/β is constant (not strictly diminishing), the characterization of strict convexity fails. Specifically:</p>
    <ul>
      <li>Upper contour sets are half-planes (convex sets), so convexity holds.</li>
      <li>However, for any two bundles A and B on the same IC, their convex combination λA + (1−λ)B also lies on the same IC (indifferent, not strictly preferred). So the strict convexity condition "mixtures are strictly preferred to extremes" fails.</li>
    </ul>
    <p>In practice, this means that the consumer's optimal bundle under a budget constraint is typically a <strong>corner solution</strong>: the consumer spends everything on whichever good has the lower price per unit of utility (α/p<sub>x</sub> vs β/p<sub>y</sub>). Interior solutions only arise when prices are exactly proportional to the MRS.</p>
    <p><em>Is normalization α + β = 1 allowed?</em> Unlike Cobb-Douglas (where multiplying by 1/(α+β) is a power transformation), for linear utility multiplying by 1/(α+β) is also a strictly increasing linear transformation (scaling), which preserves preferences. So normalization is allowed here too. However, it changes the absolute values of marginal utilities (though not their ratio, the MRS), so it is less commonly applied.</p>
  `},
  {id: 38, title: "Linear Utility: Normalization α+β=1", html: `
    <h2>Linear Utility: Is Normalization α+β=1 Allowed?</h2>
    <p>Unlike Cobb-Douglas, a linear transformation (multiplying by a constant 1/(α+β)) does preserve preferences — so technically the normalized version represents the same preferences.</p>
    <p>However, normalizing α+β=1 changes the MRS value (α/β), which affects the specific rate of substitution. The ranking is preserved but the normalization is somewhat less natural for linear utility since the cardinal values matter less here; it is technically allowed for ordinal purposes.</p>
    <p>The key distinction: for Cobb-Douglas, the normalization is a <em>power</em> transformation (non-linear), while for linear utility it is a <em>linear</em> scaling. Both are strictly increasing and therefore order-preserving. So while the answer is technically "yes, it is allowed," the normalization is rarely applied in practice for linear utility because it changes the coefficients in a way that may be less natural economically.</p>
  `},
  {id: 39, title: "Leontief Utility: Monotonicity", html: `
    <h2>Leontief Utility u(x,y) = min{αx, βy}: Monotonicity</h2>
    <p>Leontief preferences satisfy <strong>weak monotonicity but NOT strong monotonicity</strong>.</p>
    <p>Consider a bundle at the kink: αx &lt; βy (the y constraint is slack). Increasing y alone does not increase utility because min{αx, βy} = αx is determined solely by x. So having more y does not make the consumer better off — a violation of strong monotonicity (where increasing any single good should strictly improve preference).</p>
    <p>However, <strong>weak monotonicity</strong> (x ≫ x' ⟹ x ≻ x') is satisfied. If all components are strictly larger, then min{αx₁, βx₂} &gt; min{αx₁', βx₂'} because both αx₁ &gt; αx₁' and βx₂ &gt; βx₂', so the minimum is also strictly larger.</p>
    <p>In summary:</p>
    <ul>
      <li><strong>Strong monotonicity:</strong> Fails (increasing the non-binding good has no effect).</li>
      <li><strong>Weak monotonicity:</strong> Holds (increasing all goods strictly improves utility).</li>
    </ul>
    <p>This reflects the complementary nature of Leontief goods: both must be available in the right proportion to gain any benefit.</p>
  `},
  {id: 40, title: "Leontief Utility: Indifference Curves", html: `
    <h2>Leontief Utility: Indifference Curves</h2>
    <p>Leontief indifference curves are L-shaped (right-angled), with the kink at the point where αx = βy, i.e., y/x = α/β.</p>
    <p>For a given utility level ū = min{αx, βy}:</p>
    <ul>
      <li><strong>On the horizontal arm</strong> (αx &gt; βy, y is the binding constraint): utility = βy = ū, so y = ū/β is fixed regardless of x. The IC is a horizontal line.</li>
      <li><strong>On the vertical arm</strong> (αx &lt; βy, x is the binding constraint): utility = αx = ū, so x = ū/α is fixed regardless of y. The IC is a vertical line.</li>
      <li><strong>At the kink</strong> (αx = βy): both constraints are binding simultaneously. The kink point is (ū/α, ū/β).</li>
    </ul>
    <p>The kink lies on the ray y/x = α/β through the origin. Higher ICs (larger ū) have kinks further from the origin.</p>
    <p><strong>Economic interpretation:</strong> x and y are perfect complements used in fixed proportions α:β. Adding more of one good beyond the required proportion generates zero additional utility — like adding a left shoe without a right shoe.</p>
  `},
  {id: 41, title: "Leontief Utility: MRS_{x,y}", html: `
    <h2>Leontief Utility: MRS<sub>x,y</sub></h2>
    <p>The MRS for Leontief utility is not well-defined at the kink, and takes extreme values on the arms:</p>
    <p><strong>On the horizontal arm</strong> (αx &gt; βy, y is binding):</p>
    <p>Utility = βy. Moving horizontally (increasing x) does not increase utility. MRS<sub>x,y</sub> → 0. (The IC is flat here, slope = 0, so MRS = 0.)</p>
    <p><strong>On the vertical arm</strong> (αx &lt; βy, x is binding):</p>
    <p>Utility = αx. Moving vertically (increasing y) does not increase utility. The IC is vertical, slope → −∞, so MRS → +∞.</p>
    <p><strong>At the kink point:</strong></p>
    <p>The IC has a corner, so the derivative does not exist. The MRS is undefined (or can take any value in [0, ∞]). This is the optimal consumption point under most budget constraints: the consumer always demands goods in the ratio y/x = α/β.</p>
    <p>The kink is where consumers locate their optimal bundle, and standard MRS conditions for optimality do not apply there in the conventional sense.</p>
  `},
  {id: 42, title: "Leontief Utility: Convexity", html: `
    <h2>Leontief Utility: Convexity</h2>
    <p>Leontief preferences are <strong>convex but NOT strictly convex</strong>.</p>
    <p>To check convexity: consider two bundles A and B on the same IC (same utility level ū). Any convex combination λA + (1−λ)B also achieves at least ū in utility:</p>
    <p>u(λA + (1−λ)B) = min{α(λx_A + (1−λ)x_B), β(λy_A + (1−λ)y_B)}</p>
    <p>≥ λ·min{αx_A, βy_A} + (1−λ)·min{αx_B, βy_B} = λū + (1−λ)ū = ū</p>
    <p>So u(λA + (1−λ)B) ≥ ū. Upper contour sets are convex. ✓</p>
    <p>However, <strong>strict convexity fails</strong>: on the flat arm of the IC (say x varies while y = ū/β is fixed), any mixture of two points on that arm gives the same utility ū. The mixture is indifferent to, not strictly preferred over, the endpoints. ✗</p>
    <p>In summary, Leontief preferences are convex (upper contour sets are convex) but not strictly convex (no love of variety — the right proportions matter, not variety per se).</p>
  `},
  {id: 43, title: "CES Utility: Cases for Different Values of δ", html: `
    <h2>CES Utility: Cases for Different Values of δ</h2>
    <p>The CES utility function U(x, y) = (αx<sup>δ</sup> + βy<sup>δ</sup>)<sup>1/δ</sup> nests several utility functions depending on δ ≤ 1:</p>
    <table>
      <tr><th>δ</th><th>IC shape</th><th>Interpretation</th></tr>
      <tr><td>δ = 1</td><td>Straight lines</td><td>Perfect substitutes</td></tr>
      <tr><td>0 &lt; δ &lt; 1</td><td>Bowed, less curved than CD</td><td>Imperfect substitutes (high elasticity)</td></tr>
      <tr><td>δ → 0</td><td>Cobb-Douglas hyperbolas</td><td>Standard diminishing MRS</td></tr>
      <tr><td>−1 &lt; δ &lt; 0</td><td>More curved than CD</td><td>Intermediate complements</td></tr>
      <tr><td>δ → −∞</td><td>L-shapes</td><td>Perfect complements (Leontief)</td></tr>
    </table>
    <p>The parameter δ controls the elasticity of substitution σ = 1/(1−δ): higher δ means more substitutability (σ larger), lower δ means more complementarity (σ → 0 as δ → −∞, σ → ∞ as δ → 1).</p>
  `},
  {id: 44, title: "CES → Cobb-Douglas as δ→0", html: `
    <h2>CES Converges to Cobb-Douglas as δ→0</h2>
    <p>We take the logarithm of U(x,y) = (αx<sup>δ</sup> + βy<sup>δ</sup>)<sup>1/δ</sup> and find the limit as δ → 0.</p>
    <p>Let L = ln U = (1/δ) · ln(αx<sup>δ</sup> + βy<sup>δ</sup>).</p>
    <p>As δ → 0, this is a 0/0 indeterminate form. Apply L'Hôpital's rule (differentiating numerator and denominator with respect to δ):</p>
    <ul>
      <li>Numerator derivative: d/dδ [ln(αx<sup>δ</sup> + βy<sup>δ</sup>)] = (αx<sup>δ</sup> ln x + βy<sup>δ</sup> ln y) / (αx<sup>δ</sup> + βy<sup>δ</sup>)</li>
      <li>Denominator derivative: d/dδ [δ] = 1</li>
    </ul>
    <p>As δ → 0: x<sup>δ</sup> → 1 and y<sup>δ</sup> → 1, so:</p>
    <p>Limit = (α ln x + β ln y) / (α + β)</p>
    <p>Therefore: ln U → (α ln x + β ln y)/(α + β) = ln[x<sup>α/(α+β)</sup> · y<sup>β/(α+β)</sup>]</p>
    <p>Exponentiating: <strong>U → x<sup>α/(α+β)</sup> · y<sup>β/(α+β)</sup></strong></p>
    <p>This is precisely the normalized Cobb-Douglas utility function. Thus, CES utility converges to Cobb-Douglas as δ → 0. ✓</p>
  `},
  {id: 45, title: "CES Utility: Homothetic Preferences", html: `
    <h2>CES Utility: Homothetic Preferences</h2>
    <p>Yes. All CES utility functions represent homothetic preferences.</p>
    <p>Recall: preferences are homothetic (given monotonicity) if MRS<sub>x,y</sub> depends only on the ratio y/x, not on the absolute levels of x and y.</p>
    <p>For CES utility U = (αx<sup>δ</sup> + βy<sup>δ</sup>)<sup>1/δ</sup>:</p>
    <ul>
      <li>U<sub>x</sub> = (αx<sup>δ</sup> + βy<sup>δ</sup>)<sup>1/δ − 1</sup> · αx<sup>δ−1</sup></li>
      <li>U<sub>y</sub> = (αx<sup>δ</sup> + βy<sup>δ</sup>)<sup>1/δ − 1</sup> · βy<sup>δ−1</sup></li>
    </ul>
    <p>MRS<sub>x,y</sub> = U<sub>x</sub> / U<sub>y</sub> = (α/β) · (x/y)<sup>δ−1</sup> = (α/β) · (y/x)<sup>1−δ</sup></p>
    <p>This depends only on the ratio y/x (or equivalently x/y), not on the scale of (x, y) separately. Therefore MRS is constant along any ray through the origin, confirming that CES preferences are homothetic for all valid δ.</p>
    <p>This includes all special cases: δ → 1 (linear, constant MRS), δ → 0 (Cobb-Douglas, MRS ∝ y/x), and δ → −∞ (Leontief, MRS = 0 or ∞ depending on proportions).</p>
  `},
  {id: 46, title: "Cobb-Douglas: Homothetic Preferences", html: `
    <h2>Cobb-Douglas: Homothetic Preferences</h2>
    <p>Yes. Cobb-Douglas utility u(x,y) = x<sup>α</sup> y<sup>β</sup> represents homothetic preferences.</p>
    <p>The MRS is: MRS<sub>x,y</sub> = (α/β) · (y/x)</p>
    <p>This depends only on the ratio y/x, not on the individual levels of x and y. Therefore, MRS is constant along any ray through the origin (y/x = constant implies MRS = constant along that ray).</p>
    <p>This means that if we scale both goods by the same factor t &gt; 0 (moving along a ray: (tx, ty)), the MRS is unchanged: MRS at (tx, ty) = (α/β)(ty/tx) = (α/β)(y/x) = same as at (x, y).</p>
    <p>Economically, this means that <strong>income expansion paths are straight lines through the origin</strong>. As income doubles (with prices fixed), the optimal bundle simply doubles in scale. This is a hallmark of homothetic preferences and makes Cobb-Douglas particularly tractable for macro and trade models.</p>
  `},
  {id: 47, title: "Linear Utility: Homothetic Preferences", html: `
    <h2>Linear Utility: Homothetic Preferences</h2>
    <p>Yes. Linear utility u(x,y) = αx + βy represents homothetic preferences.</p>
    <p>The MRS is: MRS<sub>x,y</sub> = α/β</p>
    <p>This is a constant — it does not depend on x or y at all, let alone on their ratio. A constant is trivially a function of y/x only (or of any other variable), so linear preferences are homothetic.</p>
    <p>Geometrically: along any ray through the origin (where y/x is fixed), the MRS is α/β, same as everywhere else. The indifference curves are parallel straight lines with the same slope −α/β everywhere.</p>
    <p>As a special case of homotheticity: the income expansion path is any mix of goods achieving the optimal MRS. Since MRS = α/β is fixed, the consumer is indifferent among all proportions (corner solutions or any mix), but the demand for each good is linear in income. This income-linearity of demand is a general property of homothetic preferences.</p>
  `},
  {id: 48, title: "Not All Utility Functions are Homothetic", html: `
    <h2>Not All Utility Functions are Homothetic</h2>
    <p>No. Not all utility functions represent homothetic preferences. A clear counterexample is quasilinear utility.</p>
    <p>Consider u(x, y) = x + ln y:</p>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = 1 / (1/y) = y</p>
    <p>The MRS depends only on y, not on the ratio y/x. This means that along a ray through the origin (where y/x = k is constant, so y = kx), as x and y scale up together: MRS = y = kx, which <strong>increases</strong> as we move further along the ray. The MRS is not constant along rays.</p>
    <p>Therefore, quasilinear preferences are <strong>non-homothetic</strong>. The income expansion path is NOT a straight line through the origin: as income increases, the demand for y stays roughly constant (because the consumer's willingness to pay for y is determined by MRS = y, which is independent of x), while all extra income goes toward x.</p>
    <p>Other examples of non-homothetic preferences include utility functions with subsistence levels, Stone-Geary utility, and any function where MRS depends on levels rather than ratios.</p>
  `},
  {id: 49, title: "Quasilinear Utility: Strong Monotonicity", html: `
    <h2>Quasilinear Utility u(x,y) = x + ln y: Strong Monotonicity</h2>
    <p>Yes, quasilinear preferences as given are strongly monotone on the domain x ∈ ℝ, y &gt; 0.</p>
    <ul>
      <li>u<sub>x</sub> = 1 &gt; 0</li>
      <li>u<sub>y</sub> = 1/y &gt; 0 for all y &gt; 0</li>
    </ul>
    <p>Both partial derivatives are strictly positive. Therefore:</p>
    <ul>
      <li>More x (holding y fixed) always strictly increases utility by exactly 1 per unit.</li>
      <li>More y (holding x fixed) always strictly increases utility (by 1/y per unit, which is positive for y &gt; 0).</li>
    </ul>
    <p>Since both marginal utilities are positive, increasing any component strictly increases utility. If x ≥ x' and x ≠ x', then u(x) &gt; u(x'), satisfying strong monotonicity.</p>
    <p><em>Note:</em> as y → 0⁺, u<sub>y</sub> = 1/y → ∞, meaning the marginal utility of y becomes very large when y is scarce (consistent with ln y → −∞ as y → 0).</p>
  `},
  {id: 50, title: "Quasilinear Utility: Indifference Curves", html: `
    <h2>Quasilinear Utility: Indifference Curves</h2>
    <p>Setting u(x, y) = ū:</p>
    <p>x + ln y = ū ⟹ x = ū − ln y ⟹ y = e<sup>(ū − x)</sup></p>
    <h3>Key observations about the ICs</h3>
    <p><strong>Shape:</strong> Each IC is of the form y = e<sup>(ū − x)</sup> = e<sup>ū</sup> · e<sup>(−x)</sup>. These are exponential decay curves — strictly decreasing and strictly convex. The ICs are all <strong>vertical translations</strong> of each other in the (x, y) plane — each IC has exactly the same shape, just shifted up or down (for different ū values, only the constant e<sup>ū</sup> changes).</p>
    <h3>Axis intersections</h3>
    <ul>
      <li><strong>x-axis (y = 0):</strong> y = e<sup>(ū − x)</sup> &gt; 0 for all finite x, so the IC never touches the x-axis (y approaches 0 only as x → +∞). The IC does <strong>NOT cut the x-axis</strong>.</li>
      <li><strong>y-axis (x = 0):</strong> y = e<sup>ū</sup> &gt; 0, which is well-defined. The IC <strong>DOES cut the y-axis</strong> at y = e<sup>ū</sup>.</li>
    </ul>
    <p><strong>Homotheticity:</strong> Since all ICs are vertical shifts of one another (not radial expansions from the origin), they are NOT homothetic — the ICs for different utility levels are not scaled versions of each other.</p>
  `},
  {id: 51, title: "Quasilinear Utility: MRS_{x,y}", html: `
    <h2>Quasilinear Utility: MRS<sub>x,y</sub></h2>
    <p>MRS<sub>x,y</sub> = u<sub>x</sub> / u<sub>y</sub> = 1 / (1/y) = y</p>
    <p>The MRS equals the quantity of y currently consumed. This has several notable properties:</p>
    <p><strong>Depends only on y, not on x:</strong> No matter how much or how little x the consumer has, the MRS is determined entirely by the level of y. This is the defining feature of quasilinear utility — the marginal utility of x is constant (= 1), so the willingness to trade y for x depends only on how much y the consumer already has.</p>
    <p><strong>Diminishing MRS:</strong> As x increases along an IC (and y falls accordingly), MRS = y falls. The MRS is diminishing, confirming that quasilinear preferences are strictly convex.</p>
    <p><strong>Income effect on y is zero:</strong> Because MRS = y depends only on y, the optimal level of y is pinned down by the price ratio alone (MRS = p<sub>x</sub>/p<sub>y</sub> ⟹ y* = p<sub>x</sub>/p<sub>y</sub>), independent of income. All income effects go entirely to good x. This is why quasilinear preferences are used to model goods with no income effect (e.g., numeraire goods).</p>
  `},
  {id: 52, title: "Quasilinear Preferences: Not Homothetic", html: `
    <h2>Quasilinear Preferences: Not Homothetic</h2>
    <p>No. Quasilinear preferences u(x, y) = x + ln y are <strong>NOT homothetic</strong>.</p>
    <p>Recall: preferences are homothetic if MRS<sub>x,y</sub> depends only on the ratio y/x.</p>
    <p>For quasilinear utility, MRS = y. This depends only on the level of y — not on the ratio y/x.</p>
    <p>To see why this violates homotheticity, consider two points on the same ray through the origin: (x, y) and (2x, 2y) (doubling both goods). At (x, y): MRS = y. At (2x, 2y): MRS = 2y ≠ y. The MRS changes as we scale up along the ray, so the preference relation is NOT homothetic.</p>
    <p>The income expansion path confirms this: as income increases (with prices fixed), the optimal y* = p<sub>x</sub>/p<sub>y</sub> stays constant (y is a "luxury" with zero income elasticity in this model), while all additional income goes to x. This is non-homothetic behavior — homothetic preferences would require demand for both goods to scale proportionally with income.</p>
    <p>Quasilinear utility is specifically designed to capture situations where one good (here x, the numeraire) absorbs all income effects.</p>
  `},

 

    ]
  },
  



    /* ── WEITERES FACH HIER EINFÜGEN ─────────────────────── */
  /*
  {
    name: "Fach 2",
    icon: "🔬",
    description: "Beschreibung",
    kk: [
      {id:1, question: "Frage?", answer: "Antwort.", category: "Thema"},
    ],
    lt: [
      {id:1, category:"Thema", question:"Frage?", answer:"Antwort mit {{Lücke}}."},
    ],
    theory: [
      {id:1, title:"Thema-Titel", html:`<h2>Überschrift</h2><p>Text...</p>`},
    ]
  },
  */



];
