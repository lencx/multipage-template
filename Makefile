default: help

install:
	npm install

# mode
dev:
	npm run dev
build:
	npm run build

# archiver
zip:
	node ./.bin/zip $(filter-out $@,$(MAKECMDGOALS))

clear:
	@echo "\033[35mDirectory name is required\033[0m"
	rm -rf $(filter-out $@,$(MAKECMDGOALS))

# command
cmd:
	@echo "\033[35m┌——————————————————————————————————————┐\033[0m"
	@echo "\033[35m|              webpack-cli             |\033[0m"
	@echo "\033[35m└——————————————————————————————————————┘\033[0m"
	npm run cli:help
	@echo "\033[35m┌——————————————————————————————————————┐\033[0m"
	@echo "\033[35m|           webpack-dev-server         |\033[0m"
	@echo "\033[35m└——————————————————————————————————————┘\033[0m"
	npm run dev:help

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明(Command instructions)\033[0m"
	@echo "   \033[35mmake install\033[0m \t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake cmd\033[0m webpack-cli, webpack-dev-server\033[0m\t---  帮助"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake build\033[0m\t\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目，生成目标文件"
	@echo "   \033[35mmake zip <version>\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译后的目标文件生成*.zip\n \033[0m\texample: 'make zip v1.2' -> '/pack/dist_v1.2.zip'"