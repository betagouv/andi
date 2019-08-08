module.exports = {
    id: 'asset',
    active: true,
    table: 'asset',
    pKey: 'id_internal',
    title: 'Éléments de contenu',
    titleField: 'id_internal',
    searchFields: ['key', 'description', 'value'],
    fields: [
        {
            id: 'id',
            column: 'id_internal',
            type: 'integer', 
            label: 'identifiant',
            readOnly: true
        },
        {
            id: 'key',
            column: 'key',
            type: 'text', 
            label: 'Clé',
            inMany: true
        },
        {
            id: 'description',
            column: 'description',
            type: 'text', 
            label: 'Description',
            inMany: true
        },
        {
            id: 'value',
            column: 'value',
            type: 'textmultiline', 
            label: 'Valeur',
            inMany: true
        },
        {
            id: 'markdown',
            column: 'markdown',
            type: 'boolean', 
            label: 'Contenu Markdown',
            inMany: false
        }
    ]
}
