// funzione per modificare i nomi dei bottoni di default
function customLabel(label) {
  if (label == "&laquo; Previous") {
    return (label = "&larr;");
  } else if (label == "Next &raquo;") {
    return (label = "&rarr;");
  } else {
    return label;
  }
}

// funzione per controllo sulle tecnologie
function getTechnologies(project) {
  if (Array.isArray(project.technologies) && project.technologies.length) {
    return project.technologies.map((tech) => tech.name).join(", ");
  }
  return "Nessuna tecnologia utilizzata";
}

function getProjectType(project) {
  if (project.type) {
    return project.type.name;
  }
  return "nessuna tipologia associata";
}

// esporto le funzioni per importarle poi dove mi servono
export { customLabel, getTechnologies, getProjectType };
