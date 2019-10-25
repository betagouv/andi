from plotly import graph_objects as go
import os

funnel = go.Funnel(
    y = [
        "Questionnaire rempli",
        "Sélection périmêtre 95",
        "Profils suivis Cap ou Pôle Emploi",
        "Profils retenus",
        "Immersions réalisées",
    ],
    x = [
        128,
        94,
        75,
        21,
        7,
    ],
    # textposition = "inside",
    textinfo = "value+percent initial+percent previous",
    opacity = 0.65,
    marker = {
        "color": [
            '#003f5c',
            '#7a5195',
            '#ef5675',
            '#ffa600'
        ],
        "line": {
            "width": 3,
            "color": '#333333'
        }
    },
    connector = {"line": {"color": "#333333", "dash": "solid", "width": 3}}
)

layout = go.Layout (
    title = 'Chiffres Expérimentation ANDi: sélection profils',
    margin= {'l': 200, 'r': 200}
)

fig = go.Figure(funnel, layout)

fig.show()
