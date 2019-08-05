
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
      width: 100,
      required: true,
      inMany: true
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      width: 100,
      required: true,
      inMany: true
    },
    {
      id: "value",
      label: "Valeur",
      type: "textmultiline",
      width: 180,
      required: true,
      inMany: true
    }
	],

  groups: [
    {
      id:"p1", type:"panel", 
      label: "Meta", width: 62,
      fields: ["key", "description"]
    },
    {
      id:"p2", type:"panel", 
      label: "Données", width: 38,
      fields: ["value"]
    }
  ]

}

