tests: flake8

isort:
	pipenv run isort --recursive *.py

flake8:
	pipenv run flake8

install:
	pipenv sync --dev
	pipenv graph
