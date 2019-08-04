
module.exports = {
  id: "user",
  label: "Liste d'inscriptions",
  name: "inscription",
  namePlural: "inscriptions",
  icon: "todo.gif",
  titleField: "id_internal",

	fields:[
    {
      id: "prenom",
      label: "Prénom",
      type: "text",
      width: 100,
      required: true,
      inMany: true
    },
    {
      id: "nom",
      label: "Nom de famille",
      type: "text",
      width: 100,
      required: true,
      inMany: true
    },
    {
      id: "email",
      label: "e-mail",
      type: "text",
      width: 180,
      required: true,
      inMany: true
    },
    {
      id: "date_inscription", 
      label: "Date d'inscription", 
      type: "date", 
      width: 38,
      required: true,
      inMany: true
    }
	],

  groups: [
    {
      id:"p1", type:"panel", 
      label: "Personne", width: 62,
      fields: ["prenom", "nom"]
    },
    {
      id:"p2", type:"panel", 
      label: "Contact", width: 38,
      fields: ["email", "date_inscription"]
    }
  ]

}

