setup: deps keys

deps:
	pip install -Ur requirements_dev.txt -t ./lib

keys:
	./application/generate_keys.py