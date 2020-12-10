up: start-backend start-frontend

down: 
	cd backend && \
	$(MAKE) down

start-frontend:
	cd frontend && \
	$(MAKE) up

start-backend:
	cd backend && \
	$(MAKE) run-dev

start-pgadmin:
	cd backend && \
	$(MAKE) run-pgadmin

