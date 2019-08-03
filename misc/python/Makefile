test: flake8 pylint

isort:
	pipenv run isort --recursive *.py

flake8:
	pipenv run flake8

pylint:
	pipenv run pylint *.py

install:
	pipenv sync --dev
	pipenv graph
