.PHONY: init
# init env
init:
	node --version
	yarn install

.PHONY: run
# run
run: init
	yarn run dev

.PHONY: build
# build
build: init
	yarn run build

.PHONY: test
# test
test:
	make lint

# lint
lint:
	yarn run lint

.PHONY: container-build
# generate all
container-build:
	docker build -t frontend .

# show help
help:
	@echo ''
	@echo 'Usage:'
	@echo ' make [target]'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-_0-9]+:/ { \
	helpMessage = match(lastLine, /^# (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 2, RLENGTH); \
			printf "\033[36m%-22s\033[0m %s\n", helpCommand,helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help
