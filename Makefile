buildlocal:
	docker-compose -f docker-local.yml build --no-cache
uplocal:
	docker-compose -f docker-local.yml up
push:
	docker tag nest_local:latest matamicen/nest_local:latest && docker push matamicen/nest_local