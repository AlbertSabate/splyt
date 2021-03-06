install:
	yarn install

start:
	yarn start

test:
	yarn coverage

build:
	docker build -t albertsabate/splyt:latest .

up:
	docker run -d -p 80:80 --name asSplytTest albertsabate/splyt

stop:
	docker stop asSplytTest
	docker rm asSplytTest
