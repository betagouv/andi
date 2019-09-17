module.exports = {
    id: "user",
    label: "Liste d'inscriptions",
    name: "inscription",
    namePlural: "inscriptions",
    icon: "todo.gif",
    titleField: "id_internal",

    fields: [{
        id: "prenom",
        label: "Prénom",
        type: "text",
        width: 100,
        required: true,
        inMany: true
    }, {
        id: "nom",
        label: "Nom de famille",
        type: "text",
        width: 100,
        required: true,
        inMany: true
    }, {
        id: "email",
        label: "e-mail",
        type: "text",
        width: 180,
        required: true,
        inMany: true
    }, {
        id: "comments",
        label: "Commentaires",
        type: "textmultiline",
        width: 180,
        height: 4,
        required: true,
        inMany: false
    }, {
        id: "date_inscription",
        label: "Date d'inscription",
        type: "date",
        width: 38,
        required: true,
        inMany: true
    }, {
        id: 'questionnaire_sent',
        label: 'Questionnaire Transmis',
        column: 'questionnaire_sent',
        type: 'boolean',
        inMany: false
    }, {
        id: 'questionnaire_replied',
        label: 'Questionnaire Répondu',
        column: 'questionnaire_replied',
        type: 'boolean',
        inMany: false
    }],

    groups: [{
        id: "p1",
        type: "panel",
        label: "Personne",
        width: 40,
        fields: ["prenom", "nom"]
    }, {
        id: "p2",
        type: "panel",
        label: "Contact",
        width: 40,
        fields: ["email", "date_inscription"]
    }, {
        id: "p3",
        type: "panel",
        label: "Suivi",
        width: 20,
        fields: ["questionnaire_sent", "questionnaire_replied"]
    }, {
        id: "p4",
        type: "panel",
        label: "Commentaires",
        width: 100,
        fields: ["comments"]
    }]

}