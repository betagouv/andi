module.exports = {
        id: "company",
        label: "Fichier Entreprises ANDi",
        name: "Entreprise",
        namePlural: "Entreprises",
        icon: "todo.gif",
        titleField: "id_internal",



        fields: [ {
        //////////////// COMPANY_DATA
            id: 'id',
            label: 'Identifiant',
            type: 'integer',
            width: 20,
            maxLength: 11,
            readOnly: true,
            help: 'Identifiant interne',
        }, {
            id: 'nom',
            label: 'Raison Sociale',
            type: 'text',
            width: 40,
            maxLength: 120,
            required: true,
            inMany: true,
        }, {
            id: 'enseigne',
            label: 'Enseigne',
            type: 'text',
            width: 40,
            maxLength: 120,
        }, {
            id: 'siret',
            label: 'Siret',
            type: 'integer',
            readOnly: true,
            width: 40,
            maxLength: 14,
            inMany: true
        }, {
            id: 'naf',
            label: 'Naf',
            type: 'text',
            readOnly: true,
            width: 40,
            maxLength: 5,
        }, {
            id: 'taille',
            label: 'Taille',
            type: 'lov',
            list: [
                { 'id': '0', 'text': "0" },
                { 'id': '1-2', 'text': "1-2" },
                { 'id': '3-5', 'text': "3-5" },
                { 'id': '6-9', 'text': "6-9" },
                { 'id': '10-19', 'text': "10-19" },
                { 'id': '20-49', 'text': "20-49" },
                { 'id': '50-99', 'text': "50-99" },
                { 'id': '100-199', 'text': "100-199" },
                { 'id': '200-249', 'text': "200-249" },
                { 'id': '250-499', 'text': "250-499" },
                { 'id': '500-999', 'text': "500-999" },
                { 'id': '1000-1999', 'text': "1000-1999" },
                { 'id': '2000-4999', 'text': "2000-4999" },
                { 'id': '5000-9999', 'text': "5000-9999" },
                { 'id': '+10000', 'text': "+10000" },
            ],
            inMany: true,
            width: 20,
        }, {
        //////////////// PMSMP DATA
            id: 'pmsmp_interest',
            label: 'Intérêt',
            type: 'boolean',
            help: 'A marqué un intérêt pour des immersions PMSMP',
            width: 100
        }, {
            id: 'pmsmp_count_recent',
            label: 'Nombre PMSMP 24 mois',
            type: 'integer',
            help: 'Nombre de PMSPM effectués ces 24 derniers mois',
            width: 100
        }, {
        //////////////// LOCALISATION DATA
            id: 'numero',
            label: 'Numéro',
            type: 'text',
            width: 15
        }, {
            id: 'rue',
            label: 'Rue',
            type: 'text',
            width: 60
        }, {
            id: 'quartier',
            label: 'Quartier',
            type: 'text',
            width: 25
        }, {
            id: 'postal_code',
            label: 'Code postal',
            type: 'text',
            width: 40
        }, {
            id: 'commune',
            label: 'Commune',
            type: 'text',
            width: 60
        }, {
            id: 'region',
            label: 'Région',
            type: 'text',
            width: 50
        }, {
            id: 'departement',
            label: 'Département',
            type: 'text',
            width: 50
        }, {
            id: 'lat',
            label: 'Latitude',
            type: 'decimal',
            width: 25
        }, {
            id: 'lon',
            label: 'Longitude',
            type: 'decimal',
            width: 25
        }, {
        //////////////// CONTACT DATA
            id: 'phone_official_1',
            label: 'Téléphone général 1',
            type: 'text',
            width: 30,
        }, {
            id: 'phone_official_2',
            label: 'Téléphone général 2',
            type: 'text',
            width: 30,
        }, {
            id: 'email_official',
            label: 'Email général',
            type: 'text',
            width: 40,
        }, {
            id: 'contact_1_name',
            label: 'Contact 1',
            type: 'text',
            width: 30,
        }, {
            id: 'contact_1_role',
            label: 'Role',
            type: 'text',
            width: 10,
        }, {
            id: 'contact_1_phone',
            label: 'Téléphone',
            type: 'text',
            width: 20,
        }, {
            id: 'contact_1_mail',
            label: 'e-mail',
            type: 'text',
            width: 40,
        }, {
            id: 'contact_2_name',
            label: 'Contact 2',
            type: 'text',
            width: 30,
        }, {
            id: 'contact_2_role',
            label: 'Role',
            type: 'text',
            width: 10,
        }, {
            id: 'contact_2_phone',
            label: 'Téléphone',
            type: 'text',
            width: 20,
        }, {
            id: 'contact_2_mail',
            label: 'e-mail',
            type: 'text',
            width: 40,
        }, {
        //////////////// MISC DATA
            id: 'comments',
            type: 'textmultiline',
            width: 100
        }
        ],

        groups: [{
            id: 'company_data',
            type: 'panel',
            label: 'Données Générales',
            width: 70,
            fields: [
                'nom', 'enseigne', 'taille',
                'siret', 'naf', 'id',
            ]
        }, {
            id: 'pmsmp_data',
            type: 'panel',
            label: 'Données PMSMP',
            width: 30,
            fields: [
                'pmsmp_interest', 'pmsmp_count_recent'
            ]
        }, {
            id: 'adresse',
            type: 'panel',
            label: 'Adresse',
            width: 60,
            fields: [
                'numero', 'rue', 'quartier',
                'postal_code', 'commune'
            ]
        }, {
            id: 'localisation',
            type: 'panel',
            label: 'Localisation',
            width: 40,
            fields: [
                'region', 'departement', 
                'lat', 'lon'
            ]
        }, {
            id: 'contact',
            type: 'panel',
            label: 'Données de contact',
            width: 100,
            fields : [
                'phone_official_1', 'phone_official_2', 'email_official',
                'contact_1_name', 'contact_1_role', 'contact_1_phone', 'contact_1_mail',
                'contact_2_name', 'contact_2_role', 'contact_2_phone', 'contact_2_mail',
            ]
        }, {
            id: 'comments',
            type: 'panel',
            width: 100,
            height: 4,
            label: 'Commentaires',
            fields : [
                'comments'
            ]
        }
        ]
}
