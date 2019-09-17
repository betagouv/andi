module.exports = {
    id: 'user',
    active: true,
    table: 'inscription',
    pKey: 'id_internal',
    title: 'Liste Inscriptions',
    titleField: 'id_internal',
    searchFields: ['nom', 'prenom', 'email'],
    fields: [{
            id: 'id',
            column: 'id_internal',
            type: 'integer',
            label: 'identifiant',
            readOnly: true
        }, {
            id: 'prenom',
            column: 'prenom',
            type: 'text',
            label: 'Prénom',
            inMany: true
        }, {
            id: 'nom',
            column: 'nom',
            type: 'text',
            label: 'Nom',
            inMany: true
        }, {
            id: 'email',
            column: 'email',
            type: 'text',
            label: 'e-mail',
            inMany: true
        }, {
            id: 'comments',
            column: 'comments',
            type: 'textmultiline',
            label: 'commentaires',
            inMany: false
        }, {
            id: 'date_inscription',
            column: 'date_inscription',
            type: 'datetime',
            label: 'Date d\'inscription',
            inMany: true
        }, {
            id: 'questionnaire_sent',
            column: 'questionnaire_sent',
            type: 'boolean',
            label: 'Questionnaire Transmis',
            inMany: false
        }, {
            id: 'questionnaire_replied',
            column: 'questionnaire_replied',
            type: 'boolean',
            label: 'Questionnaire Répondu',
            inMany: false
        }

    ]
}