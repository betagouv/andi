from plotly import graph_objects as go

fig = go.Figure(go.Funnel(
    y = [
        "Visites Accueil",
        "Visites Formulaire d'inscription",
        "Inscriptions",
        "Sélection périmêtre 95",
        "Profils suivis Cap ou Pôle Emploi",
        "Profils retenus",
        "Immersions réalisées",
    ],
    x = [
        854,
        298,
        234,
        94,
        75,
        21,
        7,
    ],
    textposition = "inside",
    textinfo = "value+percent initial",
    opacity = 0.65,
    marker = {
        "color": [
            '#003f5c',
            '#374c80',
            '#7a5195',
            '#bc5090',
            '#ef5675',
            '#ff764a',
            '#ffa600'
        ],
        "line": {
            "width": [4, 2, 2, 3, 1, 1],
            "color": ["wheat", "wheat", "blue", "wheat", "wheat"]
        }
    },
    connector = {"line": {"color": "royalblue", "dash": "dot", "width": 3}})
    )

fig.show()
