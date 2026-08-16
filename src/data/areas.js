const areasList = [
  { title: "Derecho Civil", desc: "Gestión experta en contratos, sucesiones, asuntos de familia y salvaguarda del patrimonio personal." },
  { title: "Derecho Laboral", desc: "Consultoría preventiva y representación rigurosa tanto para la protección de los derechos del trabajador como para la gestión empresarial." },
  { title: "Derecho Penal", desc: "Defensa técnica especializada y acompañamiento jurídico estratégico ante cualquier contingencia o proceso judicial." },
  { title: "Derecho Comercial", desc: "Estructuración de negocios, contratos mercantiles y blindaje jurídico para transacciones corporativas." }
];


const areaDetails = {
  "Derecho Civil": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Civil",
    intro: "Acompañamiento jurídico en las relaciones patrimoniales y personales que se desarrollan en el ámbito civil, con una visión preventiva y estratégica.",
    sections: [
      ["Alcance de la práctica", "Atendemos asuntos relacionados con contratos civiles, obligaciones, responsabilidad, sucesiones, asuntos de familia y protección del patrimonio personal."],
      ["Enfoque", "La estrategia parte de identificar riesgos, ordenar la documentación y definir con claridad las obligaciones y derechos de cada parte antes de que una controversia escale."],
      ["¿Cuándo puede ser relevante?", "Cuando existe un conflicto contractual, una reclamación de responsabilidad, una sucesión, una situación familiar con efectos patrimoniales o la necesidad de proteger un activo o derecho."],
      ["Acompañamiento", "El trabajo puede abarcar análisis documental, estructuración de alternativas, negociación y, cuando corresponda, acompañamiento en la etapa judicial."]
    ]
  },
  "Derecho Laboral": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Laboral",
    intro: "Consultoría preventiva y acompañamiento estratégico para empresas y trabajadores frente a relaciones laborales, reorganizaciones y contingencias.",
    sections: [
      ["Alcance de la práctica", "Comprende la revisión de relaciones laborales, documentación, procesos de reorganización, prevención de contingencias y manejo de controversias derivadas de la relación de trabajo."],
      ["Enfoque", "Se busca anticipar riesgos mediante procesos ordenados, documentación consistente y decisiones que tengan respaldo jurídico antes de convertirse en una reclamación."],
      ["¿Cuándo puede ser relevante?", "En procesos de contratación, cambios organizacionales, terminaciones, conflictos individuales o colectivos y situaciones donde exista exposición a reclamaciones laborales."],
      ["Acompañamiento", "La firma puede intervenir desde la prevención y revisión documental hasta la negociación y la defensa de los intereses del cliente en una controversia."]
    ]
  },
  "Derecho Penal": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Penal",
    intro: "Defensa técnica y acompañamiento estratégico frente a investigaciones, procesos y contingencias de naturaleza penal.",
    sections: [
      ["Alcance de la práctica", "La práctica se centra en la preparación de estrategias de defensa, análisis de hechos y documentos y acompañamiento durante las distintas etapas de una actuación penal."],
      ["Enfoque", "Cada asunto requiere construir una lectura precisa de los hechos, valorar la evidencia disponible y definir una estrategia coherente con el escenario procesal."],
      ["¿Cuándo puede ser relevante?", "Ante una denuncia, investigación, citación, imputación o cualquier situación en la que una persona o empresa pueda estar expuesta a consecuencias de naturaleza penal."],
      ["Acompañamiento", "El acompañamiento se estructura alrededor del análisis del caso, la preparación de la defensa y la toma de decisiones informadas durante el proceso."]
    ]
  },
  "Derecho Comercial": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Comercial",
    intro: "Estructuración de negocios y protección jurídica de operaciones comerciales, societarias y contractuales.",
    sections: [
      ["Alcance de la práctica", "Incluye estructuración de negocios, sociedades, contratos mercantiles, gobierno corporativo, negociación y prevención de riesgos en operaciones empresariales."],
      ["Enfoque", "La asesoría conecta la decisión jurídica con la realidad del negocio: objetivos comerciales, estructura societaria, riesgos, obligaciones y mecanismos de protección."],
      ["¿Cuándo puede ser relevante?", "En constitución o reorganización de sociedades, negociación de contratos, operaciones con activos, disputas entre socios, gobierno corporativo y decisiones con impacto patrimonial."],
      ["Acompañamiento", "La firma puede acompañar la etapa de diseño, negociación, documentación, prevención de contingencias y manejo estratégico de controversias."]
    ]
  }
};

export { areasList, areaDetails };
