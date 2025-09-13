DOCKER := docker
DOCKER-COMPOSE := docker compose

help: about args

about:
	@echo "Makefile to help manage docker-compose services"
	@echo "The Timezone for all docker container is Asia/Jakarta Indonesia"

args:
	@echo
	@echo "Target arguments:"
	@echo " run \t\t\tTo run applications"
	@echo " config \t\tTo check content manifest compose file"
	@echo " up \t\t\tStarts containers (in detached mode). [all]"
	@echo " down \t\t\tRemoves containers (preserves images and volumes). [all]"
	@echo " services \t\tLists services."
	@echo " ps \t\t\tTo check content manifest compose file."
	@echo " logs \t\t\tShows output of running containers (in 'follow' mode). [all], [svc=<service_specific>]"
	@echo " start \t\t\tStarts previously-built containers. [all], [svc=<service_specific>]"
	@echo " stop \t\t\tStops containers (without removing them). [all], [svc=<service_specific>]"
	@echo " restart \t\tReload containers. [all], [svc=<service_specific>]"
	@echo " composer-install \tExec app container to install composer."
	@echo " composer-update \tExec app container to update composer."
	@echo " clean \t\t\tRemoves containers, images and volumes. [all]"

config:
	@$(DOCKER-COMPOSE) config

run: up bash

up:
	@$(DOCKER-COMPOSE) up -d

down:
	@$(DOCKER-COMPOSE) down

services:
	@$(DOCKER-COMPOSE) ps --services

ps:
	@$(DOCKER-COMPOSE) ps

logs:
ifeq ($(svc),all)
	@$(DOCKER-COMPOSE) logs --follow
else
	@$(DOCKER-COMPOSE) logs $(svc) --follow
endif

start:
ifeq ($(svc),all)
	@$(DOCKER-COMPOSE) start
else
	@$(DOCKER-COMPOSE) start $(svc)
endif

stop:
ifeq ($(svc),all)
	@$(DOCKER-COMPOSE) stop
else
	@$(DOCKER-COMPOSE) stop $(svc)
endif

restart:
ifeq ($(svc),all)
	@$(DOCKER-COMPOSE) restart
else
	@$(DOCKER-COMPOSE) restart $(svc)
endif

composer-install:
	@$(DOCKER-COMPOSE) exec app composer_install

composer-update:
	@$(DOCKER-COMPOSE) exec app composer_update

clean:
	@$(DOCKER-COMPOSE) down --volumes --rmi all

bash:
	docker exec -it $(shell docker compose ps -q app)  bash

bash_db:
	docker exec -it $(shell docker compose ps -q mysql)  bash