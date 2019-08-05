
module.exports = {
  id: "asset",
  label: "Éléments de contenu",
  name: "asset",
  namePlural: "assets",
  icon: "todo.gif",
  titleField: "id_internal",

	fields:[
    {
      id: "key",
      label: "Clé",
      type: "text",
      width: 30,
      maxLength: 120,
      required: true,
      inMany: true
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      width: 60,
      maxLength: 250,
      required: true,
      inMany: true
    },
    {
      id: "value",
      label: "Valeur",
      type: "textmultiline",
      width: 180,
      height: 10,
      required: true,
      inMany: true
    }
	],

  groups: [
    {
      id:"p1", type:"panel", 
      label: "Meta", width: 100,
      fields: ["key", "description"]
    },
    {
      id:"p2", type:"panel", 
      label: "Données", width: 100,
      fields: ["value"]
    }
  ]

}

