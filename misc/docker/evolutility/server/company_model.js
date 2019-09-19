module.exports = {
    id: 'company',
    active: true,
    table: 'entreprises',
    pKey: 'id_internal',
    title: 'Liste Entreprises',
    titleField: 'id_internal',
    searchFields: ['nom', 'enseigne', 'siret', 'naf'],
    fields: [{
            id: 'nom',
            column: 'nom',
            type: 'text',
            label: 'Raison Sociale',
            inMany: true
        }, {
            id: 'id',
            column: 'id_internal',
            type: 'integer',
            label: 'identifiant',
            readOnly: true
        }, {
            id: 'enseigne',
            column: 'enseigne',
            type: 'text',
            label: 'Enseigne'
        }, {
            id: 'siret',
            column: 'siret',
            type: 'integer',
            label: 'Siret',
            readOnly: true,
            inMany: true
        }, {
            id: 'naf',
            column: 'naf',
            type: 'text',
            label: 'NAF',
            readOnly: true,
            inMany: true
        }, {
            id: 'taille',
            column: 'taille',
            type: 'text',
            label: 'Taille',
            readOnly: false,
            inMany: true
        }, {
            id: 'pmsmp_interest',
            column: 'pmsmp_interest',
            type: 'boolean',
            label: 'Intérêt PMSMP',
        }, {
            id: 'pmsmp_count_recent',
            column: 'pmsmp_count_recent',
            type: 'integer',
            label: '#PMSMP 24 mois',
            readOnly: true,
        },
        // {
        //     id: 'rating_us',
        //     column: 'rating_us',
        //     type: 'text',
        //     label: 'Rating',
        // },
        {
            id: 'comments',
            column: 'comments',
            type: 'text',
            label: 'Commentaires',
        }, {
            id: 'numero',
            column: 'numero',
            type: 'text',
            label: 'Numéro',
        }, {
            id: 'rue',
            column: 'rue',
            type: 'text',
            label: 'Rue',
        }, {
            id: 'quartier',
            column: 'quartier',
            type: 'text',
            label: 'Quartier',
        }, {
            id: 'commune',
            column: 'commune',
            type: 'text',
            label: 'Commune',
        }, {
            id: 'postal_code',
            column: 'postal_code',
            type: 'text',
            label: 'Code postal',
        }, {
            id: 'region',
            column: 'region',
            type: 'text',
            label: 'Région',
        }, {
            id: 'departement',
            column: 'departement',
            type: 'text',
            label: 'Département',
        }, {
            id: 'lat',
            column: 'lat',
            type: 'decimal',
            label: 'Latitude',
        }, {
            id: 'lon',
            column: 'lon',
            type: 'decimal',
            label: 'Longitude',
        },


        {
            id: 'phone_official_1',
            column: 'phone_official_1',
            type: 'text',
            label: 'Téléphone officiel 1',
        }, {
            id: 'phone_official_2',
            column: 'phone_official_2',
            type: 'text',
            label: 'Téléphone officiel 2',
        }, {
            id: 'email_official',
            column: 'email_official',
            type: 'text',
            label: 'Email officiel',
        },

        {
            id: 'contact_1_name',
            column: 'contact_1_name',
            type: 'text',
            label: 'Contact 1 Nom',
        }, {
            id: 'contact_1_role',
            column: 'contact_1_role',
            type: 'text',
            label: 'Contact 1 Rôle',
        }, {
            id: 'contact_1_mail',
            column: 'contact_1_mail',
            type: 'text',
            label: 'Contact 1 eMail',
        }, {
            id: 'contact_1_phone',
            column: 'contact_1_phone',
            type: 'text',
            label: 'Contact 1 Téléphone',
        },

        {
            id: 'contact_2_name',
            column: 'contact_2_name',
            type: 'text',
            label: 'Contact 2 Nom',
        }, {
            id: 'contact_2_role',
            column: 'contact_2_role',
            type: 'text',
            label: 'Contact 2 Rôle',
        }, {
            id: 'contact_2_mail',
            column: 'contact_2_mail',
            type: 'text',
            label: 'Contact 2 eMail',
        }, {
            id: 'contact_2_phone',
            column: 'contact_2_phone',
            type: 'text',
            label: 'Contact 2 Téléphone',
        }
    ]
}
