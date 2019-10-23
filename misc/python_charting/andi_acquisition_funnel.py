from plotly import graph_objects as go
import os

funnel = go.Funnel(
    y = [
        "Visites Accueil",
        "Visites Formulaire d'inscription",
        "Inscriptions",
    ],
    x = [
        854,
        298,
        234,
    ],
    # textposition = "inside",
    textinfo = "value+percent initial",
    opacity = 0.65,
    marker = {
        "color": [
            '#374c80',
            '#bc5090',
            '#ff764a',
        ],
        "line": {
            "width": 3,
            "color": '#333333'
        }
    },
    connector = {"line": {"color": "#333333", "dash": "solid", "width": 3}}
)

layout = go.Layout (
    title = 'Chiffres Expérimentation ANDi: Acquisition Landing Page',
    margin= {'l': 200, 'r': 200}
)

fig = go.Figure(funnel, layout)

fig.show()
